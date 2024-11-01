// plugins/loading.js
import { ref } from 'vue';
import { useRouter } from 'vue-router';

export default defineNuxtPlugin(() => {
  const loading = ref(false);
  const router = useRouter();

  router.beforeEach(() => {
    loading.value = true;
  });

  router.afterEach(() => {
    loading.value = false;
  });

  return {
    provide: {
      loading
    }
  };
});
