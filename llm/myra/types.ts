import { ChatCompletionTool } from 'openai/resources/index.mjs';

export interface Tool {
    chatCompletionTools: ChatCompletionTool;
    handler: (params: any) => Promise<string>;
}
