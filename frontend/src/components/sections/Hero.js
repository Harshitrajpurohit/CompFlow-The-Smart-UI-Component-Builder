"use client"
import { motion } from "framer-motion"
import Link from "next/link"

export default function Hero() {
  return (
    <div className="relative flex flex-col h-[100vh] items-center justify-center bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 dark:from-gray-900 dark:via-blue-900 dark:to-indigo-900 overflow-hidden">
      {/* Aurora Background Effect */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -inset-[10px] opacity-30">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-400/20 via-purple-400/20 to-indigo-400/20 animate-pulse"></div>
          <div className="absolute inset-0 bg-gradient-to-l from-indigo-400/10 via-blue-400/10 to-purple-400/10 animate-pulse delay-1000"></div>
        </div>
      </div>

      <motion.div
        initial={{ opacity: 0.0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{
          delay: 0.3,
          duration: 0.8,
          ease: "easeInOut",
        }}
        className="relative flex flex-col gap-4 items-center justify-center px-4 z-10"
      >
        <div className="text-3xl md:text-7xl font-bold dark:text-white text-center">
          <strong>Comp</strong><strong className="text-sky-300">Flow</strong> - Component Generator
        </div>
        <div className="font-extralight text-base md:text-4xl dark:text-neutral-200 py-4 text-gray-600">
          From prompt to production-ready React in seconds.
        </div>
        <Link
          href="/sessions"
          className="bg-black dark:bg-white rounded-full w-fit text-white dark:text-black px-6 py-3 hover:bg-gray-800 dark:hover:bg-gray-100 transition-colors"
        >
          Browse Sessions
        </Link>
      </motion.div>
    </div>
  )
}
