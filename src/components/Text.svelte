<script lang="ts">
  // https://lexingtonthemes.com/tutorials/how-to-create-a-typography-component-with-variants-with-astro-js-and-tailwind-css/
  import type { HTMLAttributes } from "@node/astro/types";
  import type { Snippet } from "svelte";

  interface Props extends HTMLAttributes<"h1"> {
    as?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "p" | "address";
    variant?: keyof typeof variants;
    classes?: string;
    children?: Snippet;
  }

  const variants = {
    screenReader: "sr-only",
    displayXL: "text-5xl font-bold uppercase sm:text-7xl", // Mission / vision
    display: "text-xl font-bold uppercase md:text-2xl", // Header Logo
    heading: "text-xl  uppercase md:text-2xl tracking-wider",
    subheading: "text-lg md:text-xl",
    meta: "text-base-content/50 text-xs md:text-sm",
    base: "",
    form: "",
    button: "",
  };

  const {
    as = "p", // Default to paragraph
    variant = "base", // Default to base,
    children,
    classes,
    // ...attrs
  }: Props = $props();
</script>

<svelte:element
  this={as}
  class={[variants[variant as keyof typeof variants], classes]}
>
  {@render children?.()}
</svelte:element>
