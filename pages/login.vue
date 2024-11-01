<template>
  <AuthLayout>
    <form @submit.prevent="submit">
      <va-input v-model="form.email" class="mb-4" type="email" label="email" />
      <FormError v-if="errors" :errorInput="errors.email" />

      <va-input v-model="form.password" class="mb-4" type="password" label="password" />
      <FormError v-if="errors" :errorInput="errors.password" />

      <div class="auth-layout__options flex items-center justify-between">
        <va-checkbox v-model="form.keep" class="mb-0" label="keep_logged_in" />
        <nuxt-link class="ml-1 va-link" to="recover-password">
          recover_password
        </nuxt-link>
      </div>

      <div class="flex justify-center mt-4">
        <va-button class="my-0" @click="submit">login</va-button>
      </div>
    </form>
  </AuthLayout>
</template>

<script setup>
import AuthLayout from "~/layouts/AuthLayout.vue";
import { useFetch, useCookie } from "#app";
import FormError from "~/components/FormError.vue";
import { useApiFetch } from "~/composable/useApiFetch";

const auth_token = useCookie("auth_token");
const userPermissions = useCookie("permissions");
const userRoles = useCookie("roles");
const userData = useCookie("user");

const errors = ref({});
const form = reactive({
  email: "test@gmail.com",
  password: "password",
  keep: false,
});

async function submit() {
  const { data, status, error, refresh, clear } = await useFetch(
    "http://127.0.0.1:8000/api/login",
    {
      body: form,
      method: "post",
    }
  );

  if (status.value === "error") {
    errors.value = error.value.data.errors;
  } else {
    auth_token.value = data.value.access_token;
    userPermissions.value = data.value.permissions;
    userRoles.value = data.value.roles;

    if (data.value.user) {
      const userSimplified = {
        id: data.value.user.id,
        email: data.value.user.email,
        name: data.value.user.name
      };
      userData.value = JSON.stringify(userSimplified); 
    }
    navigateTo("admin");
  }
}

async function logout() {

}
</script>
