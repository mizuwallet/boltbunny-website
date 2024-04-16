<template>
  <div
    class="p-3 py-1 rounded-2 w-fit text-black font-bold"
    :class="{
      'bg-primary': type === APPLICATION_TYPE.PUBLIC,
      'bg-secondary !text-white': type === APPLICATION_TYPE.PRIVATE,
    }"
  >
    {{ APPLICATION_TYPE[type] }}
  </div>
</template>

<script lang="ts" setup>
  import { APPLICATION_TYPE } from '@/config/Enum';

  defineProps<{ type: APPLICATION_TYPE }>();
</script>

