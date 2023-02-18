import { AxiosResponse } from "axios";
import { CreateCompletionResponse, ImagesResponse } from "openai";

declare module "boost-ai" {
  import {
    LanguageModel,
    TextGenerationParams,
    ImageGenerationParams,
    GenerationParams,
  } from "boost-ai";

  export class boostAI {
    constructor(apiKey: string);

    generateText(
      params: TextGenerationParams,
      returnFullResponse = false
    ): Promise<string | AxiosResponse<CreateCompletionResponse>>;

    generateImage(
      params: ImageGenerationParams,
      returnFullResponse = false
    ): Promise<string | AxiosResponse<ImagesResponse>>
  }
}
