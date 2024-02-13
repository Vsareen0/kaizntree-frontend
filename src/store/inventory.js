// src/store/auth.js
import { defineStore } from 'pinia';

export const useInventoryStore = defineStore('inventory', {
    state: () => ({
        inventory: [],
        itemsCount: 0,
        categories: [],
        tags: []
    }),
    actions: {
        setInventory(data) {
            this.inventory = data.results;
            this.itemsCount = data.count;
        },
        addNewItem(item) {
            this.inventory.push(item);
        },
        storeCategories(data) {
            this.categories = data.results;
        },
        storeTags(data) {
            this.tags = data.results;
        },
        addNewCategory(data) {
            this.categories.push(data);
        }
    },
});
