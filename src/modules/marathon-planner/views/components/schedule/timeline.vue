<script lang="ts">
import {
  VAlert,
  VCol,
  VRow,
  VTimeline,
  VTimelineItem,
} from "vuetify/components";

import { VideoCard } from "@/components";
import { IVideo } from "@/interfaces";

export default {
  name: "timeline",
  components: {
    VAlert,
    VCol,
    VRow,
    VTimeline,
    VTimelineItem,
    VideoCard,
  },
  props: {
    schedule: {
      type: Array<[string, IVideo[]]>,
      required: true,
    },
  },

  setup() {
    const getTitle = (key: string) => {
      const day = key.split("-")[0];
      return `Day ${day}`;
    };

    const getSubtitle = (videos: IVideo[]) => {
      const numberOfVideos = videos.length;
      const sumOfDurations = videos.reduce(
        (acc, video) => acc + video.duration! || 0,
        0
      );
      const videoLabel =
        numberOfVideos > 1 || numberOfVideos === 0 ? "videos" : "video";

      return `(${numberOfVideos} ${videoLabel} - ${sumOfDurations} minutes)`;
    };

    return {
      getTitle,
      getSubtitle,
    };
  },
};
</script>

<template>
  <v-timeline side="end" density="comfortable" line-inset="12">
    <v-timeline-item
      v-for="[key, videos] in schedule"
      :key="key"
      size="x-small"
      dot-color="red-darken-1"
    >
      <v-row class="mb-2 align-center">
        <span class="text-h6"> {{ getTitle(key) }} </span>

        <span class="text-body-2 align-end ml-2">
          {{ getSubtitle(videos) }}
        </span>
      </v-row>

      <v-row no-gutters class="mb-4">
        <v-row v-if="videos.length === 0" class="my-10">
          <v-alert
            variant="outlined"
            color="red-lighten-3"
            title="No videos for this day."
            text="There's no videos to be watched on this day"
          />
        </v-row>

        <v-col v-for="video in videos" :key="video.id" cols="auto">
          <VideoCard :video="video" />
        </v-col>
      </v-row>
    </v-timeline-item>
  </v-timeline>
</template>
