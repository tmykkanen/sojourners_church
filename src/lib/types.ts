import type { CollectionEntry } from "astro:content";

export type WritingsData = CollectionEntry<"writings">;
export type SeriesData = CollectionEntry<"series">;
export type PreacherData = CollectionEntry<"preachers">;
export interface SermonData extends CollectionEntry<"sermons"> {
  series: SeriesData;
  preacher: PreacherData;
}

// Helper functions for type narrowing
export const isSeriesCollection = (
  data:
    | SeriesData[]
    | PreacherData[]
    | SermonData[]
    | WritingsData[]
    | string[],
): data is SeriesData[] => {
  return (data[0] as SeriesData).collection === "series";
};

export const isPreacherCollection = (
  data:
    | SeriesData[]
    | PreacherData[]
    | SermonData[]
    | WritingsData[]
    | string[],
): data is PreacherData[] => {
  return (data[0] as PreacherData).collection === "preachers";
};

export const isSermonCollection = (
  data:
    | SeriesData[]
    | PreacherData[]
    | SermonData[]
    | WritingsData[]
    | string[],
): data is SermonData[] => {
  return (data[0] as SermonData).collection === "sermons";
};

export const isSermon = (
  data: SeriesData | PreacherData | SermonData | WritingsData | string,
): data is SermonData => {
  return (data as SermonData).collection === "sermons";
};

export const isWritingsCollection = (
  data:
    | SeriesData[]
    | PreacherData[]
    | SermonData[]
    | WritingsData[]
    | string[],
): data is WritingsData[] => {
  return (data[0] as WritingsData).collection === "writings";
};

export const isWriting = (
  data: SeriesData | PreacherData | SermonData | WritingsData | string,
): data is WritingsData => {
  return (data as WritingsData).collection === "writings";
};

export const isStringArray = (
  data:
    | SeriesData[]
    | PreacherData[]
    | SermonData[]
    | WritingsData[]
    | string[],
): data is string[] => {
  return typeof data[0] === "string";
};

// Spotify Types
export interface SpotifyPlaybackEvent {
  data: {
    position: number;
    duration: number;
    isBuffering: boolean;
    isPaused: boolean;
    playingURI: string;
  };
}

export interface SpotifyEmbedController {
  addListener: (
    event: string,
    callback: (event: SpotifyPlaybackEvent) => void,
  ) => void;
  removeListener: (event: string) => void;
  play?: () => void;
  pause?: () => void;
  loadUri?: (uri: string) => void;
}

export interface SpotifyIframeApi {
  createController: (
    element: HTMLElement | null,
    options: {
      width: string;
      height: string;
      uri: string;
    },
    callback: (controller: SpotifyEmbedController) => void,
  ) => void;
}
