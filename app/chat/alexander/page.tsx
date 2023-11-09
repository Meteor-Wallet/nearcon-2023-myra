"use client";
import { ChatCompletionMessageParam } from "openai/resources/index.mjs";
import { useMutation } from "react-query";
import Markdown from "react-markdown";
import { KeyboardEvent, useEffect, useRef, useState } from "react";
import SubmitIcon from "../../components/icons/SubmitIcon/SubmitIcon";
import LoadingIcon from "../../components/icons/LoadingIcon/LoadingIcon";
import { ExecuteSqlResult } from "@/llm/alexander/executeSql";
import DisplaySqlResult from "./DisplaySqlResult";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();
  const textAreaRef = useRef<HTMLTextAreaElement>(null);

  const [inputAreaHeight, setInputAreaHeight] = useState(0);

  const inputAreaRef = useRef<HTMLDivElement>(null);

  const [showDebug, setShowDebug] = useState(false);

  const [chatHistory, setChatHistory] = useState<
    (ChatCompletionMessageParam | ExecuteSqlResult)[]
  >([]);

  const [userMessage, setUserMessage] = useState<string>("");

  useEffect(() => {
    setChatHistory([
      {
        role: "assistant",
        content:
          "Hi, I am Alexander. Your Near Protocol Assistant, how can I help you?",
      },
    ]);
  }, []);

  useEffect(() => {
    if (textAreaRef.current)
      setInputAreaHeight(textAreaRef.current.clientHeight);
  }, []);

  const sendMessageMutation = useMutation({
    mutationKey: "sendMessage",
    mutationFn: async (
      chats: (ChatCompletionMessageParam | ExecuteSqlResult)[]
    ) => {
      const result: {
        chatResult: ChatCompletionMessageParam;
        sqlResult: ExecuteSqlResult;
      } = await fetch("/api/chat/alexander", {
        method: "POST",
        body: JSON.stringify({ chats }),
      }).then((res) => res.json());

      console.log(result);

      setChatHistory((prev) => [...prev, result.chatResult]);

      if (result.sqlResult.status === "success") {
        setChatHistory((prev) => [...prev, result.sqlResult]);
      }

      return;
    },
  });

  async function sendMessage() {
    const newChatHistory: (ChatCompletionMessageParam | ExecuteSqlResult)[] = [
      ...chatHistory,
      { role: "user", content: userMessage },
    ];

    setChatHistory(newChatHistory);
    setUserMessage("");
    sendMessageMutation.mutate(newChatHistory);
  }

  const handleKeyDown = async (event: KeyboardEvent<HTMLTextAreaElement>) => {
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault();
      await sendMessage();
    }
  };

  return (
    <>
      <div className="px-4">
        <div
          className="flex flex-col  overflow-auto"
          style={{ height: `calc(95vh - ${inputAreaHeight}px)` }}
        >
          {/** START top section  */}
          <div className="flex justify-between">
            <button
              onClick={() => {
                router.back();
              }}
            >
              Back
            </button>
            {/* <div className="form-control">
              <label className="cursor-pointer label">
                <span className="label-text p-2">Debug</span>
                <input
                  type="checkbox"
                  className="toggle toggle-primary"
                  checked={showDebug}
                  onChange={(v) => {
                    setShowDebug((prev) => !prev);
                  }}
                />
              </label>
            </div> */}
          </div>
          {/** END top section  */}
        </div>
      </div>
      <div ref={inputAreaRef} className="fixed bottom-1 w-full">
        <div className="form-control p-4 bg-black">
          <div className="input-group">
            <textarea
              style={{ resize: "none" }}
              ref={textAreaRef}
              onKeyDown={handleKeyDown}
              value={userMessage}
              onChange={(e) => {
                if (textAreaRef.current) {
                  textAreaRef.current.style.height = "auto";
                  textAreaRef.current.style.height = `${e.target.scrollHeight}px`;

                  setInputAreaHeight(textAreaRef.current.clientHeight);
                }
                setUserMessage(e.target.value);
              }}
              placeholder="Send a message.."
              className="input input-bordered  w-full h-full"
            />
            <button
              onClick={sendMessage}
              disabled={sendMessageMutation.isLoading}
              className={
                "btn btn-square btn-primary " +
                (sendMessageMutation.isLoading
                  ? "btn-disabled opacity-25"
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
