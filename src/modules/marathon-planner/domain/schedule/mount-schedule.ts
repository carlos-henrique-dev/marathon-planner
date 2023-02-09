import { WEEK_DAYS } from "@/common";
import { IAvailability, IVideo } from "@/interfaces";
import {
  getCurrentDayKey,
  getDayAvailability,
  getHighestAvailableTime,
  getNearestAvailableDay,
  getNearestDayKey,
  getNextDayKey,
} from "./helpers";

interface Params {
  availability: IAvailability;
  videos: IVideo[];
}

export function mountSchedule({ availability, videos }: Params) {
  let remainingAvailabilityOnCurrentDay = availability.sunday;
  let currentDay = 0;
  let daysPassed = 0;
  let videosLongerThanAvailableTime: IVideo[] = [];
  let schedule: Record<string, IVideo[]> = {};

  const highestAvailableTime = getHighestAvailableTime(availability);

  videos.forEach((video, index) => {
    const videoDuration = Number(video.duration);

    const current_day_key = getCurrentDayKey(currentDay, daysPassed);
    schedule[current_day_key] = schedule[current_day_key] || [];

    if (videoDuration > highestAvailableTime) {
      videosLongerThanAvailableTime.push(video);

      const currentDayIsEmpty = schedule[current_day_key].length === 0;
      if (currentDayIsEmpty) {
        daysPassed++;
        currentDay = currentDay === 6 ? 0 : currentDay + 1;
        remainingAvailabilityOnCurrentDay = getDayAvailability(
          availability,
          currentDay
        );
      }

      return;
    }

    // If video duration is lower than the available time on the current day, it will be added to the current day
    if (videoDuration <= remainingAvailabilityOnCurrentDay) {
      schedule[current_day_key].push(video);

      remainingAvailabilityOnCurrentDay -= videoDuration;

      // there's no more room on the current day, or the next video is longer than the available time on the current day
      // it will go to the next day
      const nextVideo = videos[index + 1 === 6 ? 0 : index + 1];
      const nextVideoDuration = Number(nextVideo?.duration);

      const nextVideoIsGreaterThenRemainingTime =
        nextVideoDuration > remainingAvailabilityOnCurrentDay;

      const nextVideoIsBiggerThanHighestTime =
        nextVideoDuration > highestAvailableTime;
      if (
        remainingAvailabilityOnCurrentDay === 0 ||
        (nextVideoIsGreaterThenRemainingTime &&
          !nextVideoIsBiggerThanHighestTime)
      ) {
        daysPassed++;
        currentDay = currentDay === 6 ? 0 : currentDay + 1;
        remainingAvailabilityOnCurrentDay = getDayAvailability(
          availability,
          currentDay
        );
      }

      return;
    }

    // If video duration is higher than the available time on the current day, it will be added to the next day
    if (videoDuration > remainingAvailabilityOnCurrentDay) {
      const nextDayKey = getNextDayKey(currentDay, daysPassed);
      schedule[nextDayKey] = schedule[nextDayKey] || [];

      const nextDayAvailability = getDayAvailability(
        availability,
        currentDay === 6 ? 0 : currentDay + 1
      );

      // if the video duration is lower than the available time on the next day, it will be added to the next day
      if (videoDuration <= nextDayAvailability) {
        schedule[nextDayKey].push(video);

        daysPassed++;
        currentDay = currentDay === 6 ? 0 : currentDay + 1;
        remainingAvailabilityOnCurrentDay =
          availability[WEEK_DAYS[currentDay] as keyof typeof availability] -
          videoDuration;
        return;
      }

      const { daysUntilNearestAvailableDay, closestDayWithEnoughTime } =
        getNearestAvailableDay({
          videoDuration: videoDuration,
          availability: availability,
          currentDay,
        });

      const nearest_day_key = getNearestDayKey(
        daysPassed,
        daysUntilNearestAvailableDay,
        closestDayWithEnoughTime
      );
      schedule[nearest_day_key] = schedule[nearest_day_key] || [];
      schedule[nearest_day_key].push(video);

      daysPassed += 1 + daysUntilNearestAvailableDay;
      currentDay =
        closestDayWithEnoughTime === 6 ? 0 : closestDayWithEnoughTime + 1;
      remainingAvailabilityOnCurrentDay =
        availability[WEEK_DAYS[currentDay] as keyof typeof availability];
      return;
    }
  });

  function getDaysTotal() {
    const scheduledDays = Object.entries(schedule);

    const daysWithVideos = scheduledDays.filter(
      ([, value]) => value.length !== 0
    ).length;

    if (daysWithVideos === 0) return 0;

    return daysPassed;
  }

  function cleanSchedule() {
    const scheduledLength = Object.keys(schedule).length;
    const daysWithoutVideos = Object.entries(schedule).filter(
      ([, value]) => value.length === 0
    ).length;

    if (scheduledLength === daysWithoutVideos) {
      return {};
    }

    return schedule;
  }

  return {
    schedule: cleanSchedule(),
    videosLongerThanAvailableTime,
    days: getDaysTotal(),
  };
}
