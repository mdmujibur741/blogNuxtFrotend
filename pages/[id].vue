<template>
  <FrontLayout>
    <section class="bg-cover mb-3 bg-center">
      <div class="grid md:grid-cols-8 grid-cols-1 gap-5">
        <div class="md:col-span-6">
          <VaCarousel v-model="value" :items="items" height="222px" />

          <div class="bg-white rounded-lg shadow-lg overflow-hidden">
            <div class="p-6">
              <h3 class="text-xl font-bold text-gray-800 mb-4"> {{ blogData.blog?.title }} </h3>
              <div class="text-gray-600 mb-4">
                  <div v-html="blogData.blog?.description"></div>
              </div>
            </div>
          </div>
        </div>
        <div class="md:col-span-2">
          <div class="shadow-lg border-t border-gray-100 rounded ">
            <h2 class="text-xl font-bold text-gray-800 px-3 mb-2 bg-white shadow-md p-4 rounded">Trending Post</h2>
          
            <FrontendBlogCard :blog="blogData.trading"/>
          </div>
        </div>
      </div>
    </section>

    <section class="mb-3 p-5 shadow-lg bg-white">
   
          <h2 class="text-3xl font-bold text-gray-800 mb-8">Latest Posts</h2>

          <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
            <FrontendBlogCard :blog="blogData.related"/>
          </div>
           
    </section>

  </FrontLayout>
</template>

<script setup>
import FrontLayout from "~/layouts/FrontLayout.vue";
import { useApiFetch } from "~/composable/useApiFetch";


const router = useRoute();
const slug =router.params.id;

const { data:blogData, status:blogStatus } = await useApiFetch(`api/blog/${slug}`);


useHead({
    title: blogData.value.blog?.meta_title || 'MyBlog Title',
    meta: [
      { name: 'description', content: blogData.value.blog?.meta_description || 'Default Description' },
      { property: 'og:title', content: blogData.value.blog?.meta_title || 'Default OG Title' },
      { property: 'og:description', content: blogData.value.blog?.meta_description || 'Default OG Description' },
    ],
  });


const items = ref([
  "https://picsum.photos/1500",
  "https://picsum.photos/1501",
  "https://picsum.photos/1502",
  "https://picsum.photos/1503",
  "https://picsum.photos/1504",
]);
const value = ref(0);


</script>
