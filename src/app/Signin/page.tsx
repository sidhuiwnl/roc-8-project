'use client'

import { Label } from "~/components/ui/label";
import { Input } from "~/components/ui/input";
import { Button } from "~/components/ui/button";
import Link from "next/link";

import { api } from "~/trpc/react";
import { useState } from "react";

import { useRouter } from "next/navigation";


export default function Signin() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const loginedName = api.signup.getUser.useQuery(
    {
      email,
      password,
    },
    {
      enabled: false,
      retry: false,
    },
  );

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    await loginedName.refetch().then((result) => {
      if (result.data) {
        // Set cookies
        
        router.push('/')
      } else if (result.error) {
        setPassword("");
        setEmail("");
        alert(result.error?.message);
      }
    });
  }

 

  return (
    <div className="flex h-screen w-full items-center justify-center bg-background">
      <div className="mx-4 w-full max-w-md space-y-12 rounded-xl border bg-card p-6 sm:px-8">
        <div className="space-y-4 text-center">
          <h2 className="mt-5 text-3xl font-bold">Login</h2>
          <h3 className="text-xl font-semibold">Welcome back to ECOMMERCE</h3>
          <p className="font-medium text-black">
            The next gen business marketplace
          </p>
        </div>
        <form className="grid gap-7" onSubmit={handleLogin}>
          <div className="grid gap-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              value={email}
              placeholder="example@email.com"
              required
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="password">Password</Label>
            <div className="relative">
              <Input
                id="password"
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <button
                type="button"
                className="absolute inset-y-0 right-0 flex items-center pr-3 underline"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? "Hide" : "Show"}
              </button>
            </div>
          </div>
          <Button
            type="submit"
            className="mx-auto w-full"
            disabled={loginedName.isFetching}
          >
            {loginedName.isFetching ? "Logging in" : "Login"}
          </Button>
        </form>
        <hr></hr>
        <div className="text-center text-sm text-muted-foreground">
          Don’t have an Account?{" "}
          <Link
            href="/Signup"
            className="font-medium underline underline-offset-4"
            prefetch={false}
          >
            SIGN UP
          </Link>
        </div>
      </div>
    </div>
  );
}
