<script lang="ts">
import { VCol, VRow } from "vuetify/components";

export default {
  name: "app-header",
  components: {
    VRow,
    VCol,
  },
};
</script>

<template>
  <v-row class="py-4">
    <v-col cols="12" align="center">
      <h1 class="text-red-darken-1">Marathon Planner</h1>
      <p>
        We help you to plan your YouTube marathon schedule as efficient as
        possible.
      </p>
    </v-col>
  </v-row>
</template>
