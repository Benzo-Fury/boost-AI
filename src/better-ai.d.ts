import { AxiosResponse } from "axios";
import { CreateCompletionResponse, ImagesResponse } from "openai";
import conversationSchema from "./schemas/conversationSchema";

declare module "boost-ai" {
  import {
    LanguageModel,
    TextGenerationParams,
    ImageGenerationParams,
    PointerParams,
    GenerationParams,
  } from "boost-ai";

  export class boostAI {
    constructor(apiKey: string, uri?: string, returnFullResponse?: boolean);

    generateText(
      params: TextGenerationParams
    ): Promise<string | AxiosResponse<CreateCompletionResponse>>;

    generateImage(
      params: ImageGenerationParams
    ): Promise<string | AxiosResponse<ImagesResponse>>;

    search(params: PointerParams): Promise<mongoose.Document | string>;
  }

  export { conversationSchema };
}
