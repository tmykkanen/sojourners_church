import { defineAsfAction } from "superforms:astro";
import { Resend } from "resend";
import { message } from "sveltekit-superforms";
import {
  type Message,
  zSubscribeValues,
} from "$lib/components/SubscribeForm/schema";

const resend = new Resend(import.meta.env.RESEND_API_KEY);

export const server = {
  submit: defineAsfAction({
    input: zSubscribeValues,
    // TODO: Set actual handling for newsletter subscription
    handler: async ({ email, firstName, lastName }, { form }) => {
      const { data: contactData, error: addContactError } =
        await resend.contacts.create({
          email,
          firstName,
          lastName,
          unsubscribed: false,
        });

      if (addContactError)
        return message<Message>(form, "BAD_REQUEST", { status: 400 });

      const { error: segmentError } = await resend.contacts.segments.add({
        contactId: contactData.id,
        segmentId: import.meta.env.RESEND_SEGMENT_ID,
      });

      if (segmentError)
        return message<Message>(form, "BAD_REQUEST", { status: 400 });

      return message<Message>(form, "SUCCESS");

      // await new Promise((resolve) => setTimeout(resolve, 2000));
      // const response = Math.random();
      // if (response < 0.3)
      //   return message<Message>(form, "BAD_REQUEST", { status: 400 });
      // if (response < 0.5)
      //   return message<Message>(form, "CONFLICT", { status: 409 });
      // return message<Message>(form, "SUCCESS");
    },
  }),
};
