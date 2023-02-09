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
  <v-sheet class="pa-1 mt-1" rounded="lg">
    <v-row no-gutters>
      <v-col>
        <h2 class="text-subtitle-1">Your current availability:</h2>

        <v-row class="ma-0 pa-0 align-center justify-start">
          <v-col
            v-for="(day, index) in availabilityList"
            :key="index"
            xs="5"
            sm="5"
            md="1"
            xl="1"
            lg="1"
            class="ma-2 pa-2 elevation-1 rounded-lg"
          >
            <p class="text-subtitle-2">{{ day.day }}</p>
            <p class="text-body-2 text-grey">{{ day.minutes }}</p>
          </v-col>
        </v-row>
      </v-col>
    </v-row>
  </v-sheet>
</template>
