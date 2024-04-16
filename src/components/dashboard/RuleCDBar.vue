<template>
  <div
    class="w-full h-[2px] bg-blue/70"
    :style="{
      width: `${width}%`,
    }"
  ></div>
</template>

<script lang="ts" setup>
  import { RULE_CD } from '@/config';
  import dayjs from 'dayjs';

  const props = defineProps<{
    updated_at: string | number;
  }>();
  const now = useNow();

  const width = computed(() => {
    return Math.max(0, (1 - dayjs(now.value).diff(props.updated_at) / 1000 / RULE_CD) * 100);
  });
</script>

