import { AxiosResponse } from "axios";
import { CreateCompletionResponse, ImagesResponse } from "openai";
import conversationSchema from "./schemas/conversationSchema";

import {
  LanguageModel,
  TextGenerationParams,
  TextGenerationReturnParams,
  ImageGenerationParams,
  PointerParams,
  PointerTypeEnum
} from "./index";

declare module "boost-ai" {
  export class boostAI {
    constructor(apiKey: string, uri?: string, returnFullResponse?: boolean);

    generateText(
      params: TextGenerationParams,
      returnFullResponse?: boolean
    ): Promise<string | TextGenerationReturnParams>;

    generateImage(
      params: ImageGenerationParams,
      returnFullResponse?: boolean
    ): Promise<string | AxiosResponse<ImagesResponse>>;

    search(params: PointerParams): Promise<mongoose.Document | string>;
  }
}

export { conversationSchema, TextGenerationParams, PointerTypeEnum, TextGenerationReturnParams };
