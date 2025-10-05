import Image from "next/image"

export default function ChatArea() {
  return (
    <div className="absolute top-[13%] md:top-0 md:h-[78%] w-full px-12 md:px-22 overflow-auto custom-scrollbar">
      <div className="max-w-7xl mx-auto p-4 space-y-4">
        <div className="flex items-start gap-3 justify-end">
          <div className="relative text-right">
            <div className="bubble-right bg-purple-100 dark:bg-[#6c667e] dark:text-white px-4 py-2 rounded-2xl rounded-tr-none shadow-sm max-w-[70vw]">
              <p className="text-sm leading-relaxed">Who&apos;s the best person in the world?</p>
            </div>
            <div className="mt-1 text-xs text-gray-300">11:24 AM</div>
          </div>
        </div>

        <div className="flex items-start gap-3">
          <Image
            src="/imgs/evaLogoTransparent.png"
            alt="avatar"
            width={40}
            height={40}
            className="w-10 h-10 rounded-full flex-shrink-0"
          />
          <div className="relative">
            <div className="bubble-left bg-white text-gray-900 px-4 py-2 rounded-2xl rounded-tl-none shadow-sm max-w-[70vw]">
              <p className="text-sm leading-relaxed">
                That&apos;s a subjective question! Everyone has their own perspective on who they admire most.
              </p>
            </div>
            <div className="mt-1 text-xs text-gray-400 ml-1">11:25 AM</div>
          </div>
        </div>
      </div>
    </div>
  )
}
