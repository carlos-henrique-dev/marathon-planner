import { AxiosAdapter } from "@/infra";
import { IHttpClient } from "@/interfaces";
import { hydrateVideos } from "./hydrate-videos";
import { searchVideos } from "./search-videos";

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
}
