"use client";

import { useState } from 'react';
import { Wrench, ChevronDown } from 'lucide-react';
import type { ToolCall } from '@/lib/types';
import ToolCallDisplay from './tool-call-display'; // We will create this next

interface ToolCallGroupProps {
  toolCalls: ToolCall[];
}

export default function ToolCallGroup({ toolCalls }: ToolCallGroupProps) {
  const [isOpen, setIsOpen] = useState(false);

  if (toolCalls.length === 0) return null;

  return (
    <div className="flex items-start gap-3">
      <div className="w-10 h-10 rounded-full bg-blue-100 dark:bg-blue-900/50 flex-shrink-0 flex items-center justify-center">
        <Wrench className="w-6 h-6 text-blue-500" />
      </div>
      <div className="relative w-full">
        <div className="bubble-left bg-white dark:bg-[#2b2b2b] text-gray-900 dark:text-gray-100 rounded-2xl rounded-tl-none shadow-sm max-w-[70vw]">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="flex items-center justify-between w-full px-4 py-3 text-left"
          >
            <p className="text-sm font-semibold text-blue-600 dark:text-blue-400">
              Using {toolCalls.length} Tool{toolCalls.length > 1 ? 's' : ''}
            </p>
            <ChevronDown
              className={`w-5 h-5 text-gray-500 dark:text-gray-400 transition-transform duration-200 ${
                isOpen ? 'rotate-180' : ''
              }`}
            />
          </button>
          
          {isOpen && (
            <div className="px-4 pb-3 border-t border-gray-200 dark:border-gray-700 mt-2 pt-2 space-y-2">
              {toolCalls.map((toolCall, index) => (
                <ToolCallDisplay key={index} toolCall={toolCall} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}