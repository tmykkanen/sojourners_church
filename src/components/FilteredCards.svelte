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

  const getFilteredSermons = (sermonData: SermonData[]) => {
    if (selectedSeries) {
      sermonData = sermonData.filter(
        (item) => item.series.id == selectedSeries!.id,
      );
    }

    if (selectedPreacher) {
      sermonData = sermonData.filter(
        (item) => item.preacher.id == selectedPreacher!.id,
      );
    }

    return sermonData;
  };

  const resetFilters = () => {
    selectedSeries = undefined;
    selectedPreacher = undefined;

    const selectSeriesEl = document.getElementById(
      "selectSeries",
    ) as HTMLSelectElement;
    const selectPreacherEl = document.getElementById(
      "selectPreacher",
    ) as HTMLSelectElement;

    if (selectSeriesEl) {
      selectSeriesEl.selectedIndex = 0;
    }
    if (selectPreacherEl) {
      selectPreacherEl.selectedIndex = 0;
    }
  };

  let selectedSeries: SeriesData | undefined = $state();
  let selectedPreacher: SeriesData | undefined = $state();

  let filteredSermons = $derived.by(() => getFilteredSermons(allSermonData));
</script>

<Text as="h2" variant="heading"
  >{selectedSeries
    ? `Sermons from ${selectedSeries.title}`
    : "All Sermons"}</Text
>

<select
  class="select"
  id="selectSeries"
  bind:value={() => undefined, (v) => (selectedSeries = v)}
>
  <option value="" selected>Filter by Series</option>
  <option value="" disabled>-----</option>
  {#each allSeriesData as option}
    <option value={option}>{option.title}</option>
  {/each}
</select>

<select
  class="select"
  id="selectPreacher"
  bind:value={() => undefined, (v) => (selectedPreacher = v)}
>
  <option value="" selected>Filter by Preacher</option>
  <option value="" disabled>-----</option>
  {#each allPreachersData as option}
    <option value={option}>{option.data.name}</option>
  {/each}
</select>

{#if selectedSeries || selectedPreacher}
  <button class="btn btn-accent" onclick={() => resetFilters()}
    >Reset Filters</button
  >
{/if}

<div class="flex flex-col gap-(--spacing-reg) lg:grid lg:grid-cols-2">
  {#each filteredSermons as sermon (sermon.id)}
    <Card baseUrl="/sermons/" {sermon} />
  {/each}
</div>
