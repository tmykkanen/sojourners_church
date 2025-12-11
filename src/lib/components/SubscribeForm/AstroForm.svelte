<script lang="ts">
import * as Card from "$lib/components/ui/card";
import { Input } from "$lib/components/ui/input";
import { Button } from "$lib/components/ui/button";
import { actions, isInputError } from "astro:actions";
import { Toaster } from "../ui/sonner";
import {toast} from "svelte-sonner"

// const result = Astro.getActionResult(actions.subscribe);
// const inputErrors = isInputError(result?.error) ? result.error.fields : {};

// if (result && !result.error) {
//   console.log("success!");
// }


const handleSubmit = (event: SubmitEvent) => {
  event.preventDefault();

  const myForm = event.target;
  const formData = new FormData(myForm);

  fetch("/", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams(formData).toString()
  })
    .then(() => {
      console.log("Form successfully submitted")
    toast.success(("Good job!"))
    })
    .catch(error => alert(error));
};


</script>

<Card.Root class="bg-accent w-full border-none py-0 shadow-none">
  <form
    method="POST"
    class="flex flex-col gap-2"
    name="subscribe"
    netlify
    onsubmit={handleSubmit}
  >
    <Card.Content class="flex flex-col gap-2 px-0">
      <Input
        type="text"
        placeholder="First Name"
        class="bg-muted text-muted-foreground"
        name="firstName"
      />
      <!-- <span class="text-red-300">Errors</span> -->
      <Input
        type="text"
        placeholder="Last Name"
        class="bg-muted text-muted-foreground"
        name="lastName"
      />
      <Input
        type="email"
        placeholder="Email"
        class="bg-muted text-muted-foreground"
        name="email"
      />
    </Card.Content>
    <Card.Footer class="w-full px-0">
      <Button type="submit" class="w-full" variant="footer-button">
        Subscribe
      </Button>
    </Card.Footer>
  </form>
</Card.Root>

<Toaster />
