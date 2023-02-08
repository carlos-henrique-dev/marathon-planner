<script lang="ts">
import {
  VBtn,
  VCard,
  VCardSubtitle,
  VCardText,
  VCardTitle,
  VCol,
  VList,
  VListItem,
  VListItemSubtitle,
  VListItemTitle,
  VProgressCircular,
  VRow,
  VSheet,
} from "vuetify/components";
import { IWordStatistics } from "../../interfaces";

export default {
  name: "statistics",
  components: {
    VCard,
    VCardText,
    VCardTitle,
    VSheet,
    VBtn,
    VRow,
    VCol,
    VProgressCircular,
    VList,
    VListItem,
	VCardSubtitle,
	VListItemTitle,
	VListItemSubtitle,
  },
  props: {
    title: {
      type: String,
      required: true,
    },
    words: {
      type: Array<IWordStatistics>,
      required: true,
    },
  },

  setup() {
    const getOrdinalSuffix = (i: number) => {
      const suffixOptions = {
        1: "st",
        2: "nd",
        3: "rd",
      };

      return suffixOptions[i as keyof typeof suffixOptions] || "th";
    };

    return {
      getOrdinalSuffix,
    };
  },
};
</script>

<template>
  <v-card rounded="lg" class="my-4 elevation-10">
    <v-card-title>
      <span class="headline mb-0">{{ title }}</span>
    </v-card-title>

    <v-card-subtitle>
      Words smaller than 3 characters are not included.
    </v-card-subtitle>

    <v-list>
      <v-list-item v-for="(word, index) in words" :key="word.word">
        <v-row>
          <v-col cols="2">
            <v-list-item-title>
              <span class="text-subtitle-1 ma-0">{{ index + 1 }}</span>
              <span class="text-caption ma-0">
                {{ getOrdinalSuffix(index + 1) }}
              </span>
            </v-list-item-title>
          </v-col>

          <v-col>
            <v-list-item-title class="align-center">
              {{ word.word }}
            </v-list-item-title>
          </v-col>

          <v-col cols="3">
            <v-list-item-subtitle>
              {{ word.count }} times
            </v-list-item-subtitle>
          </v-col>
        </v-row>
      </v-list-item>
    </v-list>
  </v-card>
</template>
