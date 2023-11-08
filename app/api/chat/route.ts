import { getResponse, getSystemMessage } from '@/llm/engine';
import { NextResponse } from 'next/server';
import { ChatCompletionMessageParam } from 'openai/resources/index.mjs';

export async function POST(request: Request, response: Response) {
    const { chats } = (await request.json()) as {
        chats: ChatCompletionMessageParam[];
    };

    if (chats.filter((chat) => chat.role === 'system').length === 0) {
        chats.unshift(getSystemMessage());
    }

    const result = await getResponse(chats);

    return NextResponse.json(result);
}
