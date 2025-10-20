import { BrainCircuit } from 'lucide-react';

interface AgentStatusProps {
  thought: string;
}

export default function AgentStatus({ thought }: AgentStatusProps) {
  return (
    <div className="flex items-start gap-3">
      <div className="w-10 h-10 rounded-full bg-gray-200 dark:bg-gray-700 flex-shrink-0 flex items-center justify-center">
        <BrainCircuit className="w-6 h-6 text-gray-500 animate-pulse" />
      </div>
      <div className="relative">
        <div className="bubble-left bg-white dark:bg-[#2b2b2b] text-gray-900 dark:text-gray-100 px-4 py-3 rounded-2xl rounded-tl-none shadow-sm max-w-[70vw]">
          <p className="text-sm font-semibold italic text-gray-500 dark:text-gray-400">Thinking...</p>
          <p className="text-sm leading-relaxed mt-1">{thought}</p>
        </div>
      </div>
    </div>
  );
}