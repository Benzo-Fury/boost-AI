"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.boostAI = exports.LanguageModel = void 0;
const openai_1 = require("openai");
var LanguageModel;
(function (LanguageModel) {
    LanguageModel["DAVINCI"] = "text-davinci-003";
    LanguageModel["CURIE"] = "text-curie-001";
    LanguageModel["BABBAGE"] = "text-babbage-001";
    LanguageModel["ADA"] = "text-ada-001";
})(LanguageModel = exports.LanguageModel || (exports.LanguageModel = {}));
class boostAI {
    api;
    constructor(apiKey) {
        if (!apiKey) {
            throw new Error("API key is required.");
        }
        const configuration = new openai_1.Configuration({
            apiKey,
        });
        this.api = new openai_1.OpenAIApi(configuration);
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
                temperature: params.creativity,
            });
            if (returnFullResponse === true) {
                return completion;
            }
            else {
                return completion.data.choices[0].text;
            }
        }
        catch {
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
            size: params.size || "1024x1024",
        });
        if (returnFullResponse === true) {
            return completion;
        }
        else {
            return completion.data.data[0].url;
        }
    }
}
exports.boostAI = boostAI;
