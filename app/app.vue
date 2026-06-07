<script setup lang="ts">
const {initializeTheme} = useTheme();

onMounted(() => {
  initializeTheme();
});
</script>
<template>
  <div>
    <NuxtRouteAnnouncer/>
    <NuxtPage/>
  </div>
</template>
