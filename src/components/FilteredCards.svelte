<script lang="ts">
  import type { CollectionEntry } from "astro:content";
  import type { SermonData } from "@src/types/index";

  import FilterInput from "./FilterInput.svelte";
  import Card from "@components/Card.svelte";
  import Text from "@components/Text.svelte";

  import Icon from "@iconify/svelte";

  // interface SermonData extends CollectionEntry<"sermons"> {
  //   series: CollectionEntry<"series">;
  //   preacher: CollectionEntry<"preachers">;
  // }

  // export interface SeriesData {
  //   id: string;
  //   title: string;
  // }

  let {
    allSermonData,
    allSeriesData,
    allPreachersData,
  }: {
    allSermonData: SermonData[];
    allSeriesData: CollectionEntry<"series">[];
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

    if (startDate) {
      const date = new Date(startDate);
      sermonData = sermonData.filter((item) => item.data.date >= date);
    }
    if (endDate) {
      const date = new Date(endDate);
      sermonData = sermonData.filter((item) => item.data.date <= date);
    }

    return sermonData;
  };

  const resetFilters = () => {
    selectedSeries = undefined;
    selectedPreacher = undefined;
    startDate = undefined;
    endDate = undefined;

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

  // let selectedSeries: SeriesData | undefined = $state({id: '', title: ''});
  let selectedSeries: CollectionEntry<"series"> | undefined = $state();
  let selectedPreacher: CollectionEntry<"preachers"> | undefined = $state();
  let startDate: string | undefined = $state();
  let endDate: string | undefined = $state();

  let filteredSermons = $derived.by(() => getFilteredSermons(allSermonData));
</script>

<!-- TODO: COMBINE ELEMENTS-->
<Text as="h2" variant="heading"
  >{selectedSeries
    ? `Sermons from ${selectedSeries.data.title}`
    : "All Sermons"}
</Text>
{#if selectedSeries || selectedPreacher || startDate || endDate}
  <button
    class="flex gap-1 items-center text-primary text-sm cursor-pointer"
    onclick={() => resetFilters()}
  >
    Reset Filters <Icon icon="mdi:filter-remove-outline" class={"text-xl"}
      >Reset</Icon
    >
  </button>
{/if}

<!-- <div class="join">
  <div
    class="join-item bg-base-100 px-(--spacing-sm) text-sm border border-base-content/20 h-full flex items-center"
  >
    <p>Series:</p>
  </div>
  <select
    class={["select join-item", { "text-base-content/35": !selectedSeries }]}
    id="selectSeries"
    bind:value={() => undefined, (v) => (selectedSeries = v)}
  >
    <option value="" selected>Filter by Series</option>
    <option value="" disabled>-----</option>
    {#each allSeriesData as option}
      <option value={option}>{option.title}</option>
    {/each}
  </select>
</div> -->

<!-- <select
  class="select"
  id="selectPreacher"
  bind:value={() => undefined, (v) => (selectedPreacher = v)}
>
  <option value="" selected>Filter by Preacher</option>
  <option value="" disabled>-----</option>
  {#each allPreachersData as option}
    <option value={option}>{option.data.name}</option>
  {/each}
</select> -->

<FilterInput
  label="Series"
  bind:value={selectedSeries}
  options={allSeriesData}
  type="select"
/>
<FilterInput
  label="Preacher"
  bind:value={selectedPreacher}
  options={allPreachersData}
  type="select"
/>

<div class="flex gap-(--spacing-xs) flex-col">
  <FilterInput type="date" bind:value={startDate} label="From" />
  <FilterInput type="date" bind:value={endDate} label="To" />
  <!-- <div class="join items-center">
    <div
      class="join-item bg-base-100 px-(--spacing-sm) text-sm border border-base-content/20 h-full flex items-center"
    >
      <p>From:</p>
    </div>

    <input type="date" class="input join-item" bind:value={startDate} />
  </div> -->
  <!-- <div class="join items-center">
    <div
      class="join-item bg-base-100 px-(--spacing-sm) text-sm border border-base-content/20 h-full flex items-center"
    >
      <p>To:</p>
    </div>

    <input type="date" class="input join-item" bind:value={endDate} />
  </div> -->
</div>

<div
  class="flex flex-col pt-(--spacing-reg) gap-(--spacing-reg) lg:grid lg:grid-cols-2"
>
  {#each filteredSermons as sermon (sermon.id)}
    <Card baseUrl="/sermons/" {sermon} />
  {/each}
</div>
