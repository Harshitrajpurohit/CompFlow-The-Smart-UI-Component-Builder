"use client";
import {
  Navbar,
  NavBody,
  NavItems,
  MobileNav,
  NavbarLogo,
  NavbarButton,
  MobileNavHeader,
  MobileNavToggle,
  MobileNavMenu,
} from "@/components/ui/resizable-navbar";
import { useEffect, useState } from "react";
import ThemeToggler from "./ThemeToggler";

export function NavbarMenu() {
  const [userExists, setUserExists] = useState(false);
  useEffect(()=>{
    const userdata = localStorage.getItem("userDetails")
    const userDetails = JSON.parse(userdata);
    if(!userDetails?.email){
      setUserExists(true);
    }else{
      setUserExists(false)
    }
  },[])
  const navItems = [
    {
      name: "Sessions",
      link: "/sessions",
    },
    {
      name: "Features",
      link: "#features",
    },
    {
      name: "Pricing",
      link: "#pricing",
    },
  ];

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  function logoutUser(){
    localStorage.removeItem("userDetails")
  }
  return (
    <div className="fixed w-full z-40">
      <Navbar>
        {/* Desktop Navigation */}
        <NavBody>
          <NavbarLogo />
          <NavItems items={navItems} />
          <div className="flex items-center gap-4">
            <ThemeToggler/>
            { userExists ? (
              <NavbarButton href="/signin" variant="primary">Login</NavbarButton>):(
              <NavbarButton href="/signin" onClick={logoutUser} variant="primary">Logout</NavbarButton>)
            }
          </div>
        </NavBody>

        {/* Mobile Navigation */}
        <MobileNav>
          <MobileNavHeader>
            <NavbarLogo />
            <MobileNavToggle
              isOpen={isMobileMenuOpen}
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} />
          </MobileNavHeader>

          <MobileNavMenu isOpen={isMobileMenuOpen} onClose={() => setIsMobileMenuOpen(false)}>
            {navItems.map((item, idx) => (
              <a
                key={`mobile-link-${idx}`}
                href={item.link}
                onClick={() => setIsMobileMenuOpen(false)}
                className="relative text-neutral-600 dark:text-neutral-300">
                <span className="block">{item.name}</span>
              </a>
            ))}
            <div className="flex w-full flex-col gap-4">
              { userExists ? (
              <NavbarButton
                onClick={() => setIsMobileMenuOpen(false)}
                href="/signin"
                variant="primary"
                className="w-full">
                Login
              </NavbarButton>):(
              <NavbarButton
                onClick={() => (setIsMobileMenuOpen(false), logoutUser())}
                href="/signin"
                variant="primary"
                className="w-full">
                Logout
              </NavbarButton>)
              }
            </div>
          </MobileNavMenu>
        </MobileNav>
      </Navbar>
    </div>
  );
}
