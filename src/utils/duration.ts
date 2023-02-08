const countYears = (years: number) =>
  Number.isNaN(years) ? 0 : years * 365 * 24 * 60;

const countMonths = (months: number) =>
  Number.isNaN(months) ? 0 : months * 30 * 24 * 60;

const countDays = (days: number) => (Number.isNaN(days) ? 0 : days * 24 * 60);

const countHours = (hours: number) => (Number.isNaN(hours) ? 0 : hours * 60);

const countMinutes = (minutes: number) => (Number.isNaN(minutes) ? 0 : minutes);

const countSeconds = (seconds: number) =>
  Number.isNaN(seconds) ? 0 : seconds / 60;

const roundToNearestMinute = (minutes: number) => Math.round(minutes);

export const getVideoDuration = (duration: string | null) => {
  if (!duration) return 0;

  // just trust google for this regex
  const PARSE_DURATION_REGEX =
    /P(?:(\d+)Y)?(?:(\d+)M)?(?:(\d+)D)?T(?:(\d+)H)?(?:(\d+)M)?(?:(\d+)S)?/;

  // @ts-ignore - TS keeps complaining about the regex might be null
  const parsedDuration = duration.match(PARSE_DURATION_REGEX).map(Number);

  const [, years, months, days, hours, minutes, seconds] = parsedDuration;

  const totalMinutes =
    countYears(years) +
    countMonths(months) +
    countDays(days) +
    countHours(hours) +
    countMinutes(minutes) +
    countSeconds(seconds);

  return roundToNearestMinute(totalMinutes);
};
