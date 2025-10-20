"use client"

import type React from "react"
import { useState, useRef, useEffect } from "react"
import Image from "next/image"
import { SendHorizonal, LoaderCircle } from "lucide-react"

interface MessageInputProps {
  onSendMessage: (message: string) => void;
  isProcessing: boolean;
}

export default function MessageInput({ onSendMessage, isProcessing }: MessageInputProps) {
  const [message, setMessage] = useState("")
  const textareaRef = useRef<HTMLTextAreaElement>(null)

  const autoResize = () => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto"
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`
    }
  }

  useEffect(() => {
    autoResize()
  }, [message])

  const handleSendMessage = () => {
    if (message.trim() && !isProcessing) {
      onSendMessage(message.trim());
      setMessage("");
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  }

  return (
    <div className="absolute flex flex-col justify-end p-4 md:p-10 bottom-2 w-full">
      <div className="flex justify-center w-full">
        <div className="relative w-full max-w-3xl">
          {!isProcessing && (
            <div className="absolute bottom-full mb-4 w-full flex justify-center items-center gap-2 animate-fade-in">
              <Image src="/imgs/evaLogoTransparent.png" alt="EVA Logo" width={48} height={48} className="w-12 h-12" />
              <p className="text-lg font-semibold text-gray-700 dark:text-gray-200">What can I do for you?</p>
            </div>
          )}

          <div className="flex flex-col border bg-white dark:bg-[#2b2b2b] shadow-lg dark:drop-shadow-[0_15px_35px_rgba(220,208,255,0.15)] border-gray-300 dark:border-[#353535] rounded-2xl p-4 max-h-[50vh] overflow-y-auto custom-scrollbar">
            <textarea
              ref={textareaRef}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyDown={handleKeyDown}
              className="custom-scrollbar flex-grow outline-0 caret-purple-500 dark:caret-[#dcd0ff] w-full resize-none text-base placeholder-gray-500 dark:placeholder-gray-400 bg-transparent text-gray-800 dark:text-gray-100"
              rows={1}
              placeholder={isProcessing ? "EVA is working..." : "Message EVA..."}
              disabled={isProcessing}
            />

            <div className="pt-2">
              <div className="w-full flex justify-end items-center text-xs">
                <button
                  onClick={handleSendMessage}
                  title="Send Message"
                  disabled={isProcessing || !message.trim()}
                  className="bg-purple-600 dark:bg-[#dcd0ff] w-10 h-10 rounded-full flex items-center justify-center transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed enabled:hover:bg-purple-700 enabled:dark:hover:bg-purple-300"
                >
                  {isProcessing ? (
                    <LoaderCircle className="w-6 h-6 animate-spin text-white dark:text-[#2b2b2b]" />
                  ) : (
                    <SendHorizonal className="w-6 h-6 text-white dark:text-[#2b2b2b]" />
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}