import { ref, watch } from "vue";

import { IAvailability, IVideo } from "@/interfaces";
import { MarathonPlannerDomain } from "../domain";
import { IWatchSchedule } from "../interfaces/watch-schedule";
import { IWordStatistics } from "../interfaces";

export const useMarathonPlannerViewModel = () => {
  const domain = new MarathonPlannerDomain();

  const videos = ref<IVideo[]>([]);
  const loading = ref(false);
  const mostUsedWordsInTItles = ref<IWordStatistics[]>([]);
  const mostUsedWordsInDescriptions = ref<IWordStatistics[]>([]);
  const userAvailability = ref<IAvailability | null>({
    sunday: 60,
    monday: 60,
    tuesday: 60,
    wednesday: 60,
    thursday: 60,
    friday: 60,
    saturday: 60,
  });

  const userWatchSchedule = ref<IWatchSchedule | null>(null);

  const search = async (query: string) => {
    loading.value = true;
    const cleanQuery = query.trim();
    const results = await domain.search(cleanQuery);

    videos.value = results;
    loading.value = false;
  };

  const saveAvailability = (data: IAvailability) => {
    userAvailability.value = domain.saveAvailability(data);
  };

  watch(videos, (videos) => {
    const titles = videos.map((video) => video.title);
    const descriptions = videos.map((video) => video.description);

    mostUsedWordsInTItles.value = domain.findMostUsedWordsInTitles(titles);
    mostUsedWordsInDescriptions.value =
      domain.findMostUsedWordsInDescriptions(descriptions);
  });

  watch([userAvailability, videos], ([availability, videos]) => {
    if (availability && videos.length > 0) {
      userWatchSchedule.value = domain.getSchedule(availability, videos);
    } else {
      userWatchSchedule.value = null;
    }
  });

  return {
    videos,
    loading,
    mostUsedWordsInDescriptions,
    mostUsedWordsInTItles,
    userAvailability,
    userWatchSchedule,
    search,
    saveAvailability,
  };
};
