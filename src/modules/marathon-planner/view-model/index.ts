import { ref } from "vue";

import { IVideo } from "@/interfaces";
import { MarathonPlannerDomain } from "../domain";

export const useMarathonPlannerViewModel = () => {
  const domain = new MarathonPlannerDomain();

  let videos = ref([] as IVideo[]);
  let loading = ref(false);

  const search = async (query: string) => {
    loading.value = true;
    const cleanQuery = query.trim();
    const results = await domain.search(cleanQuery);

    videos.value = results;
    loading.value = false;
  };

  return {
    videos,
    search,
    loading,
  };
};
