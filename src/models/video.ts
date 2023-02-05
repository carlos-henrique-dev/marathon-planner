import { IVideo } from "@/interfaces";

export class Video implements IVideo {
  id: string;
  title: string;
  description: string;
  thumbnail: string;
  duration: string | null;

  constructor({
    id,
    title,
    description,
    thumbnail,
    duration,
  }: {
    id: string;
    title: string;
    description: string;
    thumbnail: string;
    duration: string | null;
  }) {
    this.id = id;
    this.title = title;
    this.description = description;
    this.thumbnail = thumbnail;
    this.duration = duration;
  }
}
