<template>
    <FrontLayout>
      <section class="mb-3 p-5 shadow-lg bg-white">
        <div class="grid grid-cols-1 md:grid-cols-12 gap-8">
          <div class="md:col-span-9 mx-auto">
            <h2 class="text-3xl font-bold text-gray-800 mb-8">Latest Posts</h2>
  
            <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
              <FrontendBlogCard :blog="blogs"/>
            </div>
             <div class="flex flex-wrap justify-center py-5"> <VaPagination  v-model="page"   :pages="10"  :visible-pages="3"  buttons-preset="secondary"  rounded gapped   border-color="primary" class="justify-center sm:justify-start" /></div>
          </div>
  
          <div class="md:col-span-3 bg-white">
            <div class="shadow-lg border-t border-gray-100 rounded mb-3">
              <div class="shadow-lg border-t border-gray-100 rounded mb-2">
                <h2 class="text-xl font-bold text-gray-800 px-3 py-2 bg-white shadow-md  rounded mb-2">Releted Category</h2>
                <ul class="px-2 py-3">
                  <li class="mb-2">
                    <nuxt-link
                      to="/category/entertain"
                      class="text-blue-600 hover:text-blue-800"
                      >Category 1</nuxt-link
                    >
                  </li>
                  <li class="mb-2">
                    <a href="#" class="text-blue-600 hover:text-blue-800">Category 2</a>
                  </li>
                  <li class="mb-2">
                    <a href="#" class="text-blue-600 hover:text-blue-800">Category 3</a>
                  </li>
                  <li class="mb-2">
                    <a href="#" class="text-blue-600 hover:text-blue-800">Category 4</a>
                  </li>
    
                  <li class="mb-2">
                    <a href="#" class="text-blue-600 hover:text-blue-800">Category 4</a>
                  </li>
    
                  <li class="mb-2">
                    <a href="#" class="text-blue-600 hover:text-blue-800">Category 4</a>
                  </li>
    
                  <li class="mb-2">
                    <a href="#" class="text-blue-600 hover:text-blue-800">Category 4</a>
                  </li>
                </ul>
              </div>
  
              <h2 class="text-xl font-bold text-gray-800 px-3 py-2 bg-white shadow-md  rounded mb-2">Latest Post</h2>
           
              <FrontendBlogCard :blog="blogs.slice(0,2)"/>
            </div>
  
        
          </div>
        </div>
      </section>
    </FrontLayout>
  </template>
  
  <script setup>
  import FrontLayout from "~/layouts/FrontLayout.vue";
  import { useApiFetch } from "~/composable/useApiFetch";
  
  const route = useRoute();
  const productId = route.params.id;
  
  const value = ref(3);


const page = ref(1); 
const blogs = ref([]);
const pagination = ref(null); 


const fetchBlogs = async () => {
  const { data, status } = await useApiFetch(`api/blogs?page=${page.value}`);
  blogs.value = data.value.blogs.data; 
  pagination.value = data.value.blogs.current_page; 
};

fetchBlogs();

watch(page, async () => {
  await fetchBlogs();
});
  </script>
  