"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import Image from "next/image"

export default function MessageInput() {
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

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      console.log("Sending message:", message)
      setMessage("")
    }
  }

  const handleSend = () => {
    if (message.trim()) {
      console.log("Sending message:", message)
      setMessage("")
    }
  }

  return (
    <div className="absolute flex flex-col justify-end p-4 md:p-10 bottom-2 w-full">
      <div className="flex justify-center w-full">
        <div className="relative w-full max-w-3xl">
          <div className="absolute bottom-full mb-4 w-full flex justify-center items-center gap-2">
            <Image src="/imgs/evaLogoTransparent.png" alt="EVA Logo" width={48} height={48} className="w-12 h-12" />
            <p className="text-lg font-semibold text-gray-700 dark:text-gray-200">What can I do for you?</p>
          </div>

          <div className="flex flex-col border bg-white dark:bg-[#2b2b2b] shadow-lg dark:drop-shadow-[0_15px_35px_rgba(220,208,255,0.15)] border-gray-300 dark:border-[#353535] rounded-2xl p-4 max-h-[50vh] overflow-y-auto custom-scrollbar">
            <textarea
              ref={textareaRef}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyDown={handleKeyDown}
              className="custom-scrollbar flex-grow outline-0 caret-purple-500 dark:caret-[#dcd0ff] w-full resize-none text-base placeholder-gray-500 dark:placeholder-gray-400 bg-transparent text-gray-800 dark:text-gray-100"
              rows={1}
              placeholder="Message EVA..."
            />

            <div className="pt-2">
              <div className="w-full flex justify-between items-center text-xs">
                <div className="flex space-x-2">
                  <button
                    title="Voice Search Off"
                    className="border bg-gray-100 dark:bg-[#222222] border-gray-300 dark:border-[#3d3d3d] rounded-full w-10 h-10 flex justify-center items-center text-gray-500 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-purple-100/20 transition"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      height="18px"
                      viewBox="0 -960 960 960"
                      width="18px"
                      className="fill-current"
                    >
                      <path d="M480-80q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q146 0 255.5 91.5T872-559h-82q-19-73-68.5-130.5T600-776v16q0 33-23.5 56.5T520-680h-80v80q0 17-11.5 28.5T400-560h-80v80h80v120h-40L168-552q-3 18-5.5 36t-2.5 36q0 131 92 225t228 95v80Zm364-20L716-228q-21 12-45 20t-51 8q-75 0-127.5-52.5T440-380q0-75 52.5-127.5T620-560q75 0 127.5 52.5T800-380q0 27-8 51t-20 45l128 128-56 56ZM620-280q42 0 71-29t29-71q0-42-29-71t-71-29q-42 0-71 29t-29 71q0 42 29 71t71 29Z" />
                    </svg>
                  </button>
                  <button
                    title="Voice Search On"
                    className="border bg-purple-600 dark:bg-[#514d5f] border-purple-700 dark:border-[#3d3d3d] rounded-full w-10 h-10 flex justify-center items-center text-white dark:text-gray-200"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      height="18px"
                      viewBox="0 -960 960 960"
                      width="18px"
                      className="fill-current"
                    >
                      <path d="M480-80q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q146 0 255.5 91.5T872-559h-82q-19-73-68.5-130.5T600-776v16q0 33-23.5 56.5T520-680h-80v80q0 17-11.5 28.5T400-560h-80v80h80v120h-40L168-552q-3 18-5.5 36t-2.5 36q0 131 92 225t228 95v80Zm364-20L716-228q-21 12-45 20t-51 8q-75 0-127.5-52.5T440-380q0-75 52.5-127.5T620-560q75 0 127.5 52.5T800-380q0 27-8 51t-20 45l128 128-56 56ZM620-280q42 0 71-29t29-71q0-42-29-71t-71-29q-42 0-71 29t-29 71q0 42 29 71t71 29Z" />
                    </svg>
                  </button>
                </div>
                <button
                  onClick={handleSend}
                  title="Send Message"
                  className="bg-purple-600 dark:bg-[#dcd0ff] w-10 h-10 rounded-full flex items-center justify-center hover:bg-purple-700 dark:hover:bg-purple-300 transition"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    height="24px"
                    viewBox="0 -960 960 960"
                    width="24px"
                    className="fill-current text-white dark:text-[#2b2b2b]"
                  >
                    <path d="M440-240v-368L296-464l-56-56 240-240 240 240-56 56-144-144v368h-80Z" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
