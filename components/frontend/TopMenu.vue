<template>
    <div>
      <!-- Navbar -->
      <va-navbar class="py-4">
        <template #left>
          <nuxt-link to="/" class="text-2xl font-bold" >MyBrand</nuxt-link>
        </template>
  
        <template #right>
          <!-- Hamburger Icon for Mobile -->
          <div class="md:hidden">
            <va-button plain @click="toggleMenu">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16m-7 6h7" />
              </svg>
            </va-button>
          </div>
  
          <!-- Full Menu for Large Screens -->
          <div class="hidden md:flex space-x-4">
            <nuxt-link to="/" class="text-gray-700 hover:text-gray-900">Home</nuxt-link>
            <nuxt-link to="/blogs" class="text-gray-700 hover:text-gray-900">Blogs</nuxt-link>
            <a href="#" class="text-gray-700 hover:text-gray-900">About</a>
            <a href="#" class="text-gray-700 hover:text-gray-900">Contact</a>
          </div>
        </template>
      </va-navbar>
  
      <!-- Mobile Menu -->
      <div v-if="menuOpen" class="md:hidden bg-white shadow-lg rounded-lg p-4 space-y-4">
        <nuxt-link to="/" class="text-gray-700 hover:text-gray-900">Home</nuxt-link>
            <nuxt-link to="/blogs" class="text-gray-700 hover:text-gray-900">Blogs</nuxt-link>
        <a href="#" class="block text-gray-700 hover:text-gray-900">About</a>
        <a href="#" class="block text-gray-700 hover:text-gray-900">Contact</a>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref } from 'vue';
  
  const menuOpen = ref(false);
  
  const toggleMenu = () => {
    menuOpen.value = !menuOpen.value;
  };
  </script>
  
  <style scoped>
  /* Add any additional styling you need */
  </style>
  