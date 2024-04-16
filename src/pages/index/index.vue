<template>
  <div class="index-page">
    <h1 class="centre-title">Why Bolt Buuny?</h1>
    <section></section>
    <h1 class="centre-title">How Does it Work?</h1>
    <section></section>
    <h1 class="centre-title">Documentation</h1>
    <section></section>
  </div>
</template>

<script lang="ts" setup></script>

<style lang="less" scoped>
  .centre-title {
    @apply m-0;
    @apply text-4xl lg:text-6xl text-center font-bold !leading-30;
  }

  .index-page {
    @apply flex-col w-full;
  }
</style>

<route lang="yaml">
meta:
  layout: default
</route>

