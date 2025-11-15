import type { CollectionEntry } from "astro:content";

// Set up bcv_parser
import { bcv_parser } from "bible-passage-reference-parser/esm/bcv_parser.js";
import * as lang from "bible-passage-reference-parser/esm/lang/en.js";
import osisToEn from "../script/en";

import bibleBookNumbers from "./bibleBookNumbers";

type SermonText = {
  book: string;
  startingChapter: number;
  startingVerse?: number | null | undefined;
  endingChapter?: number | null | undefined;
  endingVerse?: number | null | undefined;
};

// (1) SCRIPTURE REF TO OSIS: "Psalm 2" => "Ps.2.1–Ps.2.12"
// Function to process sermon post frontmatter to form readable for bcv_parser (processSermonPostRef)
const formatForBCVParser = (sermonText: SermonText[]) => {
  // TODO: Add handling for multiple sermon texts

  const { book, startingChapter, endingChapter, startingVerse, endingVerse } =
    sermonText[0];

  let output = book + " " + startingChapter;

  if (startingVerse) output += ":" + startingVerse;

  if (endingVerse) {
    if (endingChapter && startingChapter !== endingChapter) {
      output += "-" + endingChapter + ":" + endingVerse;
    } else {
      output += "–" + endingVerse;
    }
  }

  return output;
};

// Wrapper for bcv_parser outputs OSIS format
const bcvParserWrapper = (scriptureRef: string) => {
  const bcv = new bcv_parser(lang);
  return bcv
    .parse(scriptureRef)
    .set_options({
      consecutive_combination_strategy: "separate",
      osis_compaction_strategy: "bcv",
    })
    .osis();
};

const scriptureRefToOsis = (sermonText: SermonText[]) => {
  const refReadyForBCV = formatForBCVParser(sermonText);
  return bcvParserWrapper(refReadyForBCV);
};

const getHumanReadableScriptureRef = (sermonText: SermonText[]) => {
  return osisToEnWrapper(scriptureRefToOsis(sermonText));
};

// Wrapper for osisToEn to return readable text
const osisToEnWrapper = (osisRef: string) => {
  return osisToEn("esv-long", osisRef);
};

// Function to encode ref to number and return encoded reference (encodeRefToNumber)
// https://github.com/monty5811/elm-bible/blob/2.0.2/src/Bible.elm
// # Encoding

// It may be useful to have a unique, compact representation of a reference for storage, searching, sorting, etc.

// An easy way to achieve this is to convert the start and end of the reference to an `Int`.
// These integers can then be stored in a database, sorted, checked for intersections to do searches, etc.

// The encoding process is as follows:

//     (1000000 * Book.toInt book) + (1000 * chapter) + verse

// This results in an `Int` with the following structure

//     16001001
//     --===___
//      | |  |
//      | |  |
//      | |  |--- Zero padded verse number
//      | |------ Zero padded chapter number
//      |-------- Book number

const encodeRefToNumber = (scriptureRef: string[]) => {
  const book = scriptureRef[0];
  const chapter = scriptureRef[1];
  const verse = scriptureRef[2];

  const matchingBookArray = bibleBookNumbers.filter(
    (item) => item.book === book,
  );

  const bookNum = matchingBookArray[0].num * 1000000;
  const chapterNum = parseInt(chapter) * 1000;
  const verseNum = parseInt(verse);

  return bookNum + chapterNum + verseNum;
};

// Function to build reference object (parseRefs)
const createScriptureObject = (osisRef: string) => {
  // const arrayOfOsisRefs = osisRef.split("-").map((item) => item.split("."));
  const arrayOfOsisRefs = osisRef.split("-");

  // .map((item) => item.split("."));

  // Create object for each element in array
  return arrayOfOsisRefs.map((ref) => {
    const refArray = ref.split(".");
    return {
      id: encodeRefToNumber(refArray),
      osis: ref,
      book: refArray[0],
      chapter: refArray[1],
      verse: refArray[2],
    };
  });
};

export {
  getHumanReadableScriptureRef,
  createScriptureObject,
  scriptureRefToOsis,
  osisToEnWrapper,
  bcvParserWrapper,
};
