<template>
  <v-data-table
    :headers="headers"
    :items="displayTodos"
    :sort-by="[{ key: 'status', order: 'desc' }]"
  >
    <template v-slot:item.title="{ item }">
      <span @click="navigateToDetails(item.id)" style="cursor: pointer">
        {{ item.title }}
      </span>
    </template>
    <template v-slot:top>
      <v-toolbar flat>
        <v-toolbar-title>Todo List</v-toolbar-title>
        <v-divider class="mx-4" inset vertical></v-divider>
        <v-spacer></v-spacer>
        <v-dialog v-model="dialog" max-width="500px">
          <template v-slot:activator="{ props }">
            <v-btn class="mb-2" color="primary" dark v-bind="props">
              New Item
            </v-btn>
          </template>
          <v-card>
            <v-card-title>
              <span class="text-h5">{{ formTitle }}</span>
            </v-card-title>

            <v-card-text>
              <v-container>
                <v-row>
                  <v-col cols="12">
                    <v-text-field
                      v-model="editedItem.title"
                      label="Title"
                    ></v-text-field>
                  </v-col>
                </v-row>
              </v-container>
            </v-card-text>

            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="blue-darken-1" variant="text" @click="close">
                Cancel
              </v-btn>
              <v-btn color="blue-darken-1" variant="text" @click="save">
                Save
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
        <v-dialog v-model="dialogDelete" max-width="500px">
          <v-card>
            <v-card-title class="text-h5"
              >Are you sure you want to delete this item?</v-card-title
            >
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="blue-darken-1" variant="text" @click="closeDelete"
                >Cancel</v-btn
              >
              <v-btn
                color="blue-darken-1"
                variant="text"
                @click="deleteItemConfirm"
                >OK</v-btn
              >
              <v-spacer></v-spacer>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-toolbar>
    </template>
    <template v-slot:item.actions="{ item }">
      <v-icon class="me-2" size="small" @click="editItem(item)">
        mdi-pencil
      </v-icon>
      <v-icon size="small" @click="deleteItem(item)"> mdi-delete </v-icon>
    </template>
    <template v-slot:no-data>
      <v-btn color="primary" @click="initialize"> Reset </v-btn>
    </template>
  </v-data-table>
</template>

<script setup>
import { ref, computed, onMounted, watch, onUpdated } from "vue";
import { useRouter } from "vue-router";
import { useTodosStore } from "../stores/todos-store";
import { createdDate, convertToPersianDate } from "../utils/date-formatter";

const router = useRouter();
const todosStore = useTodosStore();

const dialog = ref(false);
const dialogDelete = ref(false);
const headers = [
  { title: "Title", key: "title" },
  { title: "Created Date", key: "createdDate" },
  { title: "Status", key: "status" },
  { title: "Actions", key: "actions", sortable: false },
];
const editedIndex = ref(-1);
const editedItem = ref({
  id: todosStore.id++,
  title: "",
  createdDate: createdDate(),
  status: "completed",
});
const defaultItem = {
  id: todosStore.id++,
  title: "",
  createdDate: createdDate(),
  status: "completed",
};

const formTitle = computed(() =>
  editedIndex.value === -1 ? "New Todo" : "Edit Todo"
);

const todos = ref([]);

const displayTodos = computed(() => {
  return todos.value.map((todo) => {
    const isoDate = todo.createdDate;
    const validDate =
      isoDate && !isNaN(new Date(isoDate)) ? new Date(isoDate) : new Date();
    return {
      ...todo,
      createdDate: convertToPersianDate(validDate),
    };
  });
});

onMounted(async () => {
  await todosStore.getTodos();
  todos.value = todosStore.todos;
});

watch(
  () => todosStore.todos,
  (newTodos) => {
    todos.value = [...newTodos];
  },
  { immediate: true }
);

watch(dialog, (val) => {
  if (!val) close();
});
watch(dialogDelete, (val) => {
  if (!val) closeDelete();
});

function editItem(item) {
  editedIndex.value = displayTodos.value.findIndex(
    (todo) => todo.id === item.id
  );
  editedItem.value = { ...item };
  dialog.value = true;
}

function deleteItem(item) {
  editedIndex.value = displayTodos.value.findIndex(
    (todo) => todo.id === item.id
  );
  editedItem.value = { ...item };
  dialogDelete.value = true;
}

function deleteItemConfirm() {
  if (editedIndex.value > -1) {
    todosStore.deleteTodo(Number(editedItem.value.id));
  }
  closeDelete();
}

function close() {
  dialog.value = false;
  resetEditedItem();
}

function closeDelete() {
  dialogDelete.value = false;
  resetEditedItem();
}

function save() {
  if (editedIndex.value > -1) {
    // Update existing item
    Object.assign(
      todosStore.editTodo(Number(editedItem.value.id), editedItem.value)
    );
  } else {
    // Add new item
    todosStore.addNewTodo(editedItem.value);
  }
  close();
}

function resetEditedItem() {
  editedItem.value = { ...defaultItem };
  editedIndex.value = -1;
}

function navigateToDetails(id) {
  router.push({ name: "TodoDetails", params: { id } });
}
</script>
