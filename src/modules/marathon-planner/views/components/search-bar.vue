<script lang="ts">
import { ref } from "vue";

export default {
  name: "search-bar",
  props: {
    search: {
      type: Function,
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
  <div>
    <div>
      <form @submit.prevent="search">
        <input
          type="text"
          placeholder="Search for YouTube videos..."
          v-model="query"
        />
        <button type="submit">Search</button>
      </form>
    </div>
  </div>
</template>
