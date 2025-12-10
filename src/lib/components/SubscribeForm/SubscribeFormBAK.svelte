<script lang="ts">
  import { actions } from "astro:actions";
  import { Mail } from "@lucide/svelte";
  import { toast } from "svelte-sonner";
  import { type SuperValidated, superForm } from "sveltekit-superforms";
  import { zod4Client } from "sveltekit-superforms/adapters";
  import {
    type Message,
    type SubscribeValues,
    zSubscribeValues,
  } from "$lib/components/SubscribeForm/schema";
  import * as Card from "$lib/components/ui/card";
  import * as Form from "$lib/components/ui/form";
  import { Input } from "$lib/components/ui/input";
  import * as InputGroup from "$lib/components/ui/input-group";
  import { Toaster } from "$lib/components/ui/sonner";

  // Get
  let {
    subscribeSV,
  }: { subscribeSV: SuperValidated<SubscribeValues, Message> } = $props();

  const sf = superForm(subscribeSV, {
    validators: zod4Client(zSubscribeValues),
    onError: () => {
      toast.error(i18n());
    },
    onUpdated: ({ form: { message, valid } }) => {
      if (message)
        valid ? toast.success(i18n(message)) : toast.error(i18n(message));
    },
  });
  const { delayed, enhance, form, submitting } = sf;

  function i18n(code?: Message) {
    if (code === "BAD_REQUEST")
      return "An error occurred. Please try again later.";
    if (code === "CONFLICT") return "You are already subscribed.";
    if (code === "SUCCESS") return "Successfully subscribed.";
    return "An error occurred. Please try again later.";
  }
</script>

<Card.Root class="w-full py-0 bg-accent border-none shadow-none">
  <form
    method="POST"
    action={actions.submit}
    use:enhance
    novalidate
    class="flex flex-col gap-2"
  >
    <Card.Content class="gap-2 flex flex-col px-0">
      <Form.Field form={sf} name="firstName">
        <Form.Control>
          {#snippet children({ props })}
            <Input
              {...props}
              type="text"
              bind:value={$form.firstName}
              placeholder="First Name"
              class="bg-muted text-muted-foreground mb-0"
            />
          {/snippet}
        </Form.Control>
        <Form.FieldErrors class="text-red-300 *:py-1" />
      </Form.Field>
      <Form.Field form={sf} name="lastName">
        <Form.Control>
          {#snippet children({ props })}
            <Input
              {...props}
              type="text"
              bind:value={$form.lastName}
              placeholder="Last Name"
              class="bg-muted text-muted-foreground mb-0"
            />
          {/snippet}
        </Form.Control>
        <Form.FieldErrors class="text-red-300 *:pt-1" />
      </Form.Field>
      <Form.Field form={sf} name="email">
        <Form.Control>
          {#snippet children({ props })}
            <InputGroup.Root
              class="bg-muted text-muted-foreground mb-0 aria-invalid:border-red-400"
            >
              <InputGroup.Input
                {...props}
                type="email"
                bind:value={$form.email}
                placeholder="mail@site.com"
              />
              <InputGroup.Addon>
                <!-- <MailIcon /> -->
                <Mail />
              </InputGroup.Addon>
            </InputGroup.Root>
          {/snippet}
        </Form.Control>
        <Form.FieldErrors class="text-red-300 *:pt-1" />
      </Form.Field>
    </Card.Content>
    <Card.Footer class="px-0 w-full">
      <Form.Button
        disabled={$submitting}
        class="w-full"
        variant="footer-button"
      >
        {$delayed ? "Subscribing..." : "Subscribe"}
      </Form.Button>
    </Card.Footer>
  </form>
</Card.Root>
<Toaster />
