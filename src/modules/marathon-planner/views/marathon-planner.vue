<script lang="ts">
import {
  VApp,
  VCol,
  VContainer,
  VDivider,
  VMain,
  VRow,
  VSheet,
} from "vuetify/components";
import {
  SearchBar,
  Availability,
  AppHeader,
  WordsStatistics,
  Schedule,
  InvalidVideos,
} from "./components";

import { useMarathonPlannerViewModel } from "../view-model";

export default {
  name: "marathon-planner",
  components: {
    VApp,
    VMain,
    VContainer,
    VSheet,
    VRow,
    VCol,
    AppHeader,
    SearchBar,
    Availability,
    VDivider,
    WordsStatistics,
    Schedule,
    InvalidVideos,
  },

  setup() {
    const {
      videos,
      loading,
      mostUsedWordsInDescriptions,
      mostUsedWordsInTItles,
      userAvailability,
      userWatchSchedule,
      search,
      saveAvailability,
    } = useMarathonPlannerViewModel();

    return {
      videos,
      loading,
      mostUsedWordsInDescriptions,
      mostUsedWordsInTItles,
      userAvailability,
      userWatchSchedule,
      search,
      saveAvailability,
    };
  },
};
</script>

<template>
  <v-app>
    <v-main class="bg-grey-lighten-5">
      <v-container class="px-10">
        <AppHeader />

        <SearchBar :search="search" :loading="loading" />

        <Availability
          :saveAvailability="saveAvailability"
          :availability="userAvailability"
        />

        <v-row v-if="videos.length > 0">
          <v-col>
            <WordsStatistics
              title="Top 5 Most Used Words in Titles"
              :words="mostUsedWordsInTItles"
            />
          </v-col>

          <v-col>
            <WordsStatistics
              title="Top 5 Most Used Words in Descriptions"
              :words="mostUsedWordsInDescriptions"
            />
          </v-col>
        </v-row>

        <Schedule
          v-if="userWatchSchedule"
          :userWatchSchedule="userWatchSchedule"
          :loading="loading"
        />

        <InvalidVideos
          v-if="userWatchSchedule"
          :userWatchSchedule="userWatchSchedule"
          :loading="loading"
        />
      </v-container>
    </v-main>
  </v-app>
</template>
