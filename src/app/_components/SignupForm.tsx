
import { Label } from "~/components/ui/label"
import { Input } from "~/components/ui/input"
import { Button } from "~/components/ui/button"
import Link from "next/link"

export default function SignupForm() {
  return (

    
    <div className="flex h-screen w-full items-center justify-center bg-background">
      <div className="mx-4 w-full max-w-md space-y-12 rounded-xl bg-card p-6 border sm:px-8">
        <div className="space-y-4 text-center">
          <h2 className="text-3xl mt-5 font-bold">Create your Account</h2>
          
        </div>
        <form className="grid gap-7">
          <div className="grid gap-2">
            <Label htmlFor="name">Name</Label>
            <Input id="name" placeholder="John Doe" required />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="email">Email</Label>
            <Input id="email" type="email" placeholder="example@email.com" required />
          </div>
          <div className="grid gap-3">
            <Label htmlFor="password">Password</Label>
            <Input id="password" type="password" required />
          </div>
          <Button type="submit" className="mx-auto ">
            Create Account
          </Button>
        </form>
        <div className="text-center text-sm text-muted-foreground">
          Have an account?{" "}
          <Link href="#" className="font-medium underline underline-offset-4" prefetch={false}>
            LOGIN
          </Link>
        </div>
      </div>
    </div>
  )
}