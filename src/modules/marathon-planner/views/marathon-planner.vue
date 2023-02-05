<script lang="ts">
import SearchBar from "./components/search-bar.vue";

import { useMarathonPlannerViewModel } from "../view-model";

export default {
  name: "marathon-planner",
  components: {
    SearchBar,
  },

  setup() {
    const { search, videos, loading } = useMarathonPlannerViewModel();

    return {
      videos,
      search,
      loading,
    };
  },
};
</script>

<template>
  <div>
    <div>
      <h1>Marathon Planner</h1>
      <SearchBar :search="search" />
      <p v-if="loading">Loading</p>

      <p>Total videos: {{ videos.length }}</p>

      <!-- <ul>
        <li v-for="video in videos" :key="video.id">
          {{ video.title }}
        </li>
      </ul> -->
    </div>
  </div>
</template>
