
import Link from "next/link"
import { Button } from "~/components/ui/button"

export default function Header() {
  return (
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
            <span>Hi, John</span>
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
  )
}

function SearchIcon(props:any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="11" cy="11" r="8" />
      <path d="m21 21-4.3-4.3" />
    </svg>
  )
}


function ShoppingCartIcon(props:any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="8" cy="21" r="1" />
      <circle cx="19" cy="21" r="1" />
      <path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12" />
    </svg>
  )
}


function XIcon(props:any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M18 6 6 18" />
      <path d="m6 6 12 12" />
    </svg>
  )
}