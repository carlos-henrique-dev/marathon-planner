import { AxiosAdapter } from "@/infra";
import { IAvailability, IHttpClient, IVideo } from "@/interfaces";
import { Availability } from "@/models/availability";
import { mountSchedule } from "./schedule/mount-schedule";
import { hydrateVideos } from "./search/hydrate-videos";
import { searchVideos } from "./search/search-videos";
import { mostUsedWordsInSentences } from "./statistics/most-used-words";

export class MarathonPlannerDomain {
  private httpClient: IHttpClient = new AxiosAdapter();

  constructor() {}

  search = async (query: string) => {
    const searchResults = await searchVideos({
      httpClient: this.httpClient,
      query,
    });

    const hydratedVideos = await hydrateVideos({
      httpClient: this.httpClient,
      videos: searchResults,
    });

    return hydratedVideos;
  };

  findMostUsedWordsInTitles = (titles: string[]) => {
    return mostUsedWordsInSentences({ sentences: titles, limit: 5 });
  };

  findMostUsedWordsInDescriptions = (titles: string[]) => {
    return mostUsedWordsInSentences({ sentences: titles, limit: 5 });
  };

  saveAvailability = (data: IAvailability) => {
    return new Availability(data);
  };

  getSchedule = (availability: IAvailability, videos: IVideo[]) => {
    return mountSchedule({ availability, videos });
  };
}
