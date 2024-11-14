import { App } from "vue";
import * as componentLoader from "@/utils/components-loader/reusable-components-loader";
import * as layoutLoader from "@/utils/components-loader/layouts-loader";

export function registerBaseComponents(app) {
  // common
  // app.component("BaseButton", componentLoader.BaseButton);
  // layouts
  // app.component("BaseAccountInfoCard", componentLoader.BaseAccountInfoCard);
  // icons
  // app.component("IconGridElements", componentLoader.GridElements);
}

export function registerLayouts(app) {
  // app.component("TheHeader", layoutLoader.TheHeader);
}
