'use client'

import Link from "next/link"
import { useEffect } from "react";
import { api } from "~/trpc/react"


interface HomeClientProps{
    name?: string,
    userId? : string 
}



export default function Homepage({name,userId} : HomeClientProps){
    const onUser = api.items.addItems.useMutation({
        onSuccess: (data) => {
            alert('succesfully added')
          },
          onError: (error) => {
            console.error("Error adding items:", error);
          }
    });
    
    useEffect(() =>{
        if(userId){
            onUser.mutate({userId})
        }else{
            console.error("Invalid userId:", userId);
        }
    },[userId])

    return(
        <>
        {name && userId ? (
            <h1>Welcome {name}</h1>
            
        ) : (
            <div>
                <h1>Please login</h1>
                <Link href="/Signin">Login</Link>
            </div>
            
        )}
        </>
    )
}