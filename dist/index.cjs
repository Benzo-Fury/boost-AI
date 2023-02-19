"use strict";
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
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
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/index.ts
var src_exports = {};
__export(src_exports, {
  LanguageModel: () => LanguageModel,
  boostAI: () => boostAI
});
module.exports = __toCommonJS(src_exports);
var import_openai = require("openai");
var LanguageModel = /* @__PURE__ */ ((LanguageModel2) => {
  LanguageModel2["DAVINCI"] = "text-davinci-003";
  LanguageModel2["CURIE"] = "text-curie-001";
  LanguageModel2["BABBAGE"] = "text-babbage-001";
  LanguageModel2["ADA"] = "text-ada-001";
  return LanguageModel2;
})(LanguageModel || {});
var boostAI = class {
  api;
  constructor(apiKey) {
    if (!apiKey) {
      throw new Error("API key is required.");
    }
    const configuration = new import_openai.Configuration({
      apiKey
    });
    this.api = new import_openai.OpenAIApi(configuration);
  }
  async generateText(params, returnFullResponse = false) {
    if (!params.prompt) {
      throw new Error(`Invalid prompt. Prompt cannot be empty.`);
    }
    const dt = (params.prefix || "") + `${params.prompt}.`;
    try {
      const completion = await this.api.createCompletion({
        model: params.model || "text-davinci-003",
        prompt: dt,
        max_tokens: params.maxTokens,
        temperature: params.creativity
      });
      if (returnFullResponse === true) {
        return completion;
      } else {
        return completion.data.choices[0].text;
      }
    } catch {
      return "ERROR";
    }
  }
  async generateImage(params, returnFullResponse = false) {
    if (!params.prompt) {
      throw new Error(`Invalid prompt. Prompt cannot be empty.`);
    }
    const completion = await this.api.createImage({
      prompt: params.prefix ? params.prefix + params.prompt : params.prompt,
      n: params.amount || 1,
      size: params.size || "1024x1024"
    });
    if (returnFullResponse === true) {
      return completion;
    } else {
      return completion.data.data[0].url;
    }
  }
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  LanguageModel,
  boostAI
});
