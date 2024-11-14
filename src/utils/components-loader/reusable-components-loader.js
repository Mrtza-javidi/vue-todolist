import { defineAsyncComponent } from "vue";

export const loadComponent = (folder, componentName) =>
  defineAsyncComponent(() =>
    import(`@/components/${folder}/${componentName}.vue`)
  );

// commons
// export const BaseButton = loadComponent("common", "base-button");

//layouts

// icons
