import {
  conversationSchema_default
} from "./chunk-GZMI77MS.js";

// src/index.ts
import {
  Configuration,
  OpenAIApi
} from "openai";
import mongoose from "mongoose";
import uniqid from "uniqid";
var LanguageModel = /* @__PURE__ */ ((LanguageModel2) => {
  LanguageModel2["DAVINCI"] = "text-davinci-003";
  LanguageModel2["CURIE"] = "text-curie-001";
  LanguageModel2["BABBAGE"] = "text-babbage-001";
  LanguageModel2["ADA"] = "text-ada-001";
  return LanguageModel2;
})(LanguageModel || {});
var PointerTypeEnum = /* @__PURE__ */ ((PointerTypeEnum2) => {
  PointerTypeEnum2["id"] = "ID";
  PointerTypeEnum2["prompt"] = "Prompt";
  PointerTypeEnum2["response"] = "Response";
  return PointerTypeEnum2;
})(PointerTypeEnum || {});
var boostAI = class {
  api;
  connection;
  constructor(apiKey, mongoURI) {
    if (!apiKey) {
      throw new Error("API key is required.");
    }
    const configuration = new Configuration({
      apiKey
    });
    this.api = new OpenAIApi(configuration);
    if (!mongoURI)
      return;
    this.connect(mongoURI);
  }
  async connect(uri) {
    try {
      mongoose.set("strictQuery", false);
      const connection = await mongoose.connect(uri, {
        keepAlive: true
      });
      this.connection = connection;
    } catch (err) {
      throw new Error("Failed to connect to database:" + err);
    }
  }
  async generateText(params, returnFullResponse) {
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
        const conversationResult = await conversationSchema_default.findOne({
          _id: params.conversationID
        });
        if (!conversationResult) {
          throw new Error("No conversation found.");
        }
        dt = `This user has a previous conversation with you that they would like to continue. The conversation will be inside quotation marks now: (user: ${conversationResult.prompt}. Answer: ${conversationResult.response}. ${conversationResult.previousQAA || ""})` + (params.prefix || "") + `${params.prompt}.`;
      } else {
        dt = (params.prefix || "") + `${params.prompt}.`;
      }
      const completion = await this.api.createCompletion({
        model: params.model || "text-davinci-003",
        prompt: dt,
        max_tokens: params.maxTokens,
        temperature: params.creativity
      });
      let id = "No database set. Refer to docs if you would like to enable";
      if (this.connection) {
        id = uniqid();
        await conversationSchema_default.create({
          _id: id,
          prompt: dt,
          response: completion.data.choices[0].text
        });
      }
      return returnFullResponse === true ? {
        openAIResponse: completion,
        conversationID: id,
        time: (/* @__PURE__ */ new Date()).toString()
      } : completion.data.choices[0].text;
    } catch (err) {
      console.log(err);
      process.exit();
    }
  }
  async generateImage(params, returnFullResponse) {
    if (!params.prompt) {
      throw new Error(`Invalid prompt. Prompt cannot be empty.`);
    }
    try {
      const completion = await this.api.createImage({
        prompt: params.prefix ? params.prefix + params.prompt : params.prompt,
        n: params.amount || 1,
        size: params.size || "1024x1024"
      });
      return returnFullResponse === true ? completion : completion.data.data[0].url;
    } catch (err) {
      throw new Error("Inappropriate Prompt... DallE rejected.");
    }
  }
  async search(params) {
    let pointer;
    switch (params.pointerType) {
      case "Response" /* response */: {
        pointer = { response: params.pointer };
        break;
      }
      case "Prompt" /* prompt */: {
        pointer = { prompt: params.pointer };
        break;
      }
      default: {
        pointer = { _id: params.pointer };
        break;
      }
    }
    const conversationResult = await conversationSchema_default.find(pointer);
    const returner = conversationResult[1] ? conversationResult : conversationResult[0];
    return !conversationResult ? void 0 : returner;
  }
};
export {
  LanguageModel,
  PointerTypeEnum,
  boostAI
};
