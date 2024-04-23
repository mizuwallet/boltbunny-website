<template>
  <h2>SDK Function Test</h2>
  <h3 class="mt-5">Fuzz::mint</h3>
  <Button @click="sdkTest">fuzz::mint</Button>

  <div class="flex-col gap-2 my-3 max-w-200 mt-5">
    <h3>Custome Function</h3>
    <Input v-model="custome.function" />
    <Input v-model="custome.secretKey" placeholder="API Secret key" />
    <Input v-model="custome.arguments" placeholder="Arguments, e.g. arg_1,args2" />
    <Button @click="cumstomSDKTest">Approve</Button>
  </div>
</template>

<script lang="ts" setup>
  import { AptosClient } from '@/config';
  import Button from '@/lib/Button.vue';
  import Input from '@/lib/Input.vue';
  import useAppStore from '@/store/AppStore';
  import { Network, SimpleTransaction } from '@aptos-labs/ts-sdk';
  import { BoltBunnyClient } from '@boltbunny/ts-sdk';

  const functionId =
    '0x4aa91a2878c2050fad21187c7bce5ed7c55831ab1b099acc01e3a6579f9b60c7::FuzzPass::mint';

  const appStore = useAppStore();
  const sdkTest = async () => {
    if (!appStore.address) return;

    const txn: SimpleTransaction = await AptosClient.transaction.build.simple({
      sender: appStore.address,
      data: {
        function: functionId,
        typeArguments: [],
        functionArguments: [],
      },
      withFeePayer: true,
    });

    const signature = await appStore.walletCore.signTransaction(txn);

    const bbClient = new BoltBunnyClient({
      APISecretKey: 'PjozjR6sWtoVuCnzBUt1WP48hac9sqbQ',
      network: Network.TESTNET,
    });

    try {
      const result: any = await bbClient.sendTransaction({
        signature: signature.bcsToHex().toString(),
        transaction: txn.rawTransaction.bcsToHex().toString(),
      });
      alert(JSON.stringify(result));
    } catch (e: any) {
      console.log(e);
    }
  };

  const custome = ref<any>({
    function: functionId,
    secretKey: '',
    arguments: '',
  });
  const cumstomSDKTest = async () => {
    if (!appStore.address) return;

    const txn: SimpleTransaction = await AptosClient.transaction.build.simple({
      sender: appStore.address,
      data: {
        function: custome.value.function,
        typeArguments: [],
        functionArguments: custome.value.arguments
          .split(',')
          .map((arg: string) => arg.trim())
          .filter((arg: string) => arg),
      },
      withFeePayer: true,
    });

    const signature = await appStore.walletCore.signTransaction(txn);

    const bbClient = new BoltBunnyClient({
      APISecretKey: custome.value.secretKey,
      network: Network.TESTNET,
    });

    try {
      const result: any = await bbClient.sendTransaction({
        signature: signature.bcsToHex().toString(),
        transaction: txn.rawTransaction.bcsToHex().toString(),
      });
      alert(JSON.stringify(result));
    } catch (e: any) {
      console.log(e);
    }
  };
</script>

<style leng="less" scoped></style>

<route lang="yaml">
meta:
  layout: dashboard
</route>

