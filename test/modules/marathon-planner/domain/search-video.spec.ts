import { it, describe, expect } from "vitest";

import { searchVideos } from "@/modules/marathon-planner/domain/search/search-videos";
import { IApiVideoSearchResponse, IHttpClient } from "@/interfaces";
import { HttpClientMock } from "test/__mocks__/http-client";

describe("SearchVideos", () => {
  //   it("should return an empty array when the query is empty", async () => {
  //     const httpClient = new HttpClientMock<IApiVideoSearchResponse>({
  //       items: [],
  //     });
  //     const result = await searchVideos({ httpClient, query: "" });
  //     expect(result).toEqual([]);
  //   });
  //   it("should return a formatted array for a valid query", async () => {
  //     const httpClient = new HttpClientMock<IApiVideoSearchResponse>({
  //       items: [
  //         {
  //           id: {
  //             videoId: "2OTq15A5s0Y",
  //           },
  //           snippet: {
  //             title: "7 better ways to create a React app",
  //             description:
  //               "What is the best tool for starting a new React project in 2023? Let's look at 7 good alternatives to create-react-app for starting a ...",
  //             thumbnails: {
  //               default: {
  //                 url: "https://i.ytimg.com/vi/2OTq15A5s0Y/default.jpg",
  //               },
  //             },
  //           },
  //         },
  //       ],
  //     });
  //     const result = await searchVideos({ httpClient, query: "react" });
  //     expect(result).toEqual([
  //       {
  //         id: "2OTq15A5s0Y",
  //         title: "7 better ways to create a React app",
  //         description:
  //           "What is the best tool for starting a new React project in 2023? Let's look at 7 good alternatives to create-react-app for starting a ...",
  //         thumbnail: "https://i.ytimg.com/vi/2OTq15A5s0Y/default.jpg",
  //         duration: null,
  //       },
  //     ]);
  //   });
});
