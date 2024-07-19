import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

import { faker } from '@faker-js/faker';
import { db } from "~/server/db";



const randomProducts = () : {name : string}[] =>{
    return Array.from({ length: 100 }, () => ({
        name: faker.commerce.product(),
      }));
}
export const itemsRouter = createTRPCRouter({
    addItems : publicProcedure
    .input(
        z.object({
            userId : z.string()
        })
    )
    .mutation(async({ctx,input}) =>{
        const {userId} = input;

        const products = randomProducts();

        const createdProducts = ctx.db.items.createMany({
            data : products.map((product) =>({
                name : product.name,
                userId
            })
        )})
        return {success : true,createdProducts}
    }),
    
    getItems : publicProcedure
    .input(z.object({userId : z.string()}))
    .query(async(opts) =>{
        const { input } = opts;
        const products = await db.items.findMany({
           where : {
            userId : input.userId,
           }, 
           select :{
            name : true,
            id : true
           }
        })

        return products
    })

   

})