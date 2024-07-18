
import Link from "next/link"
import { Button } from "~/components/ui/button"
import {SearchIcon,ChevronLeft, ChevronRight, ShoppingCartIcon } from 'lucide-react'
import { cookies } from "next/headers"



export default function Header() {

  const CookieStore = cookies();
  const userID = CookieStore.get('userId')?.value;
  const name = CookieStore.get('username')?.value;

  return (
    <>
    <header className="bg-background border-b border-muted/40 px-4 py-5 md:px-6">
      <div className="container flex items-center justify-between h-14 md:h-16">
        <Link href="#" className="text-2xl font-bold" prefetch={false}>
          ECOMMERCE
        </Link>
        <nav className="hidden md:flex items-center gap-4 text-l font-medium">
          <Link href="#" className="hover:underline font-bold " prefetch={false}>
            Categories
          </Link>
          <Link href="#" className="hover:underline font-bold" prefetch={false}>
            Sale
          </Link>
          <Link href="#" className="hover:underline font-bold" prefetch={false}>
            Clearance
          </Link>
          <Link href="#" className="hover:underline font-bold" prefetch={false}>
            New Stock
          </Link>
          <Link href="#" className="hover:underline font-bold" prefetch={false}>
            Trending
          </Link>
        </nav>
        <div className="flex flex-col items-center gap-4">
          <div className="hidden md:block text-sm text-muted-foreground">
            <Link href="#" className="hover:underline" prefetch={false}>
              Help
            </Link>
            <span className="mx-2">|</span>
            <Link href="#" className="hover:underline" prefetch={false}>
              Orders & Returns
            </Link>
            <span className="mx-2">|</span>
            <span>{name && userID ? `Hi,${name}` : `Hi,John`}</span>
          </div>
          <div>
          <Button variant="ghost" size="icon">
            <ShoppingCartIcon className="h-5 w-5" />
            <span className="sr-only">Cart</span>
          </Button>
          <Button variant="ghost" size="icon" >
            <SearchIcon className="h-5 w-5" />
            <span className="sr-only">Search</span>
          </Button>
          </div>
          
        </div>
        
      </div>
      
    </header>
    <div className="w-screen flex justify-center items-center bg-zinc-100 font-medium p-2 ">
      <ChevronLeft/>
      Get 10% off on business sign up
      <ChevronRight/>
      </div>
    </>
  )
}

