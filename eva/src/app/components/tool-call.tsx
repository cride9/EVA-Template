import { Terminal } from 'lucide-react';
import type { ToolCall } from '@/lib/types';

interface ToolCallProps {
  toolCall: ToolCall;
}

export default function ToolCallDisplay({ toolCall }: ToolCallProps) {
  return (
    <div className="flex items-start gap-3">
      <div className="w-10 h-10 rounded-full bg-blue-100 dark:bg-blue-900/50 flex-shrink-0 flex items-center justify-center">
        <Terminal className="w-6 h-6 text-blue-500" />
      </div>
      <div className="relative w-full">
        <div className="bubble-left bg-white dark:bg-[#2b2b2b] text-gray-900 dark:text-gray-100 px-4 py-3 rounded-2xl rounded-tl-none shadow-sm max-w-[70vw]">
          <p className="text-sm font-semibold text-blue-600 dark:text-blue-400">
            Using Tool: <span className="font-mono">{toolCall.name}</span>
          </p>
          <pre className="mt-2 bg-gray-100 dark:bg-gray-800 rounded-md p-3 text-xs overflow-x-auto custom-scrollbar">
            <code>{JSON.stringify(toolCall.args, null, 2)}</code>
          </pre>
        </div>
      </div>
    </div>
  );
}