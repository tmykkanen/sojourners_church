<script lang="ts">
  import type { CollectionEntry } from "astro:content";
  import Card from "@components/Card.svelte";
  import Text from "@components/Text.svelte";

  interface SermonData extends CollectionEntry<"sermons"> {
    series: CollectionEntry<"series">;
    preacher: CollectionEntry<"preachers">;
  }

  interface SeriesData {
    id: string;
    title: string;
  }

  let {
    allSeriesData,
    allSermonData,
    allPreachersData,
  }: {
    allSeriesData: SeriesData[];
    allSermonData: SermonData[];
    allPreachersData: CollectionEntry<"preachers">[];
  } = $props();

  let selectedSeries: SeriesData | undefined = $state();
  let selectedPreacher: SeriesData | undefined = $state();

  let filteredSermons = $derived(
    selectedSeries
      ? allSermonData.filter((item) => item.series.id == selectedSeries!.id)
      : allSermonData,
  );

  $inspect(selectedSeries, filteredSermons);
</script>

<Text as="h2" variant="heading"
  >{selectedSeries
    ? `Sermons from ${selectedSeries.title}`
    : "All Sermons"}</Text
>

<select class="select" bind:value={selectedSeries}>
  <option value="" selected>Filter by Series</option>
  <option value="" disabled>-----</option>
  {#each allSeriesData as option}
    <option value={option}>{option.title}</option>
  {/each}
</select>

<select class="select" bind:value={selectedPreacher}>
  <option value="" selected>Filter by Preacher</option>
  <option value="" disabled>-----</option>
  {#each allPreachersData as option}
    <option value={option}>{option.data.name}</option>
  {/each}
</select>

<div class="flex flex-col gap-(--spacing-reg) lg:grid lg:grid-cols-2">
  {#each filteredSermons as sermon (sermon.id)}
    <Card baseUrl="/sermons/" {sermon} />
  {/each}
</div>
