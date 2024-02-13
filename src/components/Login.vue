<template>
  <div class="flex flex-col space-y-4 mt-12">
    <input
      class="border border-gray-400 rounded px-2 py-1 focus:ring-0 focus:outline-none"
      type="text"
      name="username"
      id="username"
      placeholder="username"
      v-model="username"
      required
    />
    <input
      class="border border-gray-400 rounded px-2 py-1 focus:ring-0 focus:outline-none"
      type="password"
      name="password"
      id="password"
      placeholder="password"
      v-model="password"
      required
    />
    <div class="flex justify-between space-x-4">
      <button
        class="transition duration-300 bg-gray-100 px-4 py-2 text-gray-800 text-sm tracking-wider rounded shadow-lg hover:bg-gray-200"
        @click="moveToCreateAccount"
      >
        CREATE ACCOUNT
      </button>
      <button
        @click="login"
        class="transition duration-300 bg-gray-100 px-4 py-2 text-gray-800 text-sm tracking-wider rounded shadow-lg hover:bg-gray-200"
      >
        LOG IN
      </button>
    </div>
  </div>
</template>
<script setup>
import { ref } from "vue";
import axios from "../plugins/axios";
import { useAuthStore } from "../store/auth";
import router from "../router";

const username = ref("");
const password = ref("");
const authStore = useAuthStore();

const login = async () => {
  try {
    const response = await axios.post("/api/login", {
      username: username.value,
      password: password.value,
    });
    console.log(response);
    if (response.status == 200) {
      authStore.setUser(response.data.user);
      localStorage.setItem("token", response.data.token);
      router.push("/dashboard");
    } else {
      console.log("Unable to login !");
    }
  } catch (error) {
    console.error("Login failed:", error);
  }
};

function moveToCreateAccount() {
  router.push("/create-account");
}
</script>