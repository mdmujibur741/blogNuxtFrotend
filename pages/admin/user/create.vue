<template>
  <AppLayout>
    <VaCard>
      <VaCardContent>
        <form @submit.prevent="submit">
       <div class="mb-3">
        <VaInput v-model="form.name"  label=" Name" />
        <FormError v-if="errors" :errorInput="errors.name" />
       </div>
         <div class="mb-3">
          <VaInput v-model="form.email"  label=" Email" />
          <FormError v-if="errors" :errorInput="errors.email" />
         </div>
         <div class="mb-3">
          <VaInput type="password" v-model="form.password" label=" Password" />
          <FormError v-if="errors" :errorInput="errors.password" />
         </div>
        <div class="mb-3">
          <VaInput type="password" v-model="form.confirm_password"  label=" confirm Password" />
          <FormError v-if="errors" :errorInput="errors.confirm_password" />
        </div>
          <div class="flex justify-start gap-3 border mb-3">
            <div v-for="role in rolesData" :key="role.id" class="mx-2 ">
              <label for="role.id" class="px-2 mt-2"> {{ role.name }} </label>
              <input  type="checkbox" class="px-2" id="role.id" v-model="form.role" :value="role.id"/>
            </div>
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
  name: "",
  email: "",
  password: "",
  confirm_password: "",
  role: [],
});

async function submit() {
  const { data, status, error } = await useApiFetch("api/admin/users", {
    method: "post",
    body: form,
  });

  if (status.value === "error") {
    errors.value = error.value.data.errors;
  } else {
    notify('User Added Successfully')
  }
}
</script>
