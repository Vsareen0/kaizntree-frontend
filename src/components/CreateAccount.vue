<template>
  <div class="flex flex-col justify-center items-center mt-6">
    <div class="flex">
      <img src="../assets/kaizntree-logo.webp" alt="kaizntree logo" />
      <h1 class="text-6xl font-serif font-semibold">Kaizntree</h1>
    </div>

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
        type="text"
        name="email"
        id="email"
        placeholder="email"
        v-model="email"
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
          @click="createAccount"
          class="transition duration-300 bg-gray-100 px-4 py-2 text-gray-800 text-sm tracking-wider rounded shadow-lg hover:bg-gray-200"
        >
          CREATE ACCOUNT
        </button>
        <button
          @click="moveToLogin"
          class="transition duration-300 bg-gray-100 px-4 py-2 text-gray-800 text-sm tracking-wider rounded shadow-lg hover:bg-gray-200"
        >
          LOG IN
        </button>
      </div>
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
const email = ref("");

const createAccount = async () => {
  try {
    const response = await axios.post("/api/create-account", {
      username: username.value,
      password: password.value,
      email: email.value,
    });
    if (response.status == 200) {
      router.push("/login");
    } else {
      console.log("Unable to create account !");
    }
  } catch (error) {
    console.error("account creation failed:", error);
  }
};

function moveToLogin() {
  router.push("/");
}
</script>