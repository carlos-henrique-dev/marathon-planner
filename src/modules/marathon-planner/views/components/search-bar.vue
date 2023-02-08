<script lang="ts">
import { ref } from "vue";

import {
  VBtn,
  VCol,
  VProgressCircular,
  VProgressLinear,
  VTextField,
  VSheet,
  VRow,
} from "vuetify/components";

export default {
  name: "search-bar",
  components: {
    VSheet,
    VBtn,
    VRow,
    VCol,
    VProgressCircular,
    VProgressLinear,
    VTextField,
  },
  props: {
    search: {
      type: Function,
      required: true,
    },
    loading: {
      type: Boolean,
      required: true,
    },
  },
  setup(props) {
    const query = ref("");

    const search = () => {
      props.search(query.value);
    };

    return {
      query,
      search,
    };
  },
};
</script>

<template>
  <v-sheet rounded="lg" class="my-6 elevation-10">
    <form @submit.prevent="search">
      <v-row no-gutters class="search-bar">
        <v-col>
          <v-text-field
            type="text"
            placeholder="Search for YouTube videos..."
            v-model="query"
            class="search-input text-h6"
            :disabled="loading"
            :loading="loading"
            variant="solo"
          >
            <template v-slot:loader>
              <v-progress-linear
                :active="loading"
                color="red"
                height="7"
                indeterminate
                class="search-input-loader"
              ></v-progress-linear>
            </template>
          </v-text-field>
        </v-col>

        <v-col cols="3" md="2" lg="2" xl="2">
          <v-btn
            variant="tonal"
            type="submit"
            class="search-btn bg-red-darken-1 text-h6"
            :disabled="loading"
          >
            <span v-if="!loading">Search</span>
            <v-progress-circular v-else indeterminate width="2" />
          </v-btn>
        </v-col>
      </v-row>
    </form>
  </v-sheet>
</template>

<style scoped>
.search-bar {
  border-radius: 8px;
  overflow: hidden;
}
.search-bar .search-input {
  width: 100%;
  height: 60px;
}

.search-input-loader {
  height: 60px;
}

.search-bar .search-input:disabled {
  color: var(--deep-orange-accent-4);
}

.search-bar .search-btn {
  width: 100%;
  height: 60px;
  border-radius: 0;
  border-top-right-radius: 8px;
  border-bottom-right-radius: 8px;
}
</style>
