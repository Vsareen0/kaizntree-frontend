<template>
  <div class="flex flex-col justify-center items-center mt-6">
    <div class="flex">
      <img src="../assets/kaizntree-logo.webp" alt="kaizntree logo" />
      <h1 class="text-6xl font-serif font-semibold">Kaizntree</h1>
    </div>
    <div v-if="authStore.isAuthenticated">
      <div>Welcome, {{ authStore.user.username }} !</div>
      <div class="space-x-6 mt-6">
        <RouterLink to="/dashboard">
          <button
            class="transition duration-300 bg-gray-100 px-4 py-2 text-gray-800 text-sm tracking-wider rounded shadow-lg hover:bg-gray-200"
          >
            DASHBOARD
          </button>
        </RouterLink>

        <button
          @click="logout"
          class="transition duration-300 bg-gray-100 px-4 py-2 text-gray-800 text-sm tracking-wider rounded shadow-lg hover:bg-gray-200"
        >
          LOGOUT
        </button>
      </div>
    </div>
    <div v-else>
      <Login />
    </div>
  </div>
</template>

<script setup>
import Login from "../components/Login.vue";
import axios from "../plugins/axios";
import { ref } from "vue";
import { RouterLink } from "vue-router";
import { useAuthStore } from "../store/auth";
import router from "../router";

const authStore = useAuthStore();
checkSession();

async function checkSession() {
  if (localStorage.getItem("token")) {
    const response = await axios.get("/api/check_auth", {
      headers: {
        token: localStorage.getItem("token"),
      },
    });

    if (response.status === 200) {
      authStore.setUser(response.data.user);
    } else {
      authStore.setAuth(false);
    }
  }
}

function logout() {
  localStorage.removeItem("token");
  router.push("/");
}
</script>
