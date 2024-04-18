<template>
  <h2>Transactions</h2>
  <Table
    class="mt-10 text-sm"
    :datas="list"
    :columns="HistoryTableColumns"
    :loading="loading"
    :page="page"
    @update:page="pageChangeHandler"
    :pagination="{ size: limit, total }"
  >
    <template #application="{ record }">
      <span class="flex-col items-center gap-2">
        <NetworkTag :network="record.network"></NetworkTag>
        <span class="text-6 font-bold max-w-4/5 relative w-full truncate">
          {{ record.application.name }}
        </span>
        <span class="mt-1 text-gray">
          {{
            ShortAddress(record.rule.entry_function_str.split('::')[0], {
              prefixLen: 8,
              suffixLen: 4,
            })
          }}::{{ record.rule.entry_function_str.split('::').slice(1, 3).join('::') }}
        </span>
      </span>
    </template>

    <template #point="{ record }">
      <div class="flex-col text-sm items-start px-4" v-if="record.point_recording?.total_points">
        <span class="text-5 font-bold text-red">- {{ record.point_recording?.total_points }}</span>

        <span>Gas: {{ record.point_recording?.gas_points }}</span>
        <span>Service Fee: {{ record.point_recording?.service_points }}</span>
      </div>
    </template>

    <template #hash="{ record }">
      <span class="flex-col items-end px-4">
        <span
          class="cursor-pointer hover:underline flex w-fit items-center gap-2 underline decoration-dashed decoration-text/30"
        >
          {{ ShortAddress(record.hash) }}
          <font-awesome-icon icon="fa-solid fa-external-link" class="w-3 h-3"></font-awesome-icon>
        </span>
        <span class="text-xs text-gray">{{ DateFormat(record.created_at) }}</span>
      </span>
    </template>

    <template #mobile-td="{ record, cols }">
      <DataColumnGroup>
        <DataColumnItem :title="cols[0].label">
          <template #value>
            <span class="flex-col items-end gap-1">
              <NetworkTag :network="record.network"></NetworkTag>
              <span class="text-6 font-bold max-w-4/5 relative truncate">
                {{ record.application.name }}
              </span>
              <span class="text-gray">
                {{
                  ShortAddress(record.rule.entry_function_str.split('::')[0], {
                    prefixLen: 8,
                    suffixLen: 4,
                  })
                }}::{{ record.rule.entry_function_str.split('::').slice(1, 3).join('::') }}
              </span>
            </span>
          </template>
        </DataColumnItem>
        <DataColumnItem :title="cols[1].label">
          <template #value>
            <div class="flex-col text-sm items-end" v-if="record.point_recording?.total_points">
              <span class="text-5 font-bold text-red">
                - {{ record.point_recording?.total_points }}
              </span>

              <span>Gas: {{ record.point_recording?.gas_points }}</span>
              <span>Service Fee: {{ record.point_recording?.service_points }}</span>
            </div>
          </template>
        </DataColumnItem>
        <DataColumnItem :title="cols[2].label">
          <template #value>
            <span class="flex-col items-end">
              <span
                class="cursor-pointer hover:underline flex w-fit items-center gap-2 underline decoration-dashed decoration-text/30"
              >
                {{ ShortAddress(record.hash) }}
                <font-awesome-icon
                  icon="fa-solid fa-external-link"
                  class="w-3 h-3"
                ></font-awesome-icon>
              </span>
              <span class="text-xs text-gray">{{ DateFormat(record.created_at) }}</span>
            </span>
          </template>
        </DataColumnItem>
      </DataColumnGroup>
    </template>
  </Table>
</template>

<script lang="ts" setup>
  import useGraphql from '@/hooks/useGraphql';
  import DataColumnGroup from '@/lib/DataColumnGroup.vue';
  import DataColumnItem from '@/lib/DataColumnItem.vue';
  import Table from '@/lib/Table.vue';
  import useAppStore from '@/store/AppStore';
  import { DateFormat, ShortAddress } from '@/utils';

  const appStore = useAppStore();
  const { getTransactionHistory } = useGraphql();

  const HistoryTableColumns = [
    {
      label: 'Application',
      field: 'application',
      width: '400px',
    },
    {
      label: 'Points Consumed',
      field: 'point',
      left: true,
    },
    {
      label: 'Hash',
      field: 'hash',
      width: '200px',
      right: true,
    },
  ];

  const list = ref<any[]>([]);
  const total = ref(0);
  const loading = ref(false);
  const page = ref(1);
  const limit = ref(10);
  const init = async () => {
    if (!appStore.address || loading.value) return;

    try {
      loading.value = true;
      const result: any = await getTransactionHistory(appStore.address, {
        limit: limit.value,
        offset: (page.value - 1) * 10,
      });
      list.value = result?.transaction || [];
      total.value = result?.transaction_aggregate?.aggregate?.count || 0;
    } catch (e: any) {
      console.error(e);
    } finally {
      loading.value = false;
    }
  };

  const pageChangeHandler = async (p: number) => {
    page.value = p;
    list.value = [];
    await init();
  };

  watch(
    () => appStore.address,
    () => {
      init();
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

