import { WEEK_DAYS } from "@/common";
import { IAvailability } from "@/interfaces";

export const getHighestAvailableTime = (availability: IAvailability) =>
  Object.values(availability).reduce(
    (acc, current) => (current > acc ? current : acc),
    0
  );

export const getDayAvailability = (
  availability: IAvailability,
  currentDay: number
) => availability[WEEK_DAYS[currentDay] as keyof typeof availability];

export const getNearestAvailableDay = ({
  videoDuration,
  availability,
  currentDay,
}: {
  videoDuration: number;
  availability: IAvailability;
  currentDay: number;
}) => {
  console.log({
    videoDuration,
    availability,
    currentDay,
    weekday: WEEK_DAYS[currentDay],
  });

  // if we get here it means that the video duration is higher than the available time on the next day
  // so we will find the nearest day with enough time to add the video
  let closestDayWithEnoughTime = currentDay === 6 ? 0 : currentDay + 1;
  let daysUntilNearestAvailableDay = 1;

  let closestWeekdayIndex = WEEK_DAYS[
    closestDayWithEnoughTime
  ] as keyof typeof availability;
  let closestWeekdayAvailability = availability[closestWeekdayIndex];

  let loopCount = 0;
  while (videoDuration > closestWeekdayAvailability) {
    console.log("cai aqui 2", {
      closestWeekdayIndex,
      closestWeekdayAvailability,
      closestDayWithEnoughTime,
      daysUntilNearestAvailableDay,
    });

    closestDayWithEnoughTime =
      closestDayWithEnoughTime === 6 ? 0 : closestDayWithEnoughTime + 1;
    daysUntilNearestAvailableDay++;

    if (
      availability[
        WEEK_DAYS[closestDayWithEnoughTime] as keyof typeof availability
      ] >= videoDuration
    ) {
      closestWeekdayIndex = WEEK_DAYS[
        closestDayWithEnoughTime
      ] as keyof typeof availability;
      closestWeekdayAvailability = availability[closestWeekdayIndex];

      break;
    }

    if (loopCount > 50) {
      break;
    }
  }

  console.log({ daysUntilNearestAvailableDay, closestDayWithEnoughTime });
  return {
    daysUntilNearestAvailableDay,
    closestDayWithEnoughTime,
  };
};
