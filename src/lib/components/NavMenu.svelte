<script lang="ts">
import { Button, type ButtonProps } from "$lib/components/ui/button";

const navItems = [
  { label: "About Us", url: "/about" },
  { label: "Life Together", url: "/life" },
  { label: "Sermons", url: "/sermons" },
  { label: "Writings", url: "/writings" },
  { label: "What is the Gospel?", url: "/gospel", variant: "secondary" },
];

const { ...rest } = $props();
</script>


<ul {...rest}>
  {#each navItems as { label, url, variant = "ghost" }}
    <li>
      <Button
        href={url}
        variant={variant as ButtonProps["variant"]}
        class={["w-full text-xs tracking-widest uppercase sm:text-sm"]}
        >{label}
      </Button>
    </li>
  {/each}
</ul>
