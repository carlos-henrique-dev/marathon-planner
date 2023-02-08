import { IApiVideoDetailResponse, IHttpClient, IVideo } from "@/interfaces";
import { Video } from "@/models";
import { getVideoDuration } from "@/utils";

export const splitIntoChunksOfIds = (videos: IVideo[], chunkSize: number) => {
  const videoIdsChunks = videos.reduce((acc, video, index) => {
    const chunkIndex = Math.floor(index / chunkSize);

    if (!acc[chunkIndex]) acc[chunkIndex] = [];

    acc[chunkIndex].push(video.id);

    return acc;
  }, [] as string[][]);

  return videoIdsChunks;
};

interface Params {
  httpClient: IHttpClient;
  videos: IVideo[];
}

export async function hydrateVideos({ httpClient, videos }: Params) {
  const videoChunksOfIds = splitIntoChunksOfIds(videos, 50);

  const videoChunks = await Promise.allSettled(
    videoChunksOfIds.map((videoIds) => {
      const videoIdsString = videoIds.join(",");
      return httpClient.get<IApiVideoDetailResponse>("videos", {
        params: {
          part: "snippet,contentDetails",
          id: videoIdsString,
        },
      });
    })
  );

  const hydratedVideos = videoChunks.reduce((acc, videoChunk) => {
    if (videoChunk.status !== "fulfilled") return acc;

    videoChunk.value.items.forEach((item) => {
      const findVideo = videos.find((video) => video.id === item.id);

      if (!findVideo) return;

      const video = new Video({
        id: findVideo.id,
        title: item.snippet.title,
        description: item.snippet.description,
        thumbnail: item.snippet.thumbnails.default.url,
        duration: getVideoDuration(item.contentDetails.duration),
      });

      acc.push(video);
    });

    return acc;
  }, [] as IVideo[]);

  return hydratedVideos;
}
