import { createApp } from "vue";
import { createPinia } from "pinia";

import App from "./App.vue";
// import router from "@/router/index.js";
import { registerBaseComponents } from "@/plugins/global-reusable-components";
import { registerLayouts } from "@/plugins/global-reusable-components";

const app = createApp(App);
const pinia = createPinia();

registerBaseComponents(app);
registerLayouts(app);

app.use(pinia);
app.use(router);

app.mount("#app");
