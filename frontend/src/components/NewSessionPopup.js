"use client"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import Link from "next/link"
import { redirect, useRouter } from "next/navigation";
import { useState } from "react"

export default function NewSessionPopup() {
  const [name, setName]  = useState();
  const [loading, setLoading] = useState(false);
  const router = useRouter()


  async function sendSession(){
    setLoading(true);
    const userData = localStorage.getItem("userDetails")
      if (!userData) {
        router.push("/signin")
        reutrn;
      }
    const userDetails = JSON.parse(userData)
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_SERVER_API}/api/session`,{
        method:'POST',
        headers:{
          "Content-Type":"application/json",
        },
        body: JSON.stringify({name, email:userDetails.email}),
      })


      if(res.status != 201){
        alert("failed to create session.")
        return;
      }
      const data = await res.json();
      router.push(`/sessions/${data.sessionId}`);
    } catch (error) {
      console.log(error)
      alert("failed to create session.")
    }
    setLoading(false)
  }

  return (
    <Dialog >
        <DialogTrigger>
            <button className="mt-5 mx-auto py-3 px-4 rounded-2xl bg-neutral-200 hover:bg-neutral-300 dark:bg-neutral-800 dark:hover:bg-neutral-900 dark:hover:text-gray-100 transition-all duration-200">
              Create Session
            </button>          
          </DialogTrigger>
        <DialogContent>
            <DialogTitle>Name your session</DialogTitle>
            <input type="text" name="" id="" onChange={(e)=> setName(e.target.value)} className="text-lg py-1 px-2 mt-2"/>
            <button onClick={sendSession} className="px-4 py-2 bg-gray-200 hover:bg-gray-300 dark:bg-neutral-800 dark:hover:bg-neutral-900 w-fit rounded dark:hover:text-gray-100 transition-all duration-200">Open</button>
        </DialogContent>
    </Dialog>
  )
}
