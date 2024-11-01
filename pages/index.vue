<template>
  <FrontLayout v-if="status=='success'">
    <section class="bg-cover mb-3 bg-center">
      <VaCarousel v-model="value" :items="items" />
    </section>

    <!-- Blog Posts -->
    <section class="mb-3 p-5 shadow-lg bg-white">
      <div class="grid grid-cols-1 md:grid-cols-10 gap-8">
        <div v-if="data.latestPost" class="md:col-span-8 mx-auto">
          <h2 class="text-3xl font-bold text-gray-800 mb-8">Latest Posts</h2>

          <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
           
            <FrontendBlogCard :blog="data.latestPost"/>

          </div>
        </div>

        <div class="md:col-span-2  bg-white">
          <h2 class="text-3xl font-bold text-gray-800 mb-8">Top Category</h2>
          <div class="shadow-lg border-t border-gray-100 rounded">
            <ul class="p-8">
              <li class="mb-2" v-for="cat in data.category" :key="cat.id">
                <nuxt-link :to="`/category/${cat.slug}`" class="text-blue-600 hover:text-blue-800"> {{ cat.title }} </nuxt-link>
              </li>

            </ul>
          </div>
        </div>
      </div>
    </section>

    <!-- Blog Posts -->
    <section class="mb-3 p-5 shadow-lg bg-white">
      <div class="mx-auto">
        <h2 class="text-3xl font-bold text-gray-800 mb-8">Popular Posts</h2>

        <div class="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-8">
          <FrontendBlogCard :blog="data.popularPost"/>
        </div>
      </div>
    </section>


    <section class="mb-3 p-5 shadow-lg bg-white">
      <div v-for="cat in data.category" :key="cat.id" class="mx-auto mb-5">
        <h2 class="text-xl font-bold text-gray-800 p-6 bg-white shadow-lg border-t border-blue-700  rounded mb-2"> <nuxtLink :to="`/category/${cat.slug}`"> {{cat.title}} </nuxtLink>  </h2>

        <div class="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-8 mt-3">
          <FrontendBlogCard :blog="cat.blogs"/>
        </div>
      </div>
    </section>
  </FrontLayout>
</template>

<script setup>
import FrontLayout from "~/layouts/FrontLayout.vue";
import { useApiFetch } from "~/composable/useApiFetch";

useHead({
  title: 'My Amazing Site',
  meta: [
    { name: 'description', content: 'This is my amazing site, let me tell you all about it.' },
    { property: 'og:title', content: 'My Amazing Site' },
    { property: 'og:description', content: 'This is my amazing site, let me tell you all about it.' },
    { property: 'og:image', content: 'https://example.com/image.png' },
    { name: 'twitter:card', content: 'summary_large_image' },
  ]
});

const items = ref([
  "https://picsum.photos/1500",
  "https://picsum.photos/1501",
  "https://picsum.photos/1502",
  "https://picsum.photos/1503",
  "https://picsum.photos/1504",
]);
const value = ref(0);


const {data, status} = useApiFetch('api/home')

</script>

<style></style>
