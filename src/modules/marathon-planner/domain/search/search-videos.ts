import { IApiVideoSearchResponse, IHttpClient } from "@/interfaces";

interface Params {
  httpClient: IHttpClient;
  query: string;
  requestLimit?: number;
}

export async function searchVideos({
  httpClient,
  query,
  requestLimit = 4,
}: Params) {
  let requests = 0;
  let pageToken: string | undefined = undefined;
  let apiResult: IApiVideoSearchResponse;
  let searchResults: IApiVideoSearchResponse = { items: [] };

  while (requests < requestLimit) {
    apiResult = await httpClient.get<IApiVideoSearchResponse>("search", {
      params: {
        part: "snippet",
        maxResults: 50,
        type: "video",
        q: query,
        pageToken,
      },
    });

    if (apiResult.nextPageToken) {
      pageToken = apiResult.nextPageToken;
      requests++;
    }

    searchResults.items = [...searchResults.items, ...apiResult.items];
  }

  if (!searchResults.items.length) return [];

  const videos = searchResults.items.map((item) => ({
    id: item.id.videoId,
    title: item.snippet.title,
    description: item.snippet.description,
    thumbnail: item.snippet.thumbnails.default.url,
    duration: null,
  }));

  return videos;
}
