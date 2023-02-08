<script lang="ts">
import { IAvailability } from "@/interfaces";
import { computed, PropType } from "vue";
import { VRow, VCol } from "vuetify/components";

export default {
  name: "availability-list",
  props: {
    availability: {
      type: Object as PropType<IAvailability | null>,
      required: true,
    },
  },

  setup(props) {
    const mountDayLabel = (day: string) =>
      day.charAt(0).toUpperCase() + day.slice(1);

    const mountMinutesLabel = (minutes: number) => {
      if (minutes < 60) {
        return `${minutes} minute${minutes > 1 ? "s" : ""}`;
      }

      const hours = minutes / 60;
      return `${hours} hour${hours > 1 ? "s" : ""}`;
    };

    const availabilityList = computed(() => {
      if (!props.availability) return [];

      return Object.entries(props.availability).map(([key, minutes]) => {
        return {
          day: mountDayLabel(key),
          minutes: mountMinutesLabel(minutes),
        };
      });
    });

    return {
      availabilityList,
    };
  },
};
</script>

<template>
  <v-sheet class="pa-6 mt-1" rounded="lg">
    <v-row no-gutters>
      <v-col>
        <h2 class="text-subtitle-1">Your current availability:</h2>

        <v-timeline direction="horizontal" side="end">
          <v-timeline-item
            v-for="(day, index) in availabilityList"
            :key="index"
            hide-dot
          >
            <template v-slot:opposite>
              <span class="text-subtitle-1">{{ day.day }}</span>
            </template>

            <span class="text-subtitle-2">{{ day.minutes }}</span>
          </v-timeline-item>
        </v-timeline>
      </v-col>
    </v-row>
  </v-sheet>
</template>
