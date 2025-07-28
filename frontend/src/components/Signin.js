"use client";
import React, { useEffect, useState } from "react";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { cn } from "@/lib/utils";
import { z } from "zod";
import {
  IconBrandGithub,
  IconBrandGoogle,
  IconBrandOnlyfans,
} from "@tabler/icons-react";
import { useRouter } from "next/navigation";



export default function Signin({ setUserExists }) {
  const [message, setMessage] = useState("");
  const router = useRouter()

  useEffect(() => {
    const userData = localStorage.getItem("userDetails")
    if (userData) {
      router.push("/")
    }
  }, [router])

  // zod schema for email
  const schema = z.object({
    email: z.string().email("Invalid email address.")
  });


  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target)

    const data = {
      email: formData.get("email"),
      password: formData.get("password")
    }
    if (data.email === "" || data.password === "") {
      setMessage("Enter in all fields");
      setTimeout(() => {
        setMessage("");
      }, 3000);
      return;
    }
    const validationResult = schema.safeParse({ email: data.email })
    if (!validationResult.success) {
      setMessage("Invalid email address.");
      setTimeout(() => {
        setMessage("");
      }, 3000);
      return;
    }

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_SERVER_API}/api/signin`, {
        method: 'POST',
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email: data.email, password: data.password })
      });

      const userRes = await res.json();

      if (!res.ok) {
        setMessage(userRes.message);
        setTimeout(() => {
          setMessage("");
        }, 3000);
        return;
      }
      const userData = JSON.stringify(userRes)
      localStorage.setItem("userDetails", userData);
      router.push("/")
    } catch (error) {
      console.log(error)
      setMessage("Internal Server error");
      setTimeout(() => {
        setMessage("");
      }, 3000);
      return;
    }

  };
  return (
    <div
      className="shadow-input mx-auto w-full max-w-md rounded-none bg-white p-4 md:rounded-2xl md:p-8 mg:mt-6 dark:bg-black">
      <h2 className="text-xl text-center font-bold text-neutral-800 dark:text-neutral-200">
        Welcome to CompFlow
      </h2>
      {message !== "" && (
        <div className="py-1.5 px-2 mt-5 rounded text-white bg-red-500">{message}</div>
      )}
      <form className="my-4" onSubmit={handleSubmit}>
        <LabelInputContainer className="mb-4">
          <Label htmlFor="email">Email Address</Label>
          <Input id="email" name="email" placeholder="projectmayhem@fc.com" type="email" />
        </LabelInputContainer>
        <LabelInputContainer className="mb-4">
          <Label htmlFor="password">Password</Label>
          <Input id="password" name="password" placeholder="••••••••" type="password" />
        </LabelInputContainer>

        <button
          className="group/btn relative block h-10 w-full cursor-pointer rounded-md bg-gradient-to-br from-neutral-900 to-neutral-600 font-medium text-white shadow-[0px_1px_0px_0px_#ffffff40_inset,0px_-1px_0px_0px_#ffffff40_inset] dark:bg-zinc-800 dark:from-zinc-900 dark:to-zinc-900 dark:shadow-[0px_1px_0px_0px_#27272a_inset,0px_-1px_0px_0px_#27272a_inset]"
          type="submit">
          Sign up &rarr;
          <BottomGradient />
        </button>

      </form>
      <button onClick={() => setUserExists(false)} className="cursor-pointer text-center w-full underline"> Dont have account? </button>
    </div>
  );
}

const BottomGradient = () => {
  return (
    <>
      <span
        className="absolute inset-x-0 -bottom-px block h-px w-full bg-gradient-to-r from-transparent via-cyan-500 to-transparent opacity-0 transition duration-500 group-hover/btn:opacity-100" />
      <span
        className="absolute inset-x-10 -bottom-px mx-auto block h-px w-1/2 bg-gradient-to-r from-transparent via-indigo-500 to-transparent opacity-0 blur-sm transition duration-500 group-hover/btn:opacity-100" />
    </>
  );
};

const LabelInputContainer = ({
  children,
  className
}) => {
  return (
    <div className={cn("flex w-full flex-col space-y-2", className)}>
      {children}
    </div>
  );
};
