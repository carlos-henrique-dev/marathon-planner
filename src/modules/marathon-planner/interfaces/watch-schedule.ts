import { IVideo } from "@/interfaces";

export interface IWatchSchedule {
  schedule: Record<string, IVideo[]>;
  videosLongerThanAvailableTime: IVideo[];
  days: number;
}
