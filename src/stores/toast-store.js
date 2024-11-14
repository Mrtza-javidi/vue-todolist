import { defineStore } from "pinia";

export const useToastStore = defineStore("toast", {
  state: () => ({
    message: "",
    type: "error",
    visible: false,
  }),
  actions: {
    showToast(message, type = "error") {
      this.message = message;
      this.type = type;
      this.visible = true;

      setTimeout(() => {
        this.visible = false;
      }, 3000);
    },
  },
});
