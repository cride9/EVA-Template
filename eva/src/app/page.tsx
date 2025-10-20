"use client"

import { useState, useEffect, useRef } from "react"
import Sidebar from "./components/sidebar"
import ChatArea from "./components/chat-area"
import MessageInput from "./components/message-input"
import { io, Socket } from "socket.io-client"
import type { Message, ToolCall, ToolOutput } from "@/lib/types";

// The URL of your backend server
const BACKEND_URL = "http://localhost:3001";

export default function Home() {
  const [theme, setTheme] = useState<"light" | "dark">("light");
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  
  const [messages, setMessages] = useState<Message[]>([]);
  const [sessionId, setSessionId] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState<boolean>(false);
  const socketRef = useRef<Socket | null>(null);
  const [streamingThought, setStreamingThought] = useState<string | null>(null); // NEW state for streaming thought

  // Theme and sidebar logic (unchanged)
  useEffect(() => {
    const savedTheme = localStorage.getItem("theme") as "light" | "dark" | null;
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    const initialTheme = savedTheme || (prefersDark ? "dark" : "light");
    setTheme(initialTheme);
    document.documentElement.classList.toggle("dark", initialTheme === "dark");
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    localStorage.setItem("theme", newTheme);
    document.documentElement.classList.toggle("dark", newTheme === "dark");
  };

  const toggleSidebar = () => setIsSidebarCollapsed(!isSidebarCollapsed);

useEffect(() => {
    const socket = io(BACKEND_URL);
    socketRef.current = socket;

    socket.on('connect', () => {
      console.log('Connected to WebSocket server');
      if (sessionId) socket.emit('register', sessionId);
    });

    socket.on('disconnect', () => console.log('Disconnected from WebSocket server'));

    socket.on('agent_thought', (thought: string) => {
      setMessages(prev => {
        // Avoid duplicate "thinking..." messages
        const lastMessage = prev[prev.length - 1];
        if (lastMessage?.type === 'agent_thought' && lastMessage.content.includes("thinking...")) {
          const newMessages = [...prev];
          newMessages[newMessages.length - 1] = { type: 'agent_thought', content: thought };
          return newMessages;
        }
        return [...prev, { type: 'agent_thought', content: thought }];
      });
    });

    socket.on('tool_call', (toolCall: ToolCall) => {
      setMessages(prev => [...prev, { type: 'agent_tool_call', toolCall }]);
    });

    socket.on('agent_finished', (message: string) => {
      setIsProcessing(false);
      setMessages(prev => [...prev, { type: 'agent_finished', content: message }]);
    });
    
    return () => { socket.disconnect(); };
  }, [sessionId]);

  const handleSendMessage = async (message: string) => {
    if (isProcessing) return;
    setIsProcessing(true);
    setMessages([{ type: 'user', content: message }]);

    try {
      const response = await fetch(`${BACKEND_URL}/api/start`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ task: message }),
      });

      if (!response.ok) throw new Error('Failed to start agent task');
      
      const data = await response.json();
      setSessionId(data.sessionId);
      socketRef.current?.emit('register', data.sessionId);

    } catch (error) {
      console.error(error);
      setMessages(prev => [...prev, { type: 'agent_finished', content: `Error: Could not connect to the agent.` }]);
      setIsProcessing(false);
    }
  };

  // Auto-scroll logic
  const chatAreaRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (chatAreaRef.current) {
      chatAreaRef.current.scrollTop = chatAreaRef.current.scrollHeight;
    }
  }, [messages]);

  return (
    <div className="grid grid-cols-1 md:grid-cols-[260px_1fr] h-screen">
      <Sidebar
        theme={theme}
        onToggleTheme={toggleTheme}
        isCollapsed={isSidebarCollapsed}
        onToggleSidebar={toggleSidebar}
      />

      <div className="h-screen relative bg-gray-100 dark:bg-[#161616]">
        <div ref={chatAreaRef} className="h-full w-full">
            <ChatArea messages={messages} />
        </div>
        <MessageInput onSendMessage={handleSendMessage} isProcessing={isProcessing} />
      </div>
    </div>
  )
}