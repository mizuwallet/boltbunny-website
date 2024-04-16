<template>
  <router-view></router-view>
</template>

<script setup lang="ts">
  import useAppStore from './store/AppStore';

  const appStore = useAppStore();

  onMounted(() => {
    appStore.loadJwtToken();
  });
</script>

<style scoped></style>
