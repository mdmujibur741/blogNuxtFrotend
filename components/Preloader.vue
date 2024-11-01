<!-- components/Preloader.vue -->
<template>
    <div v-if="isLoading" class="preloader">
      <VaProgressCircle
        size="50"
        thickness="4"
        color="primary"
        indeterminate
      />
    </div>
  </template>
  
  <script setup>
  import { computed } from 'vue';
  import { useNuxtApp } from '#app';
  import { VaProgressCircle } from 'vuestic-ui';
  
  const { $loading } = useNuxtApp();
  const isLoading = computed(() => $loading.value);
  </script>
  
  <style scoped>
  .preloader {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: rgba(255, 255, 255, 0.9);
    z-index: 1000;
  }
  </style>
  