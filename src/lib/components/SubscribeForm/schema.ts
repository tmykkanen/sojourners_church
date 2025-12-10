import type { ActionError } from "astro:actions";
import { z } from "astro/zod";

export const zSubscribeValues = z.object({
  firstName: z.string({ message: "This field is required" }).min(1),
  lastName: z.string({ message: "This field is required" }).min(1),
  email: z
    .string({ message: "This field is required" })
    .email("This is not a valid email.")
    .min(1),
});

export type SubscribeValues = z.infer<typeof zSubscribeValues>;

export type Message = ActionError["code"] | "SUCCESS";
