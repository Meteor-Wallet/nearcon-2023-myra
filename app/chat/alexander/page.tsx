'use client';
import { ChatCompletionMessageParam } from 'openai/resources/index.mjs';
import { useMutation } from 'react-query';
import Markdown from 'react-markdown';
import { KeyboardEvent, useEffect, useRef, useState } from 'react';
import SubmitIcon from '../../components/icons/SubmitIcon/SubmitIcon';
import LoadingIcon from '../../components/icons/LoadingIcon/LoadingIcon';

export default function Home() {
    const textAreaRef = useRef<HTMLTextAreaElement>(null);

    const [inputAreaHeight, setInputAreaHeight] = useState(0);

    const inputAreaRef = useRef<HTMLDivElement>(null);

    const [chatHistory, setChatHistory] = useState<
        ChatCompletionMessageParam[]
    >([]);

    const [userMessage, setUserMessage] = useState<string>('');

    useEffect(() => {
        setChatHistory([
            {
                role: 'assistant',
                content:
                    'Hi, I am Alexander. Your Near Protocol Assistant, how can I help you?',
            },
        ]);
    }, []);

    useEffect(() => {
        if (textAreaRef.current)
            setInputAreaHeight(textAreaRef.current.clientHeight);
    }, []);

    const sendMessageMutation = useMutation({
        mutationKey: 'sendMessage',
        mutationFn: async (chats: ChatCompletionMessageParam[]) => {
            const result = await fetch('/api/chat/alexander', {
                method: 'POST',
                body: JSON.stringify({ chats }),
            }).then((res) => res.json());

            setChatHistory((prev) => [...prev, result]);

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

    const handleKeyDown = async (event: KeyboardEvent<HTMLTextAreaElement>) => {
        if (event.key === 'Enter' && !event.shiftKey) {
            await sendMessage();
        }
    };

    return (
        <>
            <div className='px-4'>
                <div
                    className='flex flex-col  overflow-auto'
                    style={{ height: `calc(95vh - ${inputAreaHeight}px)` }}
                >
                    <div className='flex flex-col'>
                        {chatHistory &&
                            chatHistory
                                .filter(
                                    (chatItem) =>
                                        ['assistant', 'user'].includes(
                                            chatItem.role
                                        ) && chatItem.content !== null
                                )
                                .map((chatItem, index) => (
                                    <div
                                        key={index}
                                        className={
                                            chatItem.role === 'assistant'
                                                ? 'chat chat-start'
                                                : 'chat chat-end'
                                        }
                                    >
                                        <div className='chat-header'>
                                            {chatItem.role}
                                            <time className='text-xs opacity-50 pl-2'>{`${new Date().getHours()}:${new Date().getMinutes()}:${new Date().getSeconds()}`}</time>
                                        </div>
                                        <div
                                            className={
                                                'chat-bubble ' +
                                                (chatItem.role === 'assistant'
                                                    ? 'chat-bubble-info'
                                                    : '')
                                            }
                                        >
                                            {chatItem.role === 'assistant' ? (
                                                <Markdown>
                                                    {chatItem.content as string}
                                                </Markdown>
                                            ) : (
                                                <pre>
                                                    {chatItem.content as string}
                                                </pre>
                                            )}
                                        </div>
                                        {/* <div className="chat-footer opacity-50">Delivered</div> */}
                                    </div>
                                ))}
                    </div>
                </div>
            </div>
            <div ref={inputAreaRef} className='fixed bottom-1 w-full'>
                <div className='form-control p-4 bg-black'>
                    <div className='input-group'>
                        <textarea
                            style={{ resize: 'none' }}
                            ref={textAreaRef}
                            onKeyDown={handleKeyDown}
                            value={userMessage}
                            onChange={(e) => {
                                if (textAreaRef.current) {
                                    textAreaRef.current.style.height = 'auto';
                                    textAreaRef.current.style.height = `${e.target.scrollHeight}px`;

                                    setInputAreaHeight(
                                        textAreaRef.current.clientHeight
                                    );
                                }
                                setUserMessage(e.target.value);
                            }}
                            placeholder='Send a message..'
                            className='input input-bordered  w-full h-full'
                        />
                        <button
                            onClick={sendMessage}
                            disabled={sendMessageMutation.isLoading}
                            className={
                                'btn btn-square btn-primary ' +
                                (sendMessageMutation.isLoading
                                    ? 'btn-disabled opacity-25'
                                    : undefined)
                            }
                        >
                            {!sendMessageMutation.isLoading ? (
                                <SubmitIcon />
                            ) : (
                                <LoadingIcon />
                            )}
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
}
