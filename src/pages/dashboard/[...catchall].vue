<template>
  <div class="flex-col-center gap-5 w-full min-h-screen">
    <div class="text-25 font-bold tracking-1">404</div>
    <span>
      Page Not Found! Go Back Dashboard
      <a href="/dashboard" class="underline decoration-dashed text-accent">index</a>
      Page!
    </span>
  </div>
</template>

<script lang="ts" setup></script>

<route lang="yaml">
meta:
  layout: dashboard
</route>

