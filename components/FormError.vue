<template>
    <div class="text-red-600" v-if="errorInput"  style="color:crimson"> 
        <strong v-for="(sta, sr) in errorInput" :key="sr"> {{ sta }} </strong>
      </div>
</template>

<script lang="ts" setup>
       defineProps({
            errorInput :Array
       })
</script>

<style>

</style>