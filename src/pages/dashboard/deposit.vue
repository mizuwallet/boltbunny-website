<template>
  <div class="w-full flex-col justify-center items-center gap-4 my-5 lg:my-15">
    <div class="aspect-1 flex-col-center" rounded-md>
      <!-- <div
          class="w-0 h-0 rounded-full border-20 border-solid border-red border-l-transparent border-r-transparent animate-spin"
          v-if="loading"
        ></div> -->
      <QRCode
        :value="depositAddress"
        :loading="loading"
        :size="QRCodeSize"
        :icon="APTLogo"
        :icon-size="QRCodeIconSize"
        :bordered="false"
        bg-color="#fff"
      ></QRCode>
    </div>

    <div class="w-full max-w-154">
      <Panel class="w-full">
        <DataColumnGroup direct="vertical">
          <DataColumnItem title="Network" :value="CURRENT_NETWORK.toUpperCase()" />
          <DataColumnItem title="Deposit Address">
            <template #value>
              <span class="flex items-center gap-2 break-all">
                {{ depositAddress }}
                <font-awesome-icon
                  icon="fa-regular fa-copy"
                  class="cursor-pointer"
                  @click="copy(depositAddress)"
                ></font-awesome-icon>
              </span>
            </template>
          </DataColumnItem>
        </DataColumnGroup>
      </Panel>

      <ul class="text-sm my-3 text-gray">
        <li>Ratio: APT : Points = 1 : 1</li>
        <li>APT : Points = 1 : 1</li>
        <li>APT : Points = 1 : 1</li>
      </ul>
      <div class="flex-col w-full gap-2">
        <Input min="0" :precision="8" type="number" suffix="APT" v-model="depositAmount"></Input>
        <Button
          class="!w-full"
          :loading="depositing"
          @click="depositHandler"
          :disabled="!depositAmount || !depositAddress"
        >
          Confirm
        </Button>
      </div>
    </div>

    <h2 class="mt-10">Deposit History</h2>
    <div class="flex-col gap-1 w-full max-w-200">
      <div class="w-full font-bold flex justify-between p-2 rounded-md bg-primary/5">
        <span>Version</span>
        <span>Amount</span>
      </div>
      <div
        class="w-full flex justify-between p-2 rounded-md bg-primary/5"
        v-for="row in depositHistory"
        :key="row.transaction_timestamp"
      >
        <span
          @click="OpenTransactionExplorer(row.transaction_version)"
          class="flex items-center gap-1 cursor-pointer text-sm underline decoration-dashed decoration-text/30"
        >
          {{ DateFormat(row.transaction_timestamp) }}
          <font-awesome-icon icon="fa-solid fa-external-link"></font-awesome-icon>
        </span>
        <span
          class="font-bold"
          :class="{
            'text-green': row.type === '0x1::coin::DepositEvent',
          }"
        >
          {{ row.type === '0x1::coin::DepositEvent' ? '+' : '' }}
          {{ NumberWithDecimal(row.amount) }}
          <span class="text-xs">APT</span>
        </span>
      </div>
    </div>
    <div>
      Deposited Total:
      <span class="text-primary font-bold text-5">{{ NumberFormat(totalPoint) }}</span>
      Points
    </div>
  </div>
</template>

<script lang="ts" setup>
  import APTLogo from '@/assets/images/aptos-apt-logo.png';
  import { APT_DECIMALS, AptosClient, CURRENT_NETWORK } from '@/config';
  import useGraphql from '@/hooks/useGraphql';
  import Button from '@/lib/Button.vue';
  import DataColumnGroup from '@/lib/DataColumnGroup.vue';
  import DataColumnItem from '@/lib/DataColumnItem.vue';
  import Input from '@/lib/Input.vue';
  import Panel from '@/lib/Panel.vue';
  import useAppStore from '@/store/AppStore';
  import {
    DateFormat,
    NumberFormat,
    NumberWithDecimal,
    OpenTransactionExplorer,
    copy,
  } from '@/utils';
  import { InputTransactionData } from '@aptos-labs/wallet-adapter-core';
  import { QRCode, message } from 'ant-design-vue';
  import BigNumber from 'bignumber.js';

  const { getDepositAddressByUserId, getDepositHistory } = useGraphql();

  const appStore = useAppStore();

  const QRCodeSize = computed(() => (appStore.mobileSet ? 180 : 300));
  const QRCodeIconSize = computed(() => QRCodeSize.value / 5);

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

  const depositAddress = ref('');
  const depositAmount = ref('');
  const depositing = ref(false);
  const depositHandler = async () => {
    if (depositing.value) return;
    if (!depositAddress.value) {
      message.error('Please wait for the deposit address');
      return;
    }
    if (!depositAmount.value) {
      message.error('Please input the deposit amount');
      return;
    }

    try {
      depositing.value = true;
      const payload: InputTransactionData = {
        data: {
          function: '0x1::aptos_account::transfer',
          typeArguments: [],
          functionArguments: [
            depositAddress.value,
            new BigNumber(depositAmount.value).shiftedBy(APT_DECIMALS).toString(),
          ],
        },
      };

      const signedTransaction: any = await appStore.walletCore?.signAndSubmitTransaction(payload);
      await AptosClient.waitForTransaction({ transactionHash: signedTransaction.hash });
      message.success('Deposit success');
      depositAmount.value = '';
      initDepositHistory();
    } catch (e: any) {
      console.error(e);
      message.error(e.message || 'Failed to deposit');
    } finally {
      depositing.value = false;
    }
  };

  onMounted(() => {
    init();
  });

  const totalDepositAmount = ref(0);
  const totalPoint = ref(0);
  const depositHistory = ref<any[]>([]);
  const initDepositHistory = async () => {
    if (depositAddress.value) {
      const result: any = await getDepositHistory(depositAddress.value);
      depositHistory.value = result?.[`fungible_asset_activities_${CURRENT_NETWORK}`];
      totalDepositAmount.value =
        result?.[`fungible_asset_activities_${CURRENT_NETWORK}_aggregate`]?.aggregate?.sum
          ?.amount || 0;
      totalPoint.value = totalDepositAmount.value;
    }
  };

  watch(
    () => depositAddress.value,
    async () => {
      initDepositHistory();
    },
    {
      immediate: true,
    },
  );
</script>

<style leng="less" scoped></style>

<route lang="yaml">
meta:
  layout: dashboard
</route>

