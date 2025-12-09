<script lang="ts"module>
//https://css-tricks.com/crafting-strong-dx-with-astro-components-and-typescript/
// https://lexingtonthemes.com/tutorials/how-to-create-a-typography-component-with-variants-with-astro-js-and-tailwind-css/

import { type Snippet } from "svelte";
import { type SvelteHTMLElements } from "svelte/elements";
import { cn, tv, type VariantProps } from "tailwind-variants";

export const textVariants = tv({
  base: "",
  variants: {
    variant: {
      default: "",
      meta: "text-muted-foreground text-xs md:text-sm",
      button:
        "text-xs tracking-widest uppercase sm:text-sm whitespace-normal text-center font-semibold",
      subheading: "text-lg md:text-xl text-foreground font-normal",
      heading: "text-xl  uppercase md:text-2xl tracking-wider",
      display: "text-xl font-bold uppercase md:text-2xl", // Header Logo
      displayXL: "text-5xl font-bold uppercase sm:text-7xl", // Mission / vision
    },
  },
});

export type TextVariant = VariantProps<typeof textVariants>["variant"];

export type TextProps = SvelteHTMLElements["h1"] & {
  as: "h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "p" | "address" | "span";
  variant?: TextVariant;
  children: Snippet;
};
</script>

<script lang="ts">
  let { class: className, as, variant = "default", children, ...rest  }: TextProps = $props();
</script>

<svelte:element this={as} class={cn(textVariants({variant}), className)} {...rest}>
 {@render children?.()}
</svelte:element>
