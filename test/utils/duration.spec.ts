import { getVideoDuration } from "@/utils";
import { describe, it, expect } from "vitest";

describe("duration methods", () => {
  it.each([
    // test options in format [input, expected] based on YouTube video durations
    [null, 0],
    ["PT10S", 0],
    ["PT1M", 1],
    ["PT15M21S", 15],
    ["PT45M54S", 46],
    ["PT1H1M1S", 61],
    ["P1DT1H1M1S", 1 * 24 * 60 + 1 * 60 + 1],
    ["P1M0DT0H0M0S", 30 * 24 * 60],
    ["P1Y0M0DT0H0M0S", 365 * 24 * 60],
  ])(
    "should parse the duration string and return a number representing the total minutes",
    (duration, minutes) => {
      const result = getVideoDuration(duration);

      expect(result).toBe(minutes);
    }
  );
});
