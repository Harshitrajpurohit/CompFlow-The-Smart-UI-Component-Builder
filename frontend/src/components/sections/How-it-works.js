"use client"
import { motion } from "framer-motion"
import { MessageSquare, Cpu, Code2, Download } from "lucide-react"

const steps = [
  {
    icon: MessageSquare,
    title: "Describe Your Component",
    description: "Simply describe what you want in natural language. Be as detailed or as simple as you like.",
  },
  {
    icon: Cpu,
    title: "AI Processing",
    description: "Our advanced LLM analyzes your prompt and generates optimized React code tailored to your needs.",
  },
  {
    icon: Code2,
    title: "Review & Customize",
    description: "Preview your component, make adjustments, and see real-time changes in our interactive editor.",
  },
  // {
  //   icon: Download,
  //   title: "Export & Use",
  //   description: "Download your component or copy the code directly into your project. It's ready to use!",
  // },
]

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="py-20 bg-white dark:bg-black">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">How It Works</h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            From idea to implementation in four simple steps
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {steps.map((step, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              className="text-center relative"
            >
              <div className="bg-blue-100 dark:bg-blue-900 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <step.icon className="h-8 w-8 text-blue-400" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">{step.title}</h3>
              <p className="text-gray-600 dark:text-gray-300">{step.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
