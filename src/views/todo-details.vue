<template>
  <v-container class="py-4" v-if="todo">
    <v-card class="mx-auto my-4" max-width="600">
      <v-card-title>
        <v-btn icon @click="goBack">
          <v-icon>mdi-arrow-left</v-icon>
          <span></span>
        </v-btn>
        <v-spacer></v-spacer>
        <span class="text-h5">{{ todo.title }}</span>
        <!-- <v-btn color="primary" @click="editTodo">
          <v-icon class="me-2">mdi-pencil</v-icon>
          Edit
        </v-btn> -->
      </v-card-title>

      <v-card-text>
        <v-divider class="my-4"></v-divider>
        <v-row>
          <v-col cols="12" class="text-caption">
            <strong>ID:</strong> <span class="ml-2"> {{ todo.id }} </span>
          </v-col>
          <v-col cols="12" class="text-caption">
            <strong>Created Date:</strong>
            <span class="ml-2">{{
              convertToPersianDate(todo.createdDate)
            }}</span>
          </v-col>
          <v-col cols="12" class="text-caption">
            <strong>Status:</strong>
            <v-chip
              class="ml-2"
              :color="todo.status === 'completed' ? 'success' : 'error'"
              dark
            >
              {{ todo.status === "completed" ? "Completed" : "Pending" }}
            </v-chip>
          </v-col>
        </v-row>
      </v-card-text>

      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="error" @click="deleteTodo">
          <v-icon class="me-2">mdi-delete</v-icon>
          Delete
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-container>

  <!-- Loading Spinner while data is being fetched -->
  <v-container v-else>
    <v-row justify="center">
      <v-col cols="auto">
        <v-progress-circular
          indeterminate
          color="primary"
        ></v-progress-circular>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useTodosStore } from "@/stores/todos-store";
import { convertToPersianDate } from "../utils/date-formatter";

const router = useRouter();
const route = useRoute();
const todosStore = useTodosStore();

const todo = ref(null);

onMounted(async () => {
  const todoId = route.params.id;
  todo.value = await todosStore.todos.find((t) => t.id === todoId);
  if (!todo.value) {
    alert("Todo not found!");
    router.push("/");
  }
});

function goBack() {
  router.push("/");
}

function editTodo() {
  alert("Edit functionality coming soon!");
}

function deleteTodo() {
  if (confirm("Are you sure you want to delete this todo?")) {
    todosStore.deleteTodo(Number(todo.value.id));
    router.push("/");
  }
}
</script>

<style scoped>
.v-card-title {
  display: flex;
  align-items: center;
}
</style>
