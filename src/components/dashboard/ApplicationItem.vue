<template>
  <div
    class="app-item flex-col gap-1 border-1 border-solid border-l-3 border-primary/20 p-3 px-4 rounded-1 cursor-pointer text-text/70 hover:text-text hover:border-primary"
    :class="{
      '!text-text': appStore.mobileSet,
      'border-l-primary': data.status == APPLICATION_STATUS.RUNNING,
      'border-l-yellow': data.status == APPLICATION_STATUS.PUASED,
      'border-l-red': data.status == APPLICATION_STATUS.STOPPED_CAUSE_BY_INSUFFICIENT_BALANCE,
    }"
  >
    <div class="flex flex-col md:flex-row items-start md:items-center justify-between">
      <span class="flex-col text-6 font-semibold text-text truncate">
        <NetworkTag :network="data.network"></NetworkTag>

        {{ data.name }}
      </span>
      <span class="text-xs text-text/50">
        {{ dayjs(data.created_at).format('YYYY-MM-DD HH:mm') }}
      </span>
    </div>
    <!-- <div class="flex items-center gap-2 text-xs">
      <span>Balance: 1023.213 APT</span>
      <span>Transaction: 12301230</span>
      <span>User: 123891203</span>
    </div> -->
  </div>
</template>

<script lang="ts" setup>
  import { APPLICATION_STATUS } from '@/config/Enum';
  import useAppStore from '@/store/AppStore';
  import dayjs from 'dayjs';

  defineProps<{
    data: any;
  }>();
  const appStore = useAppStore();
</script>

<style lang="less" scoped>
  .app-item {
    @apply transition-all;
    box-shadow: inset rgba(102, 246, 97, 0.1) -12px 24px 30px;
    &:hover {
      box-shadow: inset rgba(102, 246, 97, 0.2) -30px 40px 100px;
    }
  }
</style>

