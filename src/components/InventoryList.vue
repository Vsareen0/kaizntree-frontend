<template>
  <v-card flat>
    <v-card-title class="d-flex align-center pe-2">
      <CreateItem />

      <v-spacer></v-spacer>

      <v-text-field
        v-model="search"
        prepend-inner-icon="mdi-magnify"
        density="compact"
        label="Search By"
        single-line
        flat
        hide-details
        variant="solo-filled"
      ></v-text-field>
    </v-card-title>

    <v-divider></v-divider>
    <v-data-table v-model:search="search" :items="props.inventory">
      <!-- <v-skeleton-loader
        v-if="loadingItems"
        :loading="loadingItems"
        class="mx-auto border"
        type="table-tbody"
      ></v-skeleton-loader> -->

      <template v-slot:item.category="{ item }">
        <div class="text-center">
          {{ item.category.name }}
        </div>
      </template>

      <template v-slot:item.tags="{ item }">
        <div class="text-center">
          {{ item.tags.map((tag) => tag.name).join(",") }}
        </div>
      </template>

      <template v-slot:header.in_stock>
        <div class="text-center">In Stock</div>
      </template>

      <template v-slot:item.in_stock="{ item }">
        <div class="text-end">
          <v-chip
            :color="item.in_stock ? 'green' : 'red'"
            :text="item.in_stock ? 'In stock' : 'Out of stock'"
            class="text-uppercase"
            label
            size="small"
          >
          </v-chip>
          <v-badge
            :color="item.available_stock ? 'green' : 'red'"
            :content="item.in_stock"
            inline
          ></v-badge>
        </div>
      </template>

      <template v-slot:item.available_stock="{ item }">
        <div class="text-start">
          <v-chip
            :color="item.available_stock ? 'green' : 'red'"
            :text="item.available_stock ? 'In stock' : 'Out of stock'"
            class="text-uppercase"
            label
            size="small"
          >
          </v-chip>
          <v-badge
            :color="item.available_stock ? 'green' : 'red'"
            :content="item.available_stock"
            inline
          ></v-badge>
        </div>
      </template>
    </v-data-table>
  </v-card>
</template>
<script setup>
import CreateItem from "./CreateItem.vue";
import axios from "../plugins/axios";
import { ref } from "vue";
import { useInventoryStore } from "../store/inventory";

const props = defineProps(["inventory"]);
const search = ref("");
const inventoryStore = useInventoryStore();

Promise.all([getCategory(), getTags()]);

async function getCategory() {
  const response = await axios.get("/api/inventory/categories", {
    headers: {
      token: localStorage.getItem("token"),
    },
  });

  if (response.status === 200) {
    inventoryStore.storeCategories(response.data);
  } else {
    console.log("Unable to get categories: ", Request);
  }
}

async function getTags() {
  const response = await axios.get("/api/inventory/tags", {
    headers: {
      token: localStorage.getItem("token"),
    },
  });

  if (response.status === 200) {
    inventoryStore.storeTags(response.data);
  } else {
    console.log("Unable to get tags: ", Request);
  }
}
</script>