import { WEEK_DAYS } from "@/common";

/* 
In the functions below, the code (currentDayIndex === 6 ? 0 : currentDayIndex) 
is used to reset the currentDayIndex to 0 (sunday) when it reaches 6 (saturday).
*/

export const getCurrentDayKey = (
  currentDayIndex: number,
  daysPassed: number
) => {
  const currentWeekDay = WEEK_DAYS[currentDayIndex === 6 ? 0 : currentDayIndex];

  return `${daysPassed + 1}-${currentWeekDay}`;
};

export const getNextDayKey = (currentDayIndex: number, daysPassed: number) => {
  const nextWeekDay =
    WEEK_DAYS[currentDayIndex === 6 ? 0 : currentDayIndex + 1];

  return `${daysPassed + 2}-${nextWeekDay}`;
};

export const getNearestDayKey = (
  daysPassed: number,
  daysUntilNearestAvailableDay: number,
  closestDayWithEnoughTime: number
) => {
  const nearestDay = WEEK_DAYS[closestDayWithEnoughTime];

  return `${daysPassed + daysUntilNearestAvailableDay + 1}-${nearestDay}`;
};
