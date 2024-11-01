<template>
  <FrontLayout>
    <section v-if="latestStatus == 'success'" class="mb-3 p-5 shadow-lg bg-white">
      <div class="grid grid-cols-1 md:grid-cols-12 gap-8">
        <div class="md:col-span-9 mx-auto">
          <h2
            class="text-xl font-bold text-gray-800 p-6 bg-white shadow-lg border-t border-blue-700 rounded mb-2"
          >
            <nuxtLink to=""> {{ LatestData.category?.title }} </nuxtLink>
          </h2>

          <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
            <FrontendBlogCard :blog="blogs" />
          </div>
          <div class="flex flex-wrap justify-center py-5">
            <VaPagination
              v-model="page"
              :pages="10"
              :visible-pages="3"
              buttons-preset="secondary"
              rounded
              gapped
              border-color="primary"
              class="justify-center sm:justify-start"
            />
          </div>
        </div>

        <div class="md:col-span-3 bg-white">
          <div class="shadow-lg border-t border-gray-100 rounded mb-3">
            <div class="shadow-lg border-t border-gray-100 rounded mb-2">
              <h2
                class="text-xl font-bold text-gray-800 px-3 py-2 bg-white shadow-md rounded mb-2"
              >
                Releted Category
              </h2>
              <ul class="px-2 py-3">
                <li v-for="cat in LatestData?.relatedCategory" :key="cat.id" class="mb-2">
                  <nuxt-link
                    :to="`/category/${cat.slug}`"
                    class="text-blue-600 hover:text-blue-800"
                  >
                    {{ cat.title }}
                  </nuxt-link>
                </li>
              </ul>
            </div>

            <h2
              class="text-xl font-bold text-gray-800 px-3 py-2 bg-white shadow-md rounded mb-2"
            >
              Latest Post
            </h2>

            <FrontendBlogCard :blog="LatestData?.latestBlog" />
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
const catSlug = route.params.id;

const page = ref(1);
const blogs = ref([]);
const pagination = ref(null);

const fetchBlogs = async () => {
  const { data, status } = await useApiFetch(
    `api/category/${catSlug}?page=${page.value}`
  );
  blogs.value = data.value.blogs.data;
  pagination.value = data.value.blogs.current_page;
};

fetchBlogs();

watch(page, async () => {
  await fetchBlogs();
});

const { data: LatestData, status: latestStatus } = await useApiFetch(
  `api/category/latest-blog/${catSlug}`
);

// useHead({
//   title: LatestData.category?.meta_title || "MyBlog Title",
//   meta: [
//     {
//       name: "description",
//       content: LatestData.category?.meta_description || "Default Description",
//     },
//     {
//       property: "og:title",
//       content: LatestData.category?.meta_title || "Default OG Title",
//     },
//     {
//       property: "og:description",
//       content: LatestData.category?.meta_description || "Default OG Description",
//     },
//   ],
// });

watchEffect(() => {
  if (latestStatus.value === 'success' && LatestData.value) {
    useHead({
      title: LatestData.value.category?.meta_title || "MyBlog Title",
      meta: [
        {
          name: "description",
          content: LatestData.value.category?.meta_description || "Default Description",
        },
        {
          property: "og:title",
          content: LatestData.value.category?.meta_title || "Default OG Title",
        },
        {
          property: "og:description",
          content: LatestData.value.category?.meta_description || "Default OG Description",
        },
      ],
    });
  }
});
</script>
