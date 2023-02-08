export function cleanSpecialCharacters(text: string) {
  const regexForSpecialCharacters = /[^a-zA-Z0-9À-ÿ\s]/gi;
  const regexForLinks = /https?:\/\/\S+/gi;

  return text
    .replace(regexForLinks, "")
    .replace(regexForSpecialCharacters, "")
    .trim();
}
