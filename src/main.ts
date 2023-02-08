import { createApp } from "vue";
import { MarathonPlanner } from "./modules";
import { createVuetify } from "vuetify";

import "vuetify/styles";
import "@/styles/index.css";

const vuetify = createVuetify();

createApp(MarathonPlanner).use(vuetify).mount("#app");
