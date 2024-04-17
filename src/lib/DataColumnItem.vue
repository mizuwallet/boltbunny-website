<template>
  <div
    class="gap-1 justify-between text-sm sm:text-base transition-all py-1 sm:p-2 rounded-2"
    :class="{
      'hover:bg-primary/10': hover,
      'flex-col ': direct == 'vertical',
      'flex-row items-center': direct == 'horizontal',
    }"
  >
    <slot name="title">
      <span class="font-semibold text-text/60">{{ title }}</span>
    </slot>
    <slot name="value">
      <span class="break-all" :class="valueClass">{{ value }}</span>
    </slot>
  </div>
</template>

<script lang="ts" setup>
  defineProps(['title', 'value', 'valueClass', 'hover']);

  const direct = inject('direct');
</script>

