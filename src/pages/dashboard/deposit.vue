<template>
  <div class="flex">
    <div class="flex-col gap-0 justify-center items-center" md="gap-4 flex-row">
      <div class="w-300px aspect-1 flex-col-center bg-white" border="1px solid white" rounded-md>
        <!-- <div
          class="w-0 h-0 rounded-full border-20 border-solid border-red border-l-transparent border-r-transparent animate-spin"
          v-if="loading"
        ></div> -->
        <QRCode :value="depositAddress" :loading="loading" :size="300"></QRCode>
      </div>
      <span>{{ depositAddress }}</span>

      <div class="flex-col">
        <span>{{}}</span>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
  import useGraphql from '@/hooks/useGraphql';
  import { QRCode, message } from 'ant-design-vue';

  const { getDepositAddressByUserId } = useGraphql();

  const depositAddress = ref('');

  const loading = ref(true);
  const init = async () => {
    if (loading.value) {
      try {
        const res: any = await getDepositAddressByUserId();
        depositAddress.value = res?.login_user_by_pk?.wallets?.[0]?.address;
      } catch (e: any) {
        console.error(e);
        message.error(e.message || 'Failed to get deposit address');
        depositAddress.value = '';
      } finally {
        loading.value = false;
      }
    }
  };

  onMounted(() => {
    init();
  });
</script>

<style leng="less" scoped></style>

<route lang="yaml">
meta:
  layout: dashboard
</route>

