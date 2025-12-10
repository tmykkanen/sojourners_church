import { message } from "sveltekit-superforms";
import {
  type Message,
  zSubscribeValues,
} from "$lib/components/SubscribeForm/schema";
import { defineAction } from "astro:actions";

export const server = {
  subscribe: defineAction({
    accept: "form",
    input: zSubscribeValues,
    handler: async ({ firstName, lastName, email }) => {
      console.log("Hello from actions/subscribe!");
      return "success!";
    },
  }),
};
