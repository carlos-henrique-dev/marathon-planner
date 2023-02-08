<script lang="ts">
import { IWatchSchedule } from "../../../interfaces";
import {
  VAlert,
  VBtn,
  VCard,
  VCol,
  VDialog,
  VRow,
  VSheet,
  VSpacer,
  VTimeline,
  VTimelineItem,
  VToolbar,
} from "vuetify/components";
import { computed, PropType, ref } from "vue";
import { VideoCard } from "@/components";
import Timeline from "./timeline.vue";

export default {
  name: "schedule",
  components: {
    VAlert,
    VBtn,
    VCard,
    VCol,
    VDialog,
    VRow,
    VSheet,
    VSpacer,
    VTimeline,
    VTimelineItem,
    VToolbar,
    VideoCard,
    Timeline,
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

  setup(props) {
    const showFullSchedule = ref(false);

    const toggleFullSchedule = () => {
      showFullSchedule.value = !showFullSchedule.value;
    };

    const getFirstDaysOfSchedule = computed(() => {
      if (!props.userWatchSchedule) return [];
      return Object.entries(props.userWatchSchedule.schedule).slice(0, 3);
    });

    const getFullSchedule = computed(() => {
      if (!props.userWatchSchedule) return [];
      return Object.entries(props.userWatchSchedule.schedule);
    });

    const getSubtitle = computed(() => {
      if (!props.userWatchSchedule) return "";

      const { days } = props.userWatchSchedule;
      const dayLabel = days > 1 || days === 0 ? "days" : "day";
      return `Here's your schedule for the next ${days} ${dayLabel}`;
    });

    return {
      toggleFullSchedule,
      showFullSchedule,
      getFirstDaysOfSchedule,
      getFullSchedule,
      getSubtitle,
    };
  },
};
</script>

<template>
  <v-sheet rounded="lg" class="my-6 pa-6 elevation-10" v-if="userWatchSchedule">
    <v-row class="mb-6">
      <v-col>
        <p class="text-h6">Schedule</p>

        <p class="text-subtitle-2">
          {{ getSubtitle }}
        </p>
      </v-col>
    </v-row>

    <Timeline :schedule="getFirstDaysOfSchedule" />

    <v-row class="justify-center mt-2">
      <v-btn
        color="red-darken-1"
        @click="toggleFullSchedule"
        :loading="loading"
        :disabled="loading"
      >
        {{ showFullSchedule ? "Hide" : "Show" }} full schedule
      </v-btn>
    </v-row>

    <v-dialog v-model="showFullSchedule" scrollable>
      <v-card rounded="lg" :style="{ padding: '80px 0' }">
        <v-toolbar
          rounded="lg"
          title="Schedule"
          absolute
          class="w-100 bg-white elevation-10"
          :style="{ 'z-index': 1, position: 'fixed', top: 0 }"
        >
          <v-btn color="red-darken-1" @click="toggleFullSchedule">
            Close
          </v-btn>
        </v-toolbar>

        <v-spacer />

        <Timeline :schedule="getFullSchedule" />
      </v-card>
    </v-dialog>
  </v-sheet>
</template>
