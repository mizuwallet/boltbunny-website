<template>
  <div
    class="flex-col w-full gap-1 sm:gap-2"
    :class="{
      '!gap-0': narrow,
    }"
  >
    <slot></slot>
  </div>
</template>

<script lang="ts" setup>
  const props = withDefaults(
    defineProps<{
      narrow?: boolean;
      direct?: 'horizontal' | 'vertical';
    }>(),
    { narrow: false, direct: 'horizontal' },
  );

  provide('direct', props.direct);
</script>

