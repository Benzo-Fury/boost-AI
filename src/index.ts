import {
  Configuration,
  CreateCompletionResponse,
  CreateImageRequestSizeEnum,
  ImagesResponse,
  OpenAIApi,
} from "openai";
import type { AxiosResponse } from "axios";

export enum LanguageModel {
  DAVINCI = "text-davinci-003",
  CURIE = "text-curie-001",
  BABBAGE = "text-babbage-001",
  ADA = "text-ada-001",
}

/**
 * Parameters for generating text from a prompt.
 * @typedef {Object} TextGenerationParams
 * @property {string} prompt - The prompt for generating the text.
 * @property {string} [prefix] - A optional prefix that will be sent before your prompt.
 * @property {LanguageModel} [model] - The language model to use for generating text.
 * @property {number} [maxTokens=50] - The maximum number of tokens to generate (https://help.openai.com/en/articles/4936856-what-are-tokens-and-how-to-count-them).
 * @property {number} [creativity=0.5] - The level of creativity to use when generating text, from 0.0 to 1.0.
 */

export type TextGenerationParams = {
  prompt: string;
  prefix?: string;
  model?: LanguageModel;
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

export class boostAI {
  private api: OpenAIApi;

  constructor(apiKey: string) {
    if (!apiKey) {
      throw new Error("API key is required.");
    }

    const configuration = new Configuration({
      apiKey,
    });

    this.api = new OpenAIApi(configuration);
  }

  async generateText(
    params: TextGenerationParams,
    returnFullResponse = false
  ): Promise<string | AxiosResponse<CreateCompletionResponse>> {
    if (!params.prompt) {
      throw new Error(`Invalid prompt. Prompt cannot be empty.`);
    }
    const dt = (params.prefix || "") + `${params.prompt}.`;
    try {
      const completion = await this.api.createCompletion({
        model: params.model || "text-davinci-003",
        prompt: dt,
        max_tokens: params.maxTokens,
        temperature: params.creativity,
      });
      if (returnFullResponse === true) {
        return completion;
      } else {
        return completion.data.choices[0].text!;
      }
    } catch {
      return "ERROR";
    }
  }

  async generateImage(
    params: ImageGenerationParams,
    returnFullResponse = false
  ): Promise<string | AxiosResponse<ImagesResponse>> {
    if (!params.prompt) {
      throw new Error(`Invalid prompt. Prompt cannot be empty.`);
    }
    const completion = await this.api.createImage({
      prompt: params.prefix ? params.prefix + params.prompt : params.prompt,
      n: params.amount || 1,
      size: params.size || "1024x1024",
    });
    if (returnFullResponse === true) {
      return completion;
    } else {
      return completion.data.data[0].url!;
    }
  }
}