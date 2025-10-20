import Image from "next/image";
import type { Message } from "@/lib/types";
import AgentStatus from "./agent-status";
import ToolCallGroup from "./tool-call-group";

interface ChatAreaProps {
  messages: Message[];
}

export default function ChatArea({ messages }: ChatAreaProps) {
  if (messages.length === 0) {
    return (
      <div className="flex h-full items-center justify-center">
        <div className="text-center">
          <Image src="/imgs/evaLogoTransparent.png" alt="EVA Logo" width={96} height={96} className="mx-auto" />
          <h2 className="mt-4 text-2xl font-bold text-gray-700 dark:text-gray-200">EVA Agent</h2>
          <p className="mt-2 text-gray-500 dark:text-gray-400">Start a conversation by typing below.</p>
        </div>
      </div>
    );
  }

  const renderMessages = () => {
    const elements = [];
    let i = 0;
    while (i < messages.length) {
      const msg = messages[i];

      if (msg.type === 'agent_tool_call') {
        const toolCallsGroup = [];
        while (i < messages.length && messages[i].type === 'agent_tool_call') {
          toolCallsGroup.push((messages[i] as { type: 'agent_tool_call'; toolCall: any }).toolCall);
          i++;
        }
        elements.push(<ToolCallGroup key={`tool-group-${i}`} toolCalls={toolCallsGroup} />);
        continue;
      }
      
      switch (msg.type) {
        case 'user':
          elements.push(
            <div key={i} className="flex items-start gap-3 justify-end">
              <div className="relative text-right">
                <div className="bubble-right bg-purple-100 dark:bg-[#6c667e] dark:text-gray-800 dark:text-white px-4 py-2 rounded-2xl rounded-tr-none shadow-sm max-w-[70vw]">
                  <p className="text-sm leading-relaxed">{msg.content}</p>
                </div>
              </div>
            </div>
          );
          break;
        case 'agent_thought':
          elements.push(<AgentStatus key={i} thought={msg.content} />);
          break;
        case 'agent_finished':
           elements.push(
            <div key={i} className="flex items-start gap-3">
              <Image
                src="/imgs/evaLogoTransparent.png"
                alt="avatar"
                width={40}
                height={40}
                className="w-10 h-10 rounded-full flex-shrink-0"
              />
              <div className="relative">
                <div className="prose prose-sm dark:prose-invert bubble-left bg-white dark:bg-[#2b2b2b] text-gray-900 dark:text-gray-100 px-4 py-2 rounded-2xl rounded-tl-none shadow-sm max-w-[70vw]">
                  <p className="font-bold">Task Finished</p>
                  <p>{msg.content}</p>
                </div>
              </div>
            </div>
          );
          break;
      }
      i++;
    }
    return elements;
  };

  return (
    <div className="absolute top-0 h-[calc(100%-150px)] md:h-[calc(100%-180px)] w-full px-4 md:px-8 overflow-y-auto custom-scrollbar">
      <div className="max-w-4xl mx-auto p-4 space-y-6">
        {renderMessages()}
      </div>
    </div>
  );
}