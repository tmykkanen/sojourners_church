<script lang="ts">
import { Hamburger } from "svelte-hamburgers";
import NavMenu from "$lib/components/NavMenu.svelte";
import * as Drawer from "$lib/components/ui/drawer";

let open = $state(false);
</script>

<div class="z-100 lg:hidden pointer-events-auto">
  <Hamburger bind:open type="spin" --color="var(--muted-foreground)" --padding="0"/>
</div>

<Drawer.Root bind:open direction="right">
  <Drawer.Content class="data-[vaul-drawer-direction=right]:w-full data-[vaul-drawer-direction=right]:sm:max-w-full pt-24">
    <NavMenu class={"px-8 flex flex-col gap-2"} />
  </Drawer.Content>
</Drawer.Root>
