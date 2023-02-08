import { IAvailability, IVideo } from "@/interfaces";
import { mountSchedule } from "@/modules/marathon-planner/domain/schedule/mount-schedule";
import { getVideoDuration } from "@/utils";
import { it, describe, expect } from "vitest";
import { HYDRATED_VIDEOS } from "./constants";

describe("MountSchedule", () => {
  it("should return an empty schedule when all the videos are longer than the availability", () => {
    const availability: IAvailability = {
      sunday: 2,
      monday: 2,
      tuesday: 2,
      wednesday: 2,
      thursday: 2,
      friday: 2,
      saturday: 2,
    };
    const videos: IVideo[] = HYDRATED_VIDEOS;
    const result = mountSchedule({ availability, videos });
    expect(result).toEqual({
      days: 0,
      videosLongerThanAvailableTime: HYDRATED_VIDEOS,
      schedule: {},
    });
  });
  it("should return a schedule with 3 empty days (sun, tue, thu)", () => {
    const availability: IAvailability = {
      sunday: 15,
      monday: 120,
      tuesday: 30,
      wednesday: 150,
      thursday: 20,
      friday: 40,
      saturday: 90,
    };
    const videos: IVideo[] = [
      "PT20M", //20 min,
      "PT30M", //30 min,
      "PT60M", //60 min,
      "PT90M", //90 min,
      "PT200M", //200 min,
      "PT30M", //30 min,
      "PT40M", //40 min,
      "PT20M", //20 min,
      "PT60M", //60 min,
      "PT15M", //15 min,
    ].map((duration) => ({
      ...HYDRATED_VIDEOS[0],
      id: `${HYDRATED_VIDEOS[0].id}-${duration}`,
      duration: getVideoDuration(duration),
    }));
    const result = mountSchedule({ availability, videos });

    expect(result).toEqual({
      days: 8,
      videosLongerThanAvailableTime: [videos[4]],
      schedule: {
        "1-sunday": [],
        "2-monday": [videos[0], videos[1], videos[2]],
        "3-tuesday": [],
        "4-wednesday": [videos[3], videos[5]],
        "5-thursday": [],
        "6-friday": [videos[6]],
        "7-sunday": [videos[7], videos[8]],
        "8-sunday": [videos[9]],
      },
    });
  });

  it("should return a schedule with 9 empty days and only the last day will have a video to watch", () => {
    const availability: IAvailability = {
      sunday: 5,
      monday: 5,
      tuesday: 5,
      wednesday: 5,
      thursday: 5,
      friday: 5,
      saturday: 5,
    };
    const videos: IVideo[] = [
      "PT15M", //15 min,
      "PT15M", //15 min,
      "PT15M", //15 min,
      "PT15M", //15 min,
      "PT15M", //15 min,,
      "PT15M", //15 min,
      "PT15M", //15 min,
      "PT15M", //15 min,
      "PT15M", //15 min,
      "PT5M", //5 min,
    ].map((duration) => ({
      ...HYDRATED_VIDEOS[0],
      id: `${HYDRATED_VIDEOS[0].id}-${duration}`,
      duration: getVideoDuration(duration),
    }));

    const result = mountSchedule({ availability, videos });

    expect(result).toEqual({
      days: 10,
      videosLongerThanAvailableTime: [...videos.slice(0, 9)],
      schedule: {
        "1-sunday": [],
        "2-monday": [],
        "3-tuesday": [],
        "4-wednesday": [],
        "5-thursday": [],
        "6-friday": [],
        "7-sunday": [],
        "8-sunday": [],
        "9-monday": [],
        "10-tuesday": [videos[9]],
      },
    });
  });

  it("should return a schedule with 1 empty day and 2 videos that will not be watched", () => {
    const availability: IAvailability = {
      sunday: 5,
      monday: 5,
      tuesday: 5,
      wednesday: 5,
      thursday: 5,
      friday: 5,
      saturday: 5,
    };
    const videos: IVideo[] = [
      "PT10M", //10 min,
      "PT2M", //2 min,
      "PT15M", //15 min,
      "PT2M", //2 min,
      "PT1M", //1 min,,
      "PT1M", //1 min,
      "PT1M", //1 min,
      "PT1M", //1 min,
      "PT1M", //1 min,
      "PT5M", //5 min,
    ].map((duration) => ({
      ...HYDRATED_VIDEOS[0],
      id: `${HYDRATED_VIDEOS[0].id}-${duration}`,
      duration: getVideoDuration(duration),
    }));
    const result = mountSchedule({ availability, videos });
    expect(result).toEqual({
      days: 4,
      videosLongerThanAvailableTime: [videos[0], videos[2]],
      schedule: {
        "1-sunday": [],
        "2-monday": [videos[1], videos[3], videos[4]],
        "3-tuesday": [videos[5], videos[6], videos[7], videos[8]],
        "4-wednesday": [videos[9]],
      },
    });
  });
});
