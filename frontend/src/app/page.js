import Image from "next/image";
import  Hero  from "@/components/sections/Hero";

import HowItWorks from "@/components/sections/How-it-works";
import Features from "@/components/sections/Features";
import Pricing from "@/components/sections/Pricing";

export default function Home() {
  return (
    <>
      <Hero/>
      <Features/>
      <HowItWorks/>
      <Pricing/>

    </>
  );
}
