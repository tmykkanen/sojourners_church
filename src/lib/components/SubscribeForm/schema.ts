import type { ActionError } from "astro:actions";
import { z } from "astro/zod";

export const zSubscribeValues = z.object({
  firstName: z.string().min(1),
  lastName: z.string().min(1),
  email: z.string().email().min(1),
});

export type SubscribeValues = z.infer<typeof zSubscribeValues>;

export type Message = ActionError["code"] | "SUCCESS";
