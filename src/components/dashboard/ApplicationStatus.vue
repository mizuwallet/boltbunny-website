<template>
  <div
    class="font-semibold text-sm"
    :class="{
      'text-green': status === APPLICATION_STATUS.RUNNING,
      'text-yellow': status === APPLICATION_STATUS.PUASED,
      'text-red': [
        APPLICATION_STATUS.STOPPED,
        APPLICATION_STATUS.STOPPED_CAUSE_BY_INSUFFICIENT_BALANCE,
      ].includes(status),
    }"
  >
    {{ APPLICATION_STATUS[status] }}
  </div>
</template>

<script lang="ts" setup>
  import { APPLICATION_STATUS } from '@/config/Enum';
  defineProps<{
    status: APPLICATION_STATUS;
  }>();
</script>

