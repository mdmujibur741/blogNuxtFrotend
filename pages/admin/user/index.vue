

<template>
  <AppLayout>
    <VaCard>
      <VaCardContent>
        <div class="va-table-responsive  mx-auto shadow-lg">
          <table class="va-table w-full">
            <thead>
              <tr>
                <th>Id</th>
                <th>name</th>
                <th>Email</th>
                <th>Role</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="user in data" :key="user.id">
                <td>{{ user.id }}</td>
                <td>{{ user.name }}</td>
                <td>{{ user.email }}</td>
                <td>    <VaBadge v-for="role in user.roles" :key="role.id" :text="role.name"  color="success" class="mr-2" /> </td>
                <td>
                 <div class="flex justify-center gap-4">
                  <nuxt-link :to="`user/${user.id}`"><font-awesome-icon class="text-green-600" :icon="['fas', 'pen-to-square']" /> </nuxt-link>
                  <button @click="DataDelete(user.id)"> <font-awesome-icon class="text-red-600" :icon="['fas', 'trash']" />  </button>
                 </div>
                </td>
              </tr>
            </tbody>
          </table>
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

const { data, status, error, refresh:usersFresh, clear } = useApiFetch("api/admin/users");

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
    const { data, status, error, refresh, clear } = useApiFetch(`api/admin/users/${id}`, {
     method: "Delete",
  });
  await usersFresh();
  }

}

</script>


<style>
.va-table-responsive {
  overflow: auto;
}
</style>