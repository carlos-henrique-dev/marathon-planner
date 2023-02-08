<script lang="ts">
import { IWatchSchedule } from "../../interfaces";
import { VCol, VRow, VSheet } from "vuetify/components";
import { PropType } from "vue";
import { VideoCard } from "@/components";
export default {
  name: "invalid-videos",
  components: {
    VCol,
    VRow,
    VSheet,
    VideoCard,
  },
  props: {
    userWatchSchedule: {
      type: Object as PropType<IWatchSchedule | null>,
      required: true,
    },
    loading: {
      type: Boolean,
      required: true,
    },
  },
};
</script>

<template>
  <v-sheet
    rounded="lg"
    class="my-6 pa-6 elevation-10"
    v-if="
      userWatchSchedule &&
      userWatchSchedule.videosLongerThanAvailableTime.length > 0
    "
  >
    <v-row class="mb-6">
      <v-col>
        <p class="text-h6">Invalid videos</p>

        <p class="text-subtitle-2">
          The following videos were ignored and not included on your scheduled
          because they exceeds your maximum time available.
        </p>
      </v-col>
    </v-row>

    <v-row no-gutters>
      <v-col
        v-for="video in userWatchSchedule.videosLongerThanAvailableTime"
        :key="video.id"
        cols="auto"
      >
        <VideoCard :video="video" />
      </v-col>
    </v-row>
  </v-sheet>
</template>
