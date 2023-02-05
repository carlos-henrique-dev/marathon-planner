export interface IVideo {
  id: string;
  title: string;
  description: string;
  thumbnail: string;
  duration: string | null;
}

export interface IApiVideoSearchResponse {
  [key: string]: any;
  items: {
    id: {
      [key: string]: any;
      videoId: string;
    };
    snippet: {
      [key: string]: any;
      title: string;
      description: string;
      thumbnails: {
        [key: string]: any;
        default: {
          [key: string]: any;
          url: string;
        };
      };
    };
  }[];
}

export interface IApiVideoDetailResponse {
  [key: string]: any;
  items: {
    id: string;
    snippet: {
      [key: string]: any;
      title: string;
      description: string;
      thumbnails: {
        [key: string]: any;
        default: {
          [key: string]: any;
          url: string;
        };
      };
    };
    contentDetails: {
      [key: string]: any;
      duration: string;
    };
  }[];
}
