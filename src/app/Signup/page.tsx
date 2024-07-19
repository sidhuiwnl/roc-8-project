"use client";

import { Label } from "~/components/ui/label";
import { Input } from "~/components/ui/input";
import { Button } from "~/components/ui/button";
import Link from "next/link";
import { useState } from "react";
import { api } from "~/trpc/react";
import {useRouter} from "next/navigation"
import Cookies from 'js-cookie';


export default function Signup() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const signupForm = api.signup.create.useMutation({
    onSuccess: async (data) => {
      Cookies.set('userId', data.id, { expires: 7 });
      Cookies.set('username', data.name, { expires: 7 });
      router.push(`/`)
      
    },

    onError: (error) => {
      setEmail("");
      setName("");
      setPassword("");
      throw new Error(error.message);
      
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    signupForm.mutate({ name, email, password });
    
  };

  return (
    <div className="flex h-screen w-full items-center justify-center bg-background">
      <div className="mx-4 w-full max-w-md space-y-12 rounded-xl border bg-card p-6 sm:px-8">
        <div className="space-y-4 text-center">
          <h2 className="mt-5 text-3xl font-bold">Create your Account</h2>
        </div>
        <form className="grid gap-7" onSubmit={handleSubmit}>
          <div className="grid gap-2">
            <Label htmlFor="name">Name</Label>
            <Input
              id="name"
              placeholder="John Doe"
              value={name}
              required
              onChange={(e) => setName(e.target.value)}
            />
          </div>
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
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
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
            disabled={signupForm.isPending}
          >
            {signupForm.isPending ? "Creating Account...." : "Create Account"}
          </Button>
        </form>
        <hr></hr>
        <div className="text-center text-sm text-muted-foreground">
          Have an account?{" "}
          <Link
            href="/Signin"
            className="font-medium underline underline-offset-4"
            prefetch={false}
          >
            LOGIN
          </Link>
        </div>
      </div>
    </div>
  );
}
