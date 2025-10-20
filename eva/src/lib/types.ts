export interface ToolCall {
  name: string;
  args: Record<string, any>;
}

export interface ToolOutput {
  name: string;
  output: string;
}

export type Message =
  | { type: 'user'; content: string }
  | { type: 'agent_start' }
  | { type: 'agent_thought'; content: string }
  | { type: 'agent_tool_call'; toolCall: ToolCall }
  | { type: 'agent_tool_output'; toolOutput: ToolOutput }
  | { type: 'agent_response'; content: string }
  | { type: 'agent_finished'; content: string };