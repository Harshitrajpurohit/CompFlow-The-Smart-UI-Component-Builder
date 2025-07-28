"use client"
import Signin from "@/components/Signin";
import Signup from "@/components/Signup";
import { useState } from "react";


export default function Page() {
  const [userExists, setUserExists] = useState(false);

  return (
    <div className="h-screen flex flex-col justify-center items-center px-5 md:px-10">
      {
        userExists ? (<Signin setUserExists = {setUserExists}/>) : ( <Signup setUserExists = {setUserExists}/>)
      }
      
    </div>
  )
}
