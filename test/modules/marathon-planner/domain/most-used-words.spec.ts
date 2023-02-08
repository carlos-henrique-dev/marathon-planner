import { mostUsedWordsInSentences } from "@/modules/marathon-planner/domain/statistics/most-used-words";
import { describe, it, expect } from "vitest";
import { HYDRATED_VIDEOS } from "./constants";

describe("MostUsedWordsInSentences", () => {
  it("returns the 5 most used words in the videos titles, ignoring words smaller than 3 characters", () => {
    const sentences = HYDRATED_VIDEOS.map(({ title }) => title);

    const result = mostUsedWordsInSentences({
      sentences,
      limit: 5,
    });

    expect(result).toEqual([
      { word: "react", count: 2 },
      { word: "better", count: 1 },
      { word: "ways", count: 1 },
      { word: "create", count: 1 },
      { word: "dicionário", count: 1 },
    ]);
  });

  it("returns the 5 most used words in the videos descriptions, ignoring words smaller than 3 characters", () => {
    const sentences = HYDRATED_VIDEOS.map(({ description }) => description);

    const result = mostUsedWordsInSentences({
      sentences,
      limit: 5,
    });

    expect(result).toEqual([
      { word: "react", count: 11 },
      { word: "with", count: 10 },
      { word: "reactjs", count: 5 },
      { word: "apps", count: 5 },
      { word: "development", count: 4 },
    ]);
  });
});
