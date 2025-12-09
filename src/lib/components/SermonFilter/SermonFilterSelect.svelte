<script lang="ts">
import * as Select from "$lib/components/ui/select/index.js";
import { isSeries, type PreacherData, type SeriesData } from "$lib/types";

let {
  data,
  value = $bindable(),
  label,
  ...restProps
}: {
  data: SeriesData[] | PreacherData[];
  value: string | undefined;
  label: "Series" | "Preacher";
} = $props();

// Helper function for type narrowing
// function isSeries(data: SeriesData[] | PreacherData[]): data is SeriesData[] {
//   return (data[0] as SeriesData).data.title !== undefined;
// }

const triggerContent = $derived.by(() => {
  if (isSeries(data)) {
    return (
      data.find((item) => item.id === value)?.data.title ?? `Filter by ${label}`
    );
  } else {
    return (
      data.find((item) => item.id === value)?.data.name ?? `Filter by ${label}`
    );
  }
});
</script>

<!-- [BUG] Add trunication for select text when too large -->
<div class="inline-flex items-stretch">
  <p
    class="text-sm select-none bg-muted rounded-l-md px-4 py-2 border border-muted-content/20 h-full flex items-center flex-1/4 sm:flex-1 min-w-24"
  >
    {label}:
  </p>
  <Select.Root type="single" bind:value {...restProps}>
    <Select.Trigger
      class="flex-[65%] rounded-l-none -ml-px bg-muted data-placeholder:text-muted-foreground px-4 py-2 text-sm data-[size=default]:h-full overflow-hidden"
    >
      <span class="text-ellipsis overflow-hidden">{triggerContent}</span>
    </Select.Trigger>

    <Select.Content class="p-4">
      <Select.Group>
        {#if isSeries(data)}
          {#each data as option (option.id)}
            <Select.Item value={option.id} label={option.data.title}>
              {option.data.title}
            </Select.Item>
          {/each}
        {:else}
          {#each data as option (option.id)}
            <Select.Item value={option.id} label={option.data.name}>
              {option.data.name}
            </Select.Item>
          {/each}
        {/if}
      </Select.Group>
    </Select.Content>
  </Select.Root>
</div>
