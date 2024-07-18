import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";
import { db } from "~/server/db";

export const signUpRouter = createTRPCRouter({
  create: publicProcedure
    .input(
      z.object({ name: z.string(), email: z.string(), password: z.string() }),
    )
    .mutation(async ({ ctx, input }) => {
      return ctx.db.signup.create({
        data: {
          name: input.name,
          password: input.password,
          email: input.email,
        },
      });
    }),

  getUser: publicProcedure
    .input(z.object({ email: z.string(), password: z.string() }))
    .query(async (opts) => {
      const { input } = opts;
      const user = await db.signup.findUnique({
        where: {
          email: input.email,
          password: input.password,
        },
        select: {
          name: true,
          id: true,
        },
      });

      return user;
    }),
});
