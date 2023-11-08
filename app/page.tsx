'use client';
import { ChatCompletionMessageParam } from 'openai/resources/index.mjs';
import { useMutation } from 'react-query';
import Markdown from 'react-markdown';
import { useEffect, useState } from 'react';

export default function Home() {
    const [chatHistory, setChatHistory] = useState<
        ChatCompletionMessageParam[]
    >([]);

    const [userMessage, setUserMessage] = useState<string>('');

    useEffect(() => {
        setChatHistory([
            {
                role: 'assistant',
                content:
                    'Hi, I am Myra. Your Near Protocol Assistant, how can I help you?',
            },
        ]);
    }, []);

    const sendMessageMutation = useMutation({
        mutationKey: 'sendMessage',
        mutationFn: async (chats: ChatCompletionMessageParam[]) => {
            const result = await fetch('/api/chat', {
                method: 'POST',
                body: JSON.stringify({ chats }),
            }).then((res) => res.json());

            console.log(result);
            setChatHistory(result);

            return;
        },
    });

    async function sendMessage() {
        const newChatHistory: ChatCompletionMessageParam[] = [
            ...chatHistory,
            { role: 'user', content: userMessage },
        ];

        setChatHistory(newChatHistory);
        setUserMessage('');
        sendMessageMutation.mutate(newChatHistory);
    }

    return (
        <div className='px-4'>
            <div className='flex flex-col'>
                {chatHistory &&
                    chatHistory
                        .filter(
                            (chatItem) =>
                                ['assistant', 'user'].includes(chatItem.role) &&
                                chatItem.content !== null
                        )
                        .map((chatItem, index) => (
                            <div
                                key={index}
                                className={
                                    chatItem.role === 'assistant'
                                        ? 'self-start p-2 bg-gray-200 rounded-md w-4/5 mt-2'
                                        : 'self-end p-2 bg-green-200 rounded-md w-4/5 mt-2'
                                }
                            >
                                <div className='text-gray-600 text-sm capitalize'>
                                    {chatItem.role}
                                </div>
                                <div className='text-gray-900 text-md whitespace-pre-wrap'>
                                    <Markdown>
                                        {chatItem.content as string}
                                    </Markdown>
                                </div>
                            </div>
                        ))}
            </div>
            {sendMessageMutation.isLoading ? (
                <div>loading...</div>
            ) : (
                <div className='flex flex-row rounded-md overflow-hidden mt-2'>
                    <textarea
                        className='flex-auto text-md p-3 text-black bg-white'
                        value={userMessage}
                        onChange={(e) => setUserMessage(e.target.value)}
                    ></textarea>

                    <button
                        onClick={sendMessage}
                        className='flex-0 text-xl py-3 px-10 bg-sky-600 text-sky-200'
                    >
                        Send
                    </button>
                </div>
            )}
        </div>
    );
}
