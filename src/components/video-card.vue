<script lang="ts">
import { IVideo } from "@/interfaces";
import { computed, PropType } from "vue";
import { VCard, VRow, VAvatar, VImg } from "vuetify/components";

export default {
  name: "video-card",
  props: {
    video: {
      type: Object as PropType<IVideo>,
      required: true,
    },
  },

  setup(props) {
    const videoURL = computed(() => {
      return import.meta.env.VITE_YOUTUBE_WATCH_URL + props.video.id;
    });

    return {
      videoURL,
    };
  },
};
</script>

<template>
  <a :href="videoURL" target="_blank" :style="{ textDecoration: 'none' }">
    <v-card class="mx-2 my-1 elevation-10 rounded-lg" width="190" height="170">
      <v-row :style="{ width: '190px' }" class="ma-0">
        <v-avatar size="190" rounded="0" :style="{ height: '90px' }">
          <v-img
            :style="{ height: '90px' }"
            :src="video.thumbnail"
            cover
            aspect-ratio="16/9"
            width="190"
          />
        </v-avatar>
      </v-row>

      <v-row class="ma-0 px-2 py-1">
        <div
          :style="{
            overflow: 'hidden',
            'text-overflow': 'ellipsis',
            display: '-webkit-box',
            '-webkit-line-clamp': 2,
            '-webkit-box-orient': 'vertical',
          }"
          :title="video.title"
        >
          {{ video.title }}
        </div>
      </v-row>

      <v-row class="ma-0 px-2 py-1">
        <span class="text-caption">{{ video.duration }} minutes</span>
      </v-row>
    </v-card>
  </a>
</template>
