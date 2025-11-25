<script lang="ts">
  import type { CollectionEntry } from "astro:content";

  interface Props {
    label: "Series" | "Preacher" | "From" | "To";
    value: any;
    options?: CollectionEntry<"series">[] | CollectionEntry<"preachers">[];
    type: "select" | "date";
  }

  let { label, value = $bindable(), options, type }: Props = $props();
</script>

<div class="join">
  <div
    class="join-item bg-base-100 px-(--spacing-sm) text-sm border border-base-content/20 h-full flex items-center"
  >
    <p>{label}:</p>
  </div>
  {#if type == "select"}
    <select
      class={["select join-item", { "text-base-content/35": !value }]}
      id="selectSeries"
      bind:value={() => undefined, (v) => (value = v)}
    >
      <option value="" selected>Filter by {label}</option>
      <option value="" disabled>-----</option>
      {#each options as option}
        <option value={option}>
          {#if "title" in option.data}
            {option.data.title}
          {/if}
          {#if "name" in option.data}
            {option.data.name}
          {/if}
        </option>
      {/each}
    </select>
  {/if}
  {#if type == "date"}
    <input type="date" class="input join-item" bind:value />
  {/if}
</div>
