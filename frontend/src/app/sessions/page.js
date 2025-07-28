"use client"
import NewSessionPopup from "@/components/NewSessionPopup"
import { BentoGridMenu } from "@/components/Sessions"
import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Loader2 } from "lucide-react"

export default function SessionsPage() {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    const userData = localStorage.getItem("userDetails")
    if (!userData) {
      router.push("/signin")
      return
    }

    try {
      const userDetails = JSON.parse(userData)
      setUser(userDetails)
    } catch (error) {
      console.error("Error parsing user data:", error)
      router.push("/signin")
    } finally {
      setLoading(false)
    }
  }, [])

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-neutral-600" />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-neutral-50 to-neutral-100 dark:from-neutral-950 dark:to-neutral-900">
      <div className="container mx-auto px-4 pt-24 pb-12">

        <section className="text-center mb-12">
          <div className="max-w-3xl mx-auto">
            <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold bg-gradient-to-r from-neutral-900 to-neutral-600 dark:from-neutral-100 dark:to-neutral-400 bg-clip-text text-transparent mb-4">
              Welcome back, {user?.name || "Developer"}
            </h1>
            <p className="text-lg md:text-xl text-neutral-600 dark:text-neutral-400 mb-8">
              Continue building amazing React components or start a new session
            </p>
            <NewSessionPopup />
          </div>
        </section>

        <section className="max-w-7xl mx-auto">
          <div className="mb-8">
            <h2 className="text-2xl md:text-3xl font-semibold text-neutral-900 dark:text-neutral-100 mb-2">
              Your Sessions
            </h2>
            <p className="text-neutral-600 dark:text-neutral-400">
              Pick up where you left off or explore your previous work
            </p>
          </div>
          <BentoGridMenu setUser={setUser} />
        </section>
      </div>
    </div>
  )
}
