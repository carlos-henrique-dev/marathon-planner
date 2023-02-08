import { IApiVideoDetailResponse } from "@/interfaces";
import {
  hydrateVideos,
  splitIntoChunksOfIds,
} from "@/modules/marathon-planner/domain/search/hydrate-videos";
import { getVideoDuration } from "@/utils";
import { HttpClientMock } from "test/__mocks__/http-client";
import { describe, expect, it } from "vitest";
import {
  VIDEOS_TO_HYDRATE,
  API_DETAIL_RESPONSE_ITEMS,
  HYDRATED_VIDEOS,
} from "./constants";

describe("HydrateVideos", () => {
  //   it("should split the videos into chunks and return the ids", () => {
  //     const chunks = splitIntoChunksOfIds(VIDEOS_TO_HYDRATE, 2);
  //     expect(chunks).toEqual([["2OTq15A5s0Y", "NhUr8cwDiiM"], ["1LkOa7Ky2ak"]]);
  //   });
  //   it("should return a list of hydrated videos", async () => {
  //     const httpClient = new HttpClientMock<IApiVideoDetailResponse>({
  //       items: API_DETAIL_RESPONSE_ITEMS,
  //     });
  //     const result = await hydrateVideos({
  //       httpClient,
  //       videos: VIDEOS_TO_HYDRATE.map((video) => ({
  //         ...video,
  //         duration: getVideoDuration(video.duration),
  //       })),
  //     });
  //     expect(result).toEqual(HYDRATED_VIDEOS);
  //   });
});
