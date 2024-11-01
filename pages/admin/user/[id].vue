<template>
    <AppLayout>
     <div class="flex justify-between shadow-md p-3 border-t-2 border-blue-500   my-4" >
      <h1 class="rounded font-medium basis-1/4 dark:bg-slate-800 mx-3 text-left text-md px-5 ">Users Edit</h1>
      <nuxt-link to="admin/user"    class="rounded bg-blue-800 basis-1/6 text-white  dark:bg-slate-800 mx-3  text-md px-5 " >Users List </nuxt-link>
     </div>
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
  import { useToast } from 'vuestic-ui'
  import { useRoute } from 'vue-router';
  import auth from '~/middleware/auth';
 

 definePageMeta({
    middleware : auth
 })


  const route = useRoute(); 
  const userId = route.params.id;   
 
  
  const errors = ref({});
  const store = useAuthStore();
  const { init, notify, close, closeAll } = useToast()
  
  
  const { data: userData, status:userStatus, error:userError, refresh:userRefresh, clear:userClear } = useApiFetch(`api/admin/users/${userId}`);
  const { data: rolesData, status:rolesStatus, error:rolesError, refresh:rolesRefresh, clear:rolesClear } = useApiFetch("api/admin/roles");
  


  const form = reactive({
    name: "",
    email: "",
    password: "",
    confirm_password: "",
    role: [],
  });

  watch(userData, (newData) => {
  if (newData?.user) {
    form.name = newData.user.name || '';
    form.email = newData.user.email || '';
    form.role = newData.user.roles ? newData.user.roles.map(role => role.id) : [];
  }
});

  
  async function submit() {
    const { data, status, error } = await useApiFetch(`api/admin/users/${userId}`, {
      method: "put",
      body: form,
    });
  
    if (status.value === "error") {
      errors.value = error.value.data.errors;
    } else {
      notify('User Update Successfully')
      navigateTo('/admin/user')
    }
  }
  </script>
  