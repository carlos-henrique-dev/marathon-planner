import { IApiVideoSearchResponse, IHttpClient } from "@/interfaces";

interface Params {
  httpClient: IHttpClient;
  query: string;
}

export async function searchVideos({ httpClient, query }: Params) {
  const apiResult = await httpClient.get<IApiVideoSearchResponse>("search", {
    params: {
      part: "snippet",
      maxResults: 200,
      type: "video",
      q: query,
    },
  });

  if (!apiResult.items.length) return [];

  const videos = apiResult.items.map((item) => ({
    id: item.id.videoId,
    title: item.snippet.title,
    description: item.snippet.description,
    thumbnail: item.snippet.thumbnails.default.url,
    duration: null,
  }));

  return videos;
}
