import { defineAsyncComponent } from "vue";

export const loadComponent = (componentName) =>
  defineAsyncComponent(() => import(`@/layouts/${componentName}.vue`));

// export const TheHeader = loadComponent("the-header");
