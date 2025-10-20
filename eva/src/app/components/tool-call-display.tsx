import { Terminal } from 'lucide-react';
import type { ToolCall } from '@/lib/types';

interface ToolCallDisplayProps {
  toolCall: ToolCall;
}

export default function ToolCallDisplay({ toolCall }: ToolCallDisplayProps) {
  return (
    <div className="border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800/50 rounded-lg p-3">
        <div className="flex items-center gap-2 mb-2">
          <Terminal className="w-4 h-4 text-gray-500" />
          <p className="text-sm font-semibold text-gray-700 dark:text-gray-300">
            Tool: <span className="font-mono">{toolCall.name}</span>
          </p>
        </div>
        <p className="text-xs text-gray-500 mb-2 ml-6">Arguments:</p>
        <pre className="bg-gray-100 dark:bg-gray-900 rounded-md p-2 text-xs overflow-x-auto custom-scrollbar ml-6">
          <code>{JSON.stringify(toolCall.args, null, 2)}</code>
        </pre>
    </div>
  );
}