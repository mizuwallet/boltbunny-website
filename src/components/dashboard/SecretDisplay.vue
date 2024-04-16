<template>
  <div class="flex items-center gap-2 bg-primary/5 p-2 rounded-1">
    <span class="break-all">
      {{ hidden ? new Array(secret?.length).fill('∗').join('') : secret }}
    </span>
    <font-awesome-icon
      class="cursor-pointer select-none"
      icon="fa-solid fa-eye"
      @click="hiddenToggle"
      v-if="!hidden"
    />
    <font-awesome-icon
      class="cursor-pointer select-none"
      icon="fa-solid fa-eye-slash"
      @click="hiddenToggle"
      v-else
    />
    <font-awesome-icon class="cursor-pointer" icon="fa-regular fa-copy" @click="copy(secret)" />
  </div>
</template>

<script lang="ts" setup>
  import { copy } from '@/utils';
  defineProps<{
    secret: string;
  }>();

  const hidden = ref(true);
  const hiddenToggle = () => {
    hidden.value = !hidden.value;
  };
</script>

