<template>
  <AppLayout>


  </AppLayout>
</template>

<script setup>
import AppLayout from '~/layouts/AppLayout.vue';
import auth from '~/middleware/auth';
 

 definePageMeta({
    middleware : auth
 })

</script>



<style>

</style>