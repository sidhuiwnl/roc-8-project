
import { z } from "zod";
import 'server-only'

import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";


export const signUpRouter = createTRPCRouter({
  create : publicProcedure
    .input(z.object({name : z.string(),email : z.string(),password : z.string()}))
    .mutation(async({ctx,input}) => {
        return ctx.db.signup.create({
            data :{
                name : input.name,
                password : input.password,
                email : input.email,

        }
        })
    })
})