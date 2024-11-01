<template>
  <AppLayout>
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
            <VaButton @click="submit">submit</VaButton>
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
import { useToast, useModal } from 'vuestic-ui'
import auth from '~/middleware/auth';
 

 definePageMeta({
    middleware : auth
 })

const { confirm } = useModal()

const errors = ref({});
const store = useAuthStore();
const { init, notify, close, closeAll } = useToast()


const { data: rolesData, status, error, refresh, clear } = useApiFetch("api/admin/roles");

const form = reactive({
  title: "",
  subtitle: "",
  details: "",
  priority: "",
  image: "gfr",
  meta_title : "",
  meta_description : "",
  is_popular : false,
  is_home_show : false,
  status : false,
});



async function submit() {
  const { data, status, error } = await useApiFetch("api/admin/category", {
    method: "post",
    body: form,
  });

  if (status.value === "error") {
    errors.value = error.value.data.errors;
  } else {
    notify('User Added Successfully')
    navigateTo('/admin/category')
  }
}
</script>
