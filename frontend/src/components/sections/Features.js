"use client"
import { motion } from "framer-motion"
import { Zap, Code, Palette, Download, Globe, Shield } from "lucide-react"

const features = [
  {
    icon: Zap,
    title: "Lightning Fast",
    description: "Generate production-ready React components in seconds, not hours.",
  },
  {
    icon: Code,
    title: "Clean Code",
    description: "Get well-structured, readable code that follows best practices.",
  },
  {
    icon: Palette,
    title: "Customizable",
    description: "Easily modify and adapt generated components to match your design system.",
  },
  {
    icon: Download,
    title: "Export Ready",
    description: "Download your components instantly or copy to clipboard.",
  },
  {
    icon: Globe,
    title: "Framework Agnostic",
    description: "Works with React, Next.js, and other popular frameworks.",
  },
  {
    icon: Shield,
    title: "Secure & Private",
    description: "Your code and prompts are processed securely and never stored.",
  },
]

export default function Features() {
  return (
    <section id="features" className="py-20 bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">Why Choose CompFlow?</h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Experience the future of component development with our AI-powered generator
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow"
            >
              <div className="flex items-center mb-4">
                <div className="bg-blue-100 dark:bg-blue-900 p-3 rounded-lg">
                  <feature.icon className="h-6 w-6 text-blue-400" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white ml-4">{feature.title}</h3>
              </div>
              <p className="text-gray-600 dark:text-gray-300">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
