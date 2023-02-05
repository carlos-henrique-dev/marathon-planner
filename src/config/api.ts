import axios from "axios";

export const API = axios.create({
  baseURL: import.meta.env.VITE_YOUTUBE_API_URL,
  params: {
    key: import.meta.env.VITE_YOUTUBE_API_KEY,
  },
});
