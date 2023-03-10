import {
  Configuration,
  CreateCompletionResponse,
  CreateImageRequestSizeEnum,
  ImagesResponse,
  OpenAIApi,
} from "openai";
import mongoose, { mongo } from "mongoose";
import uniqid from "uniqid";
import type { AxiosResponse } from "axios";
import conversationSchema from "./schemas/conversationSchema";

export enum LanguageModel {
  DAVINCI = "text-davinci-003",
  CURIE = "text-curie-001",
  BABBAGE = "text-babbage-001",
  ADA = "text-ada-001",
}

export enum PointerTypeEnum {
  id = "ID",
  prompt = "Prompt",
  response = "Response",
}

/**
 * Parameters for generating text from a prompt.
 * @typedef {Object} TextGenerationParams
 * @property {string} prompt - The prompt for generating the text.
 * @property {string} [prefix] - A optional prefix that will be sent before your prompt.
 * @property {LanguageModel} [model] - The language model to use for generating text. Default is davinci.
 * @property {number} [maxTokens=50] - The maximum number of tokens to generate (https://help.openai.com/en/articles/4936856-what-are-tokens-and-how-to-count-them).
 * @property {number} [creativity=0.5] - The level of creativity to use when generating text, from 0.0 to 1.0.
 */

export type TextGenerationParams = {
  prompt: string;
  prefix?: string;
  model?: LanguageModel;
  conversationID?: string;
  maxTokens?: number;
  creativity?: number;
};

/**
 * Parameters for generating an image from a prompt.
 * @typedef {Object} ImageGenerationParams
 * @property {string} prompt - The text the image will be based off of.
 * @property {string} [prefix] - A optional prefix that will be sent before your prompt.
 * @property {Array<number>} [size=[256, 256]] - The desired size of the image default is 1024x1024.
 * @property {"url"} [response_format] - The format of the response, currently only "url" is supported.
 * @property {number} [amount=1] - The number of images to generate.
 */

export type ImageGenerationParams = {
  prompt: string;
  prefix?: string;
  size?: CreateImageRequestSizeEnum;
  response_format?: "url";
  amount?: number;
};

/**
 * What text generation will return if returnFullResponse is set to true.
 * @typedef {Object} ImageGenerationParams
 * @property {AxiosResponse<CreateCompletionResponse>} [openAIResponse] - The open ai response/completion.
 * @property {string} [conversationID] - The id that was generated for this response.
 * @property {string} [time] - The current time that this response was generated at.
 */
export type TextGenerationReturnParams = {
  openAIResponse: AxiosResponse<CreateCompletionResponse>;
  conversationID: string;
  time: string;
};

export type PointerParams = {
  pointer: string;
  pointerType: PointerTypeEnum;
};

export class boostAI {
  private api: OpenAIApi;
  private connection?: typeof mongoose;

  constructor(apiKey: string, mongoURI: string) {
    if (!apiKey) {
      throw new Error("API key is required.");
    }

    const configuration = new Configuration({
      apiKey,
    });

    this.api = new OpenAIApi(configuration);

    if (!mongoURI) return;
    this.connect(mongoURI);
  }

  async connect(uri: string) {
    try {
      mongoose.set("strictQuery", false);
      const connection = await mongoose.connect(uri, {
        keepAlive: true,
      });
      this.connection = connection;
    } catch (err) {
      throw new Error("Failed to connect to database:" + err);
    }
  }

  async generateText(
    params: TextGenerationParams,
    returnFullResponse: boolean
  ): Promise<string | TextGenerationReturnParams> {
    if (!params.prompt) {
      throw new Error(`Invalid prompt. Prompt cannot be empty.`);
    }

    try {
      let dt;
      if (params.conversationID && this.connection) {
        if (params.conversationID && !this.connection) {
          throw new Error(
            "No mongo URI has been specified. Cannot use conversation ID without database"
          );
        }
        const conversationResult = await conversationSchema.findOne({
          _id: params.conversationID,
        });
        if (!conversationResult) {
          throw new Error("No conversation found.");
        }
        dt =
          `This user has a previous conversation with you that they would like to continue. The conversation will be inside quotation marks now: (user: ${
            conversationResult.prompt
          }. Answer: ${conversationResult.response}. ${
            conversationResult.previousQAA || ""
          })` +
          (params.prefix || "") +
          `${params.prompt}.`;
      } else {
        dt = (params.prefix || "") + `${params.prompt}.`;
      }
      const completion = await this.api.createCompletion({
        model: params.model || "text-davinci-003",
        prompt: dt,
        max_tokens: params.maxTokens || 4000,
        temperature: params.creativity,
      });
      let id = "No database set. Refer to docs if you would like to enable";
      if (this.connection) {
        id = uniqid();
        await conversationSchema.create({
          _id: id,
          prompt: dt,
          response: completion.data.choices[0].text!,
        });
      }
      return returnFullResponse === true
        ? {
            openAIResponse: completion,
            conversationID: id,
            time: new Date().toString(),
          }
        : completion.data.choices[0].text!;
    } catch (err) {
      console.log(err);
      process.exit();
    }
  }

  async generateImage(
    params: ImageGenerationParams,
    returnFullResponse: boolean
  ): Promise<string | AxiosResponse<ImagesResponse>> {
    if (!params.prompt) {
      throw new Error(`Invalid prompt. Prompt cannot be empty.`);
    }
    try {
      const completion = await this.api.createImage({
        prompt: params.prefix ? params.prefix + params.prompt : params.prompt,
        n: params.amount || 1,
        size: params.size || "1024x1024",
      });

      return returnFullResponse === true
        ? completion
        : completion.data.data[0].url!;
    } catch (err) {
      throw new Error("Inappropriate Prompt... DallE rejected.");
    }
  }

  async search(
    params: PointerParams
  ): Promise<mongoose.Document | mongoose.Document[] | undefined> {
    if(!this.connection) {
      throw new Error('Search function cannot be used without a database connection.')
    }
    let pointer;
    switch (params.pointerType) {
      case PointerTypeEnum.response: {
        pointer = { response: params.pointer };
        break;
      }
      case PointerTypeEnum.prompt: {
        pointer = { prompt: params.pointer };
        break;
      }
      default: {
        pointer = { _id: params.pointer };
        break;
      }
    }
    const conversationResult = await conversationSchema.find(pointer);
    const returner = conversationResult[1]
      ? conversationResult
      : conversationResult[0]!;
    return !conversationResult ? undefined : returner;
  }
}
