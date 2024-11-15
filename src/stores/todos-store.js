import { defineStore } from "pinia";
import axiosInstance from "../services/axios/axios-config";

export const useTodosStore = defineStore("todos", {
  state: () => ({
    todos: [],
    id: 15,
  }),

  actions: {
    async getTodos() {
      const res = await axiosInstance.get("/todos");

      if (res) {
        this.todos = res;
      }
    },

    async addNewTodo(item) {
      const res = await axiosInstance.post("/todos", item);
      this.getTodos();
    },

    async deleteTodo(id) {
      const res = await axiosInstance.delete(`/todos/${id}`);
      this.getTodos();
    },

    async editTodo(id, item) {
      const res = await axiosInstance.put(`/todos/${id}`, item);
      this.getTodos();
    },
  },

  getters: {},
});
