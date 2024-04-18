<template>
  <Button @click="sdkTest">fuzz::mint</Button>
</template>

<script lang="ts" setup>
  import { AptosClient } from '@/config';
  import Button from '@/lib/Button.vue';
  import useAppStore from '@/store/AppStore';
  import { SimpleTransaction } from '@aptos-labs/ts-sdk';
  import { message } from 'ant-design-vue';
  import { GraphQLClient, gql } from 'graphql-request';
  // PjozjR6sWtoVuCnzBUt1WP48hac9sqbQ

  //

  const functionId =
    '0x4aa91a2878c2050fad21187c7bce5ed7c55831ab1b099acc01e3a6579f9b60c7::FuzzPass::mint';

  const appStore = useAppStore();
  const sdkTest = async () => {
    console.log(appStore.address);
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

    const GQL_Client = new GraphQLClient(import.meta.env.VITE_APP_GRAPHQL_URL, {
      headers: () => ({
        'x-alcove-app-secret': `PjozjR6sWtoVuCnzBUt1WP48hac9sqbQ`,
      }),
    });

    console.log(txn.rawTransaction);

    try {
      await GQL_Client.request(
        gql`
          mutation submitTransaction($signature: String!, $transaction: String!) {
            submitTransaction(txnParams: { signature: $signature, transaction: $transaction }) {
              transactionHash
            }
          }
        `,
        {
          signature: signature.bcsToHex().toString(),
          transaction: txn.rawTransaction.bcsToHex().toString(),
        },
      );
    } catch (e: any) {
      console.log(e);
      message.error(e.response.errors[0].message);
    }
  };
</script>

<style leng="less" scoped></style>

<route lang="yaml">
meta:
  layout: dashboard
</route>

