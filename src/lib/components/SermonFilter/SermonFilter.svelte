<script lang="ts">
import type { CollectionEntry } from "astro:content";
import { type DateValue } from "@internationalized/date";
import { Undo2 } from "@lucide/svelte";
import Text from "$lib/components/Text.svelte";
import Button from "$lib/components/ui/button/button.svelte";
import { from, preacher, series, to } from "$lib/nanostores";
import type { PreacherData, SeriesData, SermonData } from "$lib/types";
import DatePicker from "./SermonFilterDatepicker.svelte";
import Select from "./SermonFilterSelect.svelte";

let {
  allSermonData,
  allSeriesData,
  allPreachersData,
}: {
  allSermonData: SermonData[];
  allSeriesData: SeriesData[];
  allPreachersData: PreacherData[];
} = $props();

const selectedSeries = $derived(
  allSeriesData.find((item) => item.id === $series),
);

const resetFilters = () => {
  series.set(undefined);
  preacher.set(undefined);
  from.set(undefined);
  to.set(undefined);
};
</script>

<Text as="h2" variant="heading">
  {selectedSeries
    ? `Sermons from ${selectedSeries?.data.title}`
    : "All Sermons"}
</Text>

{#if $series || $preacher || $from || $to}
  <Button
    variant="link"
    class="flex gap-1 items-center cursor-pointer w-fit px-0 py-0"
    onclick={() => resetFilters()}
  >
    Reset Filters
    <Undo2 />
  </Button>
{/if}

<div class="flex flex-col gap-2 md:grid md:grid-cols-2">
  <Select label="Series" bind:value={$series} data={allSeriesData} />
  <Select label="Preacher" bind:value={$preacher} data={allPreachersData} />
  <DatePicker label="From" bind:value={$from as DateValue} />
  <DatePicker label="From" bind:value={$to as DateValue} />
</div>
