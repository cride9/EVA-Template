"use client"

import { useState, useEffect } from "react"
import Sidebar from "./components/sidebar"
import ChatArea from "./components/chat-area"
import MessageInput from "./components/message-input"

export default function Home() {
  const [theme, setTheme] = useState<"light" | "dark">("light")
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false)

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme") as "light" | "dark" | null
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches
    const initialTheme = savedTheme || (prefersDark ? "dark" : "light")

    setTheme(initialTheme)
    document.documentElement.classList.toggle("dark", initialTheme === "dark")
  }, [])

  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light"
    setTheme(newTheme)
    localStorage.setItem("theme", newTheme)
    document.documentElement.classList.toggle("dark", newTheme === "dark")
  }

  const toggleSidebar = () => {
    setIsSidebarCollapsed(!isSidebarCollapsed)
  }

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setIsSidebarCollapsed(false)
      }
    }

    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [])

  return (
    <div
      className={`grid grid-cols-1 md:grid-cols-[260px_1fr] h-screen transition-all duration-300 ease-in-out ${
        isSidebarCollapsed ? "grid-rows-[68px_1fr]" : "grid-rows-[330px_1fr]"
      } md:grid-rows-1`}
    >
      <Sidebar
        theme={theme}
        onToggleTheme={toggleTheme}
        isCollapsed={isSidebarCollapsed}
        onToggleSidebar={toggleSidebar}
      />

      <div className="h-[99.9vh] relative">
        <ChatArea />
        <MessageInput />
      </div>
    </div>
  )
}
