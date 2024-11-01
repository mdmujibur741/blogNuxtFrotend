<template>
    <div v-for="(bl, sr) in blog" :key="bl.id" class="bg-white rounded-lg shadow-lg overflow-hidden">
        <img
          :src="`https://picsum.photos/${numberGenerate(sr)}`"
          alt="Blog Image"
          class="w-full h-36 object-cover"
        />
        <div class="p-6">
          <h3 class="text-xl font-bold text-gray-800 mb-4"> {{ bl.title }} </h3>
          <p class="text-gray-600 mb-4">
             {{ bl.details }}
          </p>
          <nuxt-link :to="`/${bl.slug}`" class="text-blue-600 hover:text-blue-800">Read More &rarr;</nuxt-link>
        </div>
      </div>
</template>
<script setup>
     defineProps({
         blog : Object
     })

     function numberGenerate(sr){
        return 600 + sr;
     }
</script>