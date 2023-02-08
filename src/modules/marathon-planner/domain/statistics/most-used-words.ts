import { cleanSpecialCharacters } from "@/utils";

interface Params {
  sentences: string[];
  limit: number;
}

export function mostUsedWordsInSentences({ sentences, limit }: Params) {
  const cleanSentences = sentences.map(cleanSpecialCharacters);

  const words = cleanSentences
    .join(" ")
    .split(" ")
    .filter((word) => word !== "" && word.length > 3);

  const wordCount = words.reduce((acc, word) => {
    const key = word.toLowerCase();
    acc[key] = (acc[key] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  return Object.entries(wordCount)
    .sort(([, a], [, b]) => b - a)
    .slice(0, limit)
    .map(([word, count]) => ({ word, count }));
}
