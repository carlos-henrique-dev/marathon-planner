import { cleanSpecialCharacters } from "@/utils";
import { describe, it, expect } from "vitest";

describe("string methods", () => {
  it.each([
    ["Hello, world!", "Hello world"],
    ["Hello, world! 🌎", "Hello world"],
    ["Hello, world! 🌎 https://vitest.dev", "Hello world"],
  ])(
    "should clean special characters including emojis and links",
    (dirtString, cleanString) => {
      const result = cleanSpecialCharacters(dirtString);

      expect(result).toBe(cleanString);
    }
  );
});
