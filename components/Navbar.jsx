// components/Navbar.jsx-
"use client"
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { ModeToggle } from "./theme-btn";
import LoadingBar from 'react-top-loading-bar'
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
const Navbar = () => {

  const [progress, setProgress] = useState(0)
  const pathname = usePathname()
  useEffect(() => {
    setProgress(30)
    
    setTimeout(() => {
      setProgress(70)
    }, 100);

    setTimeout(() => {
      setProgress(100)
    }, 400);
  }, [pathname])

  useEffect(() => {
    setTimeout(() => {
      setProgress(0)
    }, 900);
  }, [])
  
  

  return (
    <nav className="bg-background/50 p-4 sticky top-0 z-20  backdrop-blur border-b">
      <LoadingBar 
        color='#a855f7'
        progress={progress}
        onLoaderFinished={() => setProgress(0)}
      />
      <div className="container mx-auto flex justify-between  items-center">
        <Link href={"/"}>
          <div className=" text-2xl font-bold">RaghavBlog</div>
        </Link>
        <div className="hidden md:flex space-x-4 items-center">
          <Link
            href="/"
            className="hover:scale-105 transition-transform hover:font-semibold duration-100"
          >
            Home
          </Link>
          <Link
            href="/about"
            className="hover:scale-105 transition-transform hover:font-semibold duration-100"
          >
            About
          </Link>
          <Link
            href="/blog"
            className="hover:scale-105 transition-transform hover:font-semibold duration-100"
          >
            Blog
          </Link>
          <div className="flex items-center">
            <Button className="mx-1" variant="outline">
              Login
            </Button>
            <Button className="mx-1" variant="outline">
              Signup
            </Button>
            <ModeToggle />
          </div>
        </div>
        <div className="md:hidden">
          <span className="mx-4">
            <ModeToggle className="px-2" />
          </span>
          <Sheet className='dark:bg-gray-800'>
            <SheetTrigger>
              <svg
                className="w-6 h-6  "
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16m-7 6h7"
                ></path>
              </svg>
            </SheetTrigger>
            <SheetContent>
              <SheetHeader>
                <SheetTitle className="font-bold my-4 dark:text-white text-black">RaghavBlog</SheetTitle>
                <SheetDescription>
                  <div className="flex flex-col gap-6">
                    <Link href="/" className=" hover:text-gray-400">
                      Home
                    </Link>
                    <Link href="/about" className=" hover:text-gray-400">
                      About
                    </Link>
                    <Link href="/blog" className=" hover:text-gray-400">
                      Blog
                    </Link>
                    <Link href="/contact" className=" hover:text-gray-400">
                      Contact
                    </Link>
                    <div>
                      <Button className="mx-1 text-xs" variant="outline">
                        Login
                      </Button>
                      <Button className="mx-1 text-xs" variant="outline">
                        Signup
                      </Button>
                    </div>
                    <div>
                    </div>
                  </div>
                </SheetDescription>
              </SheetHeader>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
