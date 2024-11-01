<!-- 
<template>
  <AppLayout>
    <VaCard>
      <VaCardContent>
        <div class="va-table-responsive  mx-auto shadow-lg">
          <table class="va-table w-full">
            <thead>
              <tr>
                <th>Id</th>
                <th>Title</th>
                <th>SubTile</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="blog in data?.data" :key="blog.id">
                <td>{{ blog.id }}</td>
                <td>{{ blog.title }}</td>
                <td>{{ blog.subtitle }}</td>
               
                <td>
                 <div class="flex justify-center gap-4">
                  <nuxt-link :to="`blog/${blog.id}`"><font-awesome-icon color="primary" :icon="['fas', 'pen-to-square']" /> </nuxt-link>
                  <button @click="DataDelete(blog.id)"> <font-awesome-icon class="text-red-600" :icon="['fas', 'trash']" />  </button>
                 </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      
        <div class="flex flex-wrap justify-center py-5">  
         
               <button class="p-2 m-1" @click="paginatePage(1)"> 1</button>
               <button class="p-2 m-1" @click="paginatePage(2)"> 2</button>
               <button class="p-2 m-1" @click="paginatePage(3)"> 3</button>
               <button class="p-2 m-1" @click="paginatePage(4)"> 4</button>
        </div>
      </VaCardContent>
    </VaCard>
  </AppLayout>
</template>

<script setup>
import { useApiFetch } from "~/composable/useApiFetch";
import { usePermission } from "~/composable/usePermission";
import AppLayout from "~/layouts/AppLayout.vue";
import { ref, watch, computed } from "vue";
import { useAuthStore } from "~/stores/useAuth";
import { useToast, useModal } from 'vuestic-ui'

import auth from '~/middleware/auth';
 

 definePageMeta({
    middleware : auth
 })

const store = useAuthStore();
const { confirm } = useModal()

const page = ref(1);

const { data, status, error, refresh:categoryFresh, clear } = useApiFetch(`api/admin/blogs?page=${page.value}`);

async function DataDelete(id)
{
  const agreed = await confirm({
    title: 'Delete user',
    message: 'Are you sure you want to delete ',
    okText: 'Delete',
    cancelText: 'Cancel',
    size: 'small',
    maxWidth: '380px',
  })
  if(agreed){
    const { data, status, error, refresh, clear } = useApiFetch(`api/admin/blogs/${id}`, {
     method: "Delete",
  });
  await categoryFresh();
  }

}


async function paginatePage(id){
     page.value = id;
     await categoryFresh();
}


</script> -->

<template>
  <AppLayout>
    <VaCard>
      <VaCardContent>
        
        <div class="va-table-responsive mx-auto shadow-lg">
          <table class="va-table w-full">
            <thead>
              <tr>
                <th>Id</th>
                <th>Title</th>
                <th>SubTile</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="blog in blogs" :key="blog.id">
                <td>{{ blog.id }}</td>
                <td>{{ blog.title }}</td>
                <td>{{ blog.subtitle }}</td>
                <td>
                  <div class="flex justify-center gap-4">
                    <nuxt-link :to="`blog/${blog.id}`">
                      <font-awesome-icon color="primary" :icon="['fas', 'pen-to-square']" />
                    </nuxt-link>
                    <button @click="DataDelete(blog.id)">
                      <font-awesome-icon class="text-red-600" :icon="['fas', 'trash']" />
                    </button>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <div class="flex flex-wrap justify-center py-5">
          <VaPagination v-model="page" :pages="10" :visible-pages="3" buttons-preset="secondary" rounded  gapped border-color="primary" class="justify-center sm:justify-start" />
        </div>
      </VaCardContent>
    </VaCard>
  </AppLayout>
</template>

<script setup>
import { ref, watch } from "vue";
import { useModal } from 'vuestic-ui';
import { useApiFetch } from "~/composable/useApiFetch";
import AppLayout from "~/layouts/AppLayout.vue";
import auth from '~/middleware/auth';

definePageMeta({
  middleware: auth
});

const page = ref(1); 
const blogs = ref([]);
const pagination = ref(null); 

// Fetch blogs when the page changes
const fetchBlogs = async () => {
  const { data } = await useApiFetch(`api/admin/blogs?page=${page.value}`);
  blogs.value = data.value.data; 
  pagination.value = data.value; 
};


fetchBlogs();

watch(page, async () => {
  await fetchBlogs();
});

const { confirm } = useModal();

async function DataDelete(id) {
  const agreed = await confirm({
    title: 'Delete Blog',
    message: 'Are you sure you want to delete this blog?',
    okText: 'Delete',
    cancelText: 'Cancel',
    size: 'small',
    maxWidth: '380px',
  });

  if (agreed) {
    await useApiFetch(`api/admin/blogs/${id}`, { method: "DELETE" });
    await fetchBlogs(); 
  }
}

async function paginatePage(newPage) {
  page.value = newPage; 
}
</script>



<style>
.va-table-responsive {
  overflow: auto;
}
</style>