<template>
  <v-dialog v-model="dialog" persistent width="1024">
    <template v-slot:activator="{ props }">
      <v-btn color="success" v-bind="props"> NEW ITEM </v-btn>
    </template>
    <v-card>
      <v-card-title>
        <span class="text-h5">Add New Item</span>
      </v-card-title>
      <v-card-text>
        <v-container>
          <v-row>
            <v-col cols="12" sm="6" md="6">
              <v-text-field
                label="SKU*"
                v-model="sku"
                required
                :rules="[required]"
              ></v-text-field>
            </v-col>
            <v-col cols="12" sm="6" md="6">
              <v-text-field
                label="Name*"
                v-model="name"
                hint="Enter Name of item"
                :rules="[required]"
              ></v-text-field>
            </v-col>
            <v-col cols="12">
              <v-text-field
                label="In Stock*"
                v-model="in_stock"
                :rules="[required]"
              ></v-text-field>
            </v-col>
            <v-col cols="12">
              <v-text-field
                label="Available Stock*"
                type="Available Stock"
                v-model="available_stock"
                :rules="[required]"
              ></v-text-field>
            </v-col>
            <v-col cols="12" sm="6">
              <v-select
                :items="inventoryStore.categories"
                item-title="name"
                label="Category"
                v-model="category"
                :rules="[required]"
                item-value="id"
              >
                <template v-slot:item="{ props, item }">
                  <v-list-item
                    v-bind="props"
                    :subtitle="item.raw.name"
                  ></v-list-item> </template
              ></v-select>
            </v-col>
            <v-col cols="12" sm="6">
              <v-autocomplete
                :items="inventoryStore.tags"
                item-title="name"
                label="Tags*"
                v-model="tags"
                multiple
                :rules="[required]"
                item-value="id"
              >
                <template v-slot:item="{ props, item }">
                  <v-list-item
                    v-bind="props"
                    :subtitle="item.raw.name"
                  ></v-list-item>
                </template>
              </v-autocomplete>
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
        <v-btn color="blue-darken-1" variant="text" @click="createItem">
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

const sku = ref("");
const name = ref("");
const available_stock = ref("");
const in_stock = ref("");
const category = ref("");
const tags = ref([]);

function required(v) {
  return !!v || "Field is required";
}

function categoryItemProps(item) {
  return {
    id: item.id,
    name: item.name,
  };
}

async function createItem() {
  let data = {
    sku: sku.value,
    name: name.value,
    available_stock: available_stock.value,
    in_stock: in_stock.value,
    category: category.value,
    tags: tags.value,
  };

  console.log("data: ", data);

  const response = await axios.post("/api/inventory/add", data, {
    headers: {
      token: localStorage.getItem("token"),
    },
  });

  if (response.status === 200) {
    const { data } = response.data;
    inventoryStore.addNewItem(data);
    dialog.value = false;
  } else {
    console.log("Unable to store item: ", response);
  }
}
</script>