// src/store/auth.js
import { defineStore } from 'pinia';

export const useAuthStore = defineStore('auth', {
    state: () => ({
        user: null,
        isAuthenticated: false,
    }),
    actions: {
        setUser(user) {
            this.user = user;
            this.isAuthenticated = true;
        },
        setAuth(bool) {
            this.isAuthenticated = bool
        }
    },
});
