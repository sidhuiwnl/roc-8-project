"use client";
import Link from "next/link";
import { useEffect, useRef } from "react";
import { api } from "~/trpc/react";

import ItemsHandler from "./ItemsHandler"; // Assuming you have this component

interface HomeClientProps {
  name?: string;
  userId?: string;
}

export default function Homepage({ name, userId }: HomeClientProps) {
  const mutationCalledRef = useRef(false);
  
  const onUser = api.items.addItems.useMutation({
    onSuccess: async(data) => {
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
          
         
            <ItemsHandler userId={userId}/>
          
        </>
      ) : (
        <div>
          <h1>Please login</h1>
          <Link href="/Signin">Login</Link>
        </div>
      )}
    </>
  );
}
