"use strict";
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/index.ts
var src_exports = {};
__export(src_exports, {
  LanguageModel: () => LanguageModel,
  PointerTypeEnum: () => PointerTypeEnum,
  boostAI: () => boostAI
});
module.exports = __toCommonJS(src_exports);
var import_openai = require("openai");
var import_mongoose2 = __toESM(require("mongoose"), 1);
var import_uniqid = __toESM(require("uniqid"), 1);

// src/schemas/conversationSchema.ts
var import_mongoose = __toESM(require("mongoose"), 1);
var conversationSchema = new import_mongoose.default.Schema({
  _id: {
    type: String,
    required: true
  },
  prompt: {
    type: String,
    required: true
  },
  response: {
    type: String,
    required: true
  },
  previousQAA: {
    type: String,
    required: false
  }
});
var conversationSchema_default = import_mongoose.default.model("Conversations", conversationSchema);

// src/index.ts
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
    const configuration = new import_openai.Configuration({
      apiKey
    });
    this.api = new import_openai.OpenAIApi(configuration);
    if (!mongoURI)
      return;
    this.connect(mongoURI);
  }
  async connect(uri) {
    try {
      import_mongoose2.default.set("strictQuery", false);
      const connection = await import_mongoose2.default.connect(uri, {
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
        id = (0, import_uniqid.default)();
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
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  LanguageModel,
  PointerTypeEnum,
  boostAI
});
