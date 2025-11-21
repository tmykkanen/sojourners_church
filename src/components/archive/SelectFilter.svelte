<script lang="ts">
  import type { CollectionEntry } from "astro:content";
  import Card from "@components/Card.svelte";

  interface SermonData extends CollectionEntry<"sermons"> {
    series: CollectionEntry<"series">;
    preacher: CollectionEntry<"preachers">;
  }

  let {
    allSeriesData,
    allSermonData,
  }: {
    allSeriesData: { id: string; title: string }[];
    allSermonData: SermonData[];
  } = $props();

  let selectedSeries = $state();

  let filteredSermons = $derived(
    selectedSeries
      ? allSermonData.filter((item) => item.series.id == selectedSeries)
      : allSermonData,
  );

  $inspect(selectedSeries, filteredSermons);
</script>

<select class="select" bind:value={selectedSeries}>
  <option value="">-----</option>
  {#each allSeriesData as option}
    <option value={option.id}>{option.title}</option>
  {/each}
</select>

<p>Selected Series: {selectedSeries}</p>

<ul class="flex flex-col gap-4">
  {#each filteredSermons as sermon (sermon.id)}
    <Card baseUrl="/sermons" {sermon} />
    <!-- <li>{sermon.data.title} - {sermon.data.scripture}</li> -->
  {/each}
</ul>
