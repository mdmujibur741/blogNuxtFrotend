<template>
  <div class="">
    <FrontendTopMenu />

    <main class="w-11/12 mx-auto p-3">
      <slot />
    </main>

    <FrontendFooter/>

  </div>
</template>

<script setup>
import { computed } from "vue";
import { useColors } from "vuestic-ui";

const { currentPresetName } = useColors();

const darkNavbarColors = computed(() => {
  if (currentPresetName.value === "light") {
    return {
      color: "#111111",
      textColor: "#BAFFC5",
    };
  } else {
    return {
      color: "#FBCAF6",
      textColor: "#481269",
    };
  }
});
</script>

<style scoped>
.logo {
  font-weight: 600;
  font-size: 1.5rem;
}
</style>
