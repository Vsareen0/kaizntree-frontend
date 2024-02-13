<template>
  <v-dialog v-model="dialog" persistent width="1024">
    <template v-slot:activator="{ props }">
      <v-btn color="success" v-bind="props"> NEW ITEM CATEGORY </v-btn>
    </template>
    <v-card>
      <v-card-title>
        <span class="text-h5">Add New Item Category</span>
      </v-card-title>
      <v-card-text>
        <v-container>
          <v-row>
            <v-col cols="12" sm="6" md="6">
              <v-text-field
                label="Name*"
                v-model="name"
                required
                :rules="[required]"
              ></v-text-field>
            </v-col>
          </v-row>
        </v-container>
        <small>*indicates required field</small>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="blue-darken-1" variant="text" @click="dialog = false">
          Close
        </v-btn>
        <v-btn color="blue-darken-1" variant="text" @click="createCategory">
          Save
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>
<script setup>
import axios from "../plugins/axios";
import { useInventoryStore } from "../store/inventory";
import { ref } from "vue";

const dialog = ref(false);
const inventoryStore = useInventoryStore();

const name = ref("");

function required(v) {
  return !!v || "Field is required";
}

async function createCategory() {
  let data = {
    name: name.value,
  };

  const response = await axios.post("/api/inventory/category", data, {
    headers: {
      token: localStorage.getItem("token"),
    },
  });

  if (response.status === 200) {
    const { data } = response.data;
    inventoryStore.addNewCategory(data);
    dialog.value = false;
  } else {
    console.log("Unable to store category: ", response);
  }
}
</script>