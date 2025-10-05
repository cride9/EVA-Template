"use client"

import Image from "next/image"

interface SidebarProps {
  theme: "light" | "dark"
  onToggleTheme: () => void
  isCollapsed: boolean
  onToggleSidebar: () => void
}

export default function Sidebar({ theme, onToggleTheme, isCollapsed, onToggleSidebar }: SidebarProps) {
  return (
    <div className="z-50 w-full md:static absolute md:flex flex-col justify-between p-2 border-r bg-white dark:bg-[#1f1f1f] border-gray-200 dark:border-[#3d3d3d] transition-all duration-300 ease-in-out overflow-hidden">
      <div className="flex flex-col gap-2 h-full">
        <div className="flex items-center justify-between p-2">
          <div className="flex items-center gap-2 overflow-hidden">
            <Image src="/imgs/evaLogoTransparent.png" alt="EVA Logo" width={40} height={40} className="w-10 h-10" />
            <p className="sidebar-text bg-gradient-to-r from-purple-600 to-blue-500 dark:from-white dark:to-[#dcd0ff] bg-clip-text text-transparent text-2xl font-bold whitespace-nowrap transition-opacity duration-200">
              EVA Agent
            </p>
          </div>
          <button
            onClick={onToggleSidebar}
            className="md:hidden p-2 rounded-md hover:bg-gray-200 dark:hover:bg-purple-100/20 transition-colors"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className={`h-6 w-6 transition-transform duration-300 ${isCollapsed ? "rotate-180" : ""}`}
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
            </svg>
          </button>
        </div>

        <div className={`px-2 flex-grow overflow-y-auto custom-scrollbar ${isCollapsed ? "hidden md:block" : ""}`}>
          <ul className="space-y-1">
            <li>
              <h3 className="sidebar-text text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider px-3 py-2 transition-opacity duration-200">
                Today
              </h3>
            </li>

            <li>
              <a
                href="#"
                className="flex items-center gap-3 rounded-lg px-3 py-2 bg-purple-100 dark:bg-[#6c667e] text-purple-700 dark:text-white font-semibold transition-colors"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  height="20px"
                  viewBox="0 -960 960 960"
                  width="20px"
                  className="fill-current"
                >
                  <path d="M240-400h320v-80H240v80Zm0-120h480v-80H240v80Zm0-120h480v-80H240v80ZM80-80v-720q0-33 23.5-56.5T160-880h640q33 0 56.5 23.5T880-800v480q0 33-23.5 56.5T800-240H240L80-80Zm126-240h594v-480H160v525l46-45Zm-46 0v-480 480Z" />
                </svg>
                <span className="sidebar-text truncate transition-opacity duration-200">
                  Exploring Tailwind CSS for Chat UIs
                </span>
              </a>
            </li>

            <li>
              <a
                href="#"
                className="flex items-center gap-3 rounded-lg px-3 py-2 text-gray-700 dark:text-gray-200 hover:bg-purple-100 dark:hover:bg-purple-100/20 font-semibold transition-colors"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  height="20px"
                  viewBox="0 -960 960 960"
                  width="20px"
                  className="fill-current"
                >
                  <path d="M240-400h320v-80H240v80Zm0-120h480v-80H240v80Zm0-120h480v-80H240v80ZM80-80v-720q0-33 23.5-56.5T160-880h640q33 0 56.5 23.5T880-800v480q0 33-23.5 56.5T800-240H240L80-80Zm126-240h594v-480H160v525l46-45Zm-46 0v-480 480Z" />
                </svg>
                <span className="sidebar-text truncate transition-opacity duration-200">
                  Implementing Light/Dark Mode
                </span>
              </a>
            </li>

            <li>
              <h3 className="sidebar-text text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider px-3 py-2 transition-opacity duration-200">
                Yesterday
              </h3>
            </li>

            <li>
              <a
                href="#"
                className="flex items-center gap-3 rounded-lg px-3 py-2 text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-purple-100/20 font-semibold transition-colors"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  height="20px"
                  viewBox="0 -960 960 960"
                  width="20px"
                  className="fill-current"
                >
                  <path d="M240-400h320v-80H240v80Zm0-120h480v-80H240v80Zm0-120h480v-80H240v80ZM80-80v-720q0-33 23.5-56.5T160-880h640q33 0 56.5 23.5T880-800v480q0 33-23.5 56.5T800-240H240L80-80Zm126-240h594v-480H160v525l46-45Zm-46 0v-480 480Z" />
                </svg>
                <span className="sidebar-text truncate transition-opacity duration-200">Future of AI Assistants</span>
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className="p-2 border-t border-gray-200 dark:border-[#3d3d3d]">
        <button
          onClick={onToggleTheme}
          className="w-full h-full flex items-center justify-center gap-3 rounded-lg px-3 py-2 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-purple-100/20 transition-colors"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className={`w-6 h-6 ${theme === "dark" ? "hidden" : ""}`}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 3v2.25m6.364.386-1.591 1.591M21 12h-2.25m-.386 6.364-1.591-1.591M12 18.75V21m-4.773-4.227-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0Z"
            />
          </svg>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className={`w-6 h-6 ${theme === "light" ? "hidden" : ""}`}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M21.752 15.002A9.72 9.72 0 0 1 18 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 0 0 3 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 0 0 9.002-5.998Z"
            />
          </svg>
          <span className="sidebar-text transition-opacity duration-200">Toggle Theme</span>
        </button>
      </div>
    </div>
  )
}
