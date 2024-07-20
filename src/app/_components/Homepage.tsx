"use client";
import Link from "next/link";
import { useEffect, useRef } from "react";
import { api } from "~/trpc/react";

import ItemsHandler from "./ItemsHandler";

interface HomeClientProps {
  name?: string;
  userId?: string;
}

export default function Homepage({ name, userId }: HomeClientProps) {
  const mutationCalledRef = useRef(false);

  const onUser = api.items.addItems.useMutation({
    onSuccess: async () => {
      alert("successfully added");
      console.log("Mutation succeeded");

      if (userId) {
        localStorage.setItem(`userVisited_${userId}`, "true");
      }
    },
    onError: (error) => {
      console.error("Error adding items:", error);
    },
  });

  useEffect(() => {
    if (userId && !mutationCalledRef.current) {
      const hasVisited = localStorage.getItem(`userVisited_${userId}`);

      if (!hasVisited) {
        onUser.mutate({ userId });
        mutationCalledRef.current = true;
      }
    } else if (!userId) {
      console.error("Invalid userId:", userId);
    }
  }, [userId, onUser]);

  return (
    <>
      {name && userId ? (
        <>
          <ItemsHandler userId={userId} />
        </>
      ) : (
        <div className="flex min-h-screen flex-col items-center justify-center bg-gray-100">
          <div className="rounded-lg bg-white p-8 shadow-md">
            <h1 className="mb-6 text-center text-3xl font-bold text-gray-800">
              Please Signup
            </h1>
            <Link
              href="/Signin"
              className="block w-full transform rounded-lg bg-blue-500 px-4 py-2 text-center font-semibold text-white transition duration-300 ease-in-out hover:scale-105 hover:bg-blue-600"
            >
              Signup
            </Link>
          </div>
        </div>
      )}
    </>
  );
}
