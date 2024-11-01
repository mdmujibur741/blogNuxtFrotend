<template>
  <AppLayout>
 
    <VaCard v-if="blogData?.blog">
      <VaCardContent>
        <form @submit.prevent="submit">
          <div class="mb-3">
            <VaInput v-model="form.title"  label=" title" />
            <FormError v-if="errors" :errorInput="errors.title" />
           </div>
             <div class="mb-3">
              <VaInput v-model="form.subtitle"  label="subtitle" />
              <FormError v-if="errors" :errorInput="errors.subtitle" />
             </div>
             <div class="mb-3">
              <VaTextarea v-model="form.description" label="Description" class="w-full"/>
              <FormError v-if="errors" :errorInput="errors.description" />
             </div>
            <div class="mb-3">
              <VaInput type="number" v-model="form.priority"  label="Priority" />
              <FormError v-if="errors" :errorInput="errors.priority" />
            </div>
    
            <div class="mb-3">
            <label for="">category</label>
            <select class="w-full my-1 p-1 border"   v-model="form.category_id">
               <option v-for="cat in CatData" :key="cat.id"  :value="cat.id"> {{ cat.title }} </option>
            </select>
            <FormError v-if="errors" :errorInput="errors.category_id" />
            </div>

            <div class="mb-3">
              <VaInput type="text" v-model="form.meta_title" label="Meta Title" />
              <FormError v-if="errors" :errorInput="errors.meta_title" />
            </div>
  
            <div class="mb-3">
              <VaInput type="text" v-model="form.meta_description" label="Meta description" />
              <FormError v-if="errors" :errorInput="errors.meta_description" />
            </div>
  
            <div class="mb-3">
              <VaCheckbox v-model="form.is_popular" label="Is Popular"  />
              <FormError v-if="errors" :errorInput="errors.is_popular" />
            </div>
  
            <div class="mb-3">
              <VaCheckbox v-model="form.is_home_show" label="Is Home"/>
              <FormError v-if="errors" :errorInput="errors.priority" />
            </div>
  
            <div class="mb-3">
              <VaCheckbox v-model="form.status" label="Status"/>
              <FormError v-if="errors" :errorInput="errors.status" />
            </div>
  
    
            <div class="mb-3 flex flex-wrap justify-between">
              <VaFileUpload v-model="form.image"  undo type="gallery" undo-duration="500" undo-button-text="undoButtonText"  deleted-file-message="deletedFileMessage" />
              <div class="">
                <h2 class="text-lg font-semibold">Exist Files</h2>
                <div class="flex flex-wrap justify-between">
                  <img v-for="img in blogData.blog?.blog_image" class="w-36 border shadow p-2 lg:mt-20" :key="img.id" :src="img.src" alt="">
                </div>
              </div>
            </div>
    

          <div class="flex justify-end gap-3">
            <VaButton color="secondary" preset="secondary">Cancel</VaButton>
            <VaButton @click="submit">Update</VaButton>
          </div>


        </form>
      </VaCardContent>
    </VaCard>
  </AppLayout>
</template>

<script setup>
import { useApiFetch } from "~/composable/useApiFetch";
import { usePermission } from "~/composable/usePermission";
import AppLayout from "~/layouts/AppLayout.vue";
import { ref, watch, computed } from "vue";
import { useToast, VaImage } from "vuestic-ui";
import { useRoute } from "vue-router";
import auth from "~/middleware/auth";

definePageMeta({
  middleware: auth,
});
const route = useRoute();
const Id = route.params.id;

const errors = ref({});
const { init, notify, close, closeAll } = useToast();

const { data:blogData, status:blogStatus, error:blogError, refresh:blogRefresh, clear:blogClear } = useApiFetch(`api/admin/blogs/${Id}`);
const {data: CatData, status: CatStatus,error: CatError, refresh: CatRefresh,clear: CatClear} = useApiFetch(`api/admin/category`);


const form = reactive({
  title:"",
  subtitle: "",
  description: "",
  priority: "",
  category_id : "",
  meta_title : "",
  meta_description : "",
  is_popular : false,
  is_home_show : false,
  status : false,
  image: [],
});



watchEffect(() => {
  if (blogData.value?.blog) {
    form.title = blogData.value.blog.title || "";
    form.subtitle = blogData.value.blog.subtitle || "";
    form.description = blogData.value.blog.description || "";
    form.priority = blogData.value.blog.priority || "";
    form.category_id = blogData.value.blog?.category_id || "";
    form.meta_title = blogData.value.blog?.meta_title || "";
    form.meta_description = blogData.value.blog?.meta_description || "";
    form.is_popular = blogData.value.blog?.is_popular ? true : false;
    form.is_home_show = blogData.value.blog?.is_home_show ? true : false;
    form.status = blogData.value.blog?.status ? true : false;
  }
});

async function submit() {


  const formData = new FormData();
  formData.append("title", form.title);
  formData.append("subtitle", form.subtitle);
  formData.append("description", form.description);
  formData.append("priority", form.priority);
  formData.append("category_id", form.category_id);
  formData.append("is_popular", form.is_popular);
  formData.append("is_home_show", form.is_home_show);
  formData.append("status", form.status);
  formData.append("meta_title", form.meta_title);
  formData.append("meta_description", form.meta_description);

  if (form.image.length > 0) {
    form.image.forEach((file, index) => {
      formData.append(`image[${index}]`, file);
    });
  }

const { data, status, error } = await useApiFetch(`api/admin/blogs/${Id}`, {
  method: "post",
  body: formData, 
});



  if (status.value === "error") {
    errors.value = error.value.data.errors;
  } else {
    notify("Blog Update Successfully");
      navigateTo("/admin/blog");
  }
}
</script>
