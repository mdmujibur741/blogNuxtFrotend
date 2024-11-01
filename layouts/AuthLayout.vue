<template>
    <div class="auth-layout grid grid-cols-12 content-center">
      <div class="flex col-span-12 p-4 justify-center">
        <NuxtLink class="py-5 justify-center flex" to="/">
          <vuestic-logo height="32" />
        </NuxtLink>

      </div>
  
      <div class="flex justify-center col-span-12 p-4">
        <va-card class="auth-layout__card">
          <va-card-content>
            <va-tabs v-model="tabIndex" center>
              <template #tabs>
                <va-tab name="login">login</va-tab>
                <va-tab name="signup">createNewAccount</va-tab>
              </template>
            </va-tabs>
  
            <va-separator />
  
            <div class="p-3">
              <slot />
            </div>
          </va-card-content>
        </va-card>
      </div>
    </div>
  </template>
  
  <script>
    import VuesticLogo from '../components/VuesticLogo.vue'

  
    export default {
      name: 'AuthLayout',
      components: { VuesticLogo },
      setup() {

      },
      data() {
        return {
          selectedTabIndex: 0,
        }
      },
      computed: {
        tabIndex: {
          set(tabName) {
            this.$router.push({ name: tabName })
          },
          get() {
            return this.$route.name
          },
        },
      },
    }
  </script>
  
  <style lang="scss">
    .auth-layout {
      min-height: 100vh;
      background-image: linear-gradient(to right, var(--va-background-primary), var(--va-white));
  
      &__card {
        width: 100%;
        max-width: 600px;
      }
    }
  </style>
  