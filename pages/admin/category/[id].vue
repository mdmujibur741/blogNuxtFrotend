<template>
  <AppLayout>
    <div class="flex justify-between shadow-md p-3 border-t-2 border-blue-500 my-4">
      <h1
        class="rounded font-medium basis-1/4 dark:bg-slate-800 mx-3 text-left text-md px-5"
      >
        Category Edit
      </h1>
      <nuxt-link
        to="/admin/user"
        class="rounded bg-blue-800 basis-1/6 text-white dark:bg-slate-800 mx-3 text-md px-5"
        >Category List
      </nuxt-link>
    </div>
    <VaCard>
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
              <VaTextarea v-model="form.details" label="Details" class="w-full"/>
              <FormError v-if="errors" :errorInput="errors.details" />
             </div>
            <div class="mb-3">
              <VaInput type="number" v-model="form.priority"  label="Priority" />
              <FormError v-if="errors" :errorInput="errors.priority" />
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
import { useAuthStore } from "~/stores/useAuth";
import { useToast } from "vuestic-ui";
import { useRoute } from "vue-router";
import auth from "~/middleware/auth";

definePageMeta({
  middleware: auth,
});
const route = useRoute();
const catId = route.params.id;

const errors = ref({});
const store = useAuthStore();
const { init, notify, close, closeAll } = useToast();

const {
  data: CatData,
  status: CatStatus,
  error: CatError,
  refresh: CatRefresh,
  clear: CatClear,
} = useApiFetch(`api/admin/category/${catId}`);


const form = reactive({
  title: "",
  subtitle: "",
  details: "",
  priority: "",
  image: "",
  meta_title : "",
  meta_description : "",
  is_popular : false,
  is_home_show : false,
  status : false,
});



async function submit() {
  const { data, status, error } = await useApiFetch(`api/admin/category/${catId}`, {
    method: "put",
    body: form,
  });

  if (status.value === "error") {
    errors.value = error.value.data.errors;
  } else {
    notify("Category Update Successfully");
    navigateTo("/admin/category");
  }
}



watchEffect(() => {
  if (CatData.value?.category) {
    form.title = CatData.value.category.title || "";
    form.subtitle = CatData.value.category.subtitle || "";
    form.details = CatData.value.category.details || "";
    form.priority = CatData.value.category.priority || "";
    form.image = CatData.value.category.image || [];
    form.meta_title = CatData.value.category.meta_title || "";
    form.meta_description = CatData.value.category.meta_description || "";
    form.is_popular = CatData.value.category.is_popular ? true : false;
    form.is_home_show = CatData.value.category.is_home_show ? true :false;
    form.status = CatData.value.category.status ? true : false;
    
  }
});
</script>
