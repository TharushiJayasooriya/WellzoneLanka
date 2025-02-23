"use client"

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Button } from '@/components/ui/button'
import Image from 'next/image';

export default function Navbar() {
  const pathname = usePathname()

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center">
        <div className="mr-4 flex">
          <Link href="/" className="mr-6 flex items-center space-x-2">
            <Image src="./images/icon.png" alt="Wellzone Logo" width={70} height={70} className="pl-4" /> 
            <span className="font-bold">Wellzone Lanka</span>
          </Link>
        </div>
        <div className="flex flex-1 items-center justify-between space-x-2 md:justify-end">
          <nav className="flex items-center space-x-6">
            <Link
              href="/about"
              className={`text-sm font-medium transition-colors hover:text-primary ${
                pathname === '/about' ? 'text-foreground' : 'text-foreground/60'
              }`}
            >
              About
            </Link>
            <Link
              href="/doctors"
              className={`text-sm font-medium transition-colors hover:text-primary ${
                pathname === '/doctors' ? 'text-foreground' : 'text-foreground/60'
              }`}
            >
              Doctors
            </Link>
            <Link
              href="/services"
              className={`text-sm font-medium transition-colors hover:text-primary ${
                pathname === '/services' ? 'text-foreground' : 'text-foreground/60'
              }`}
            >
              Services
            </Link>
          </nav>
          <div className="flex items-center space-x-2">
            <Link href="/login">
              <Button variant="ghost" size="sm">Log in</Button>
            </Link>
            <Link href="/register">
              <Button size="sm">Sign up</Button>
            </Link>
          </div>
        </div>
      </div>
    </header>
  )
}