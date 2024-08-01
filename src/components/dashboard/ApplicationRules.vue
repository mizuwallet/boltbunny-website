<template>
  <div class="flex-col gap-1">
    <div class="flex items-center gap-3 w-full">
      <Input
        v-model:model-value="entryFunctionRule"
        placeholder="0x1::module::function"
        class="!w-full"
      />
      <Button @click="addRuleHandler" :loading="adding">+ Add Rules</Button>
    </div>

    <NoData v-if="isEmpty(rules)"></NoData>

    <div class="flex-col gap-2 mt-2" v-else>
      <div class="flex-col !gap-1 overflow-x-auto max-w-full">
        <div
          class="flex-2 p-2 bg-primary/5 rounded-1 px-3 relative"
          v-for="(rule, index) in rules"
          :key="index"
        >
          <RuleCDBar :updated_at="rule.updated_at" class="absolute top-0 left-0"></RuleCDBar>

          <span class="relative" v-if="rule.status == RULE_STATUS['RUNNING']">
            <span class="absolute bg-green animate-ping w-2 h-2 flex rounded-full"></span>
            <span class="relative bg-green ping w-2 h-2 flex rounded-full"></span>
          </span>
          <span v-if="rule.status == RULE_STATUS['PAUSED']">
            <span class="relative bg-yellow ping w-2 h-2 flex rounded-full"></span>
          </span>
          <span
            @click="OpenFunctionExplorer(rule.entry_function_str)"
            class="cursor-pointer hover:text-primary max-w-2/3 lg:max-w-full overflow-x-auto"
            :class="{
              'text-green': rule.status == RULE_STATUS['RUNNING'],
              'text-gray': rule.status == RULE_STATUS['PAUSED'],
            }"
            :title="rule.entry_function_str"
          >
            <template v-if="appStore.mobileSet">
              {{
                ShortAddress(rule.entry_function_str.split('::')[0], {
                  prefixLen: 8,
                  suffixLen: 4,
                })
              }}::{{ rule.entry_function_str.split('::').slice(1, 3).join('::') }}
            </template>
            <template v-else>
              {{ rule.entry_function_str }}
            </template>
          </span>
          <!-- CD Time -->
          <span class="ml-auto">
            <Button
              class="!h-6 !text-xs frame"
              @click="
                pauseRuleHandler(
                  index,
                  rule.status === RULE_STATUS['RUNNING']
                    ? RULE_STATUS['PAUSED']
                    : RULE_STATUS['RUNNING'],
                )
              "
              ref="switchBtnRefs"
            >
              <font-awesome-icon
                :icon="`fa-solid ${
                  rule.status === RULE_STATUS['RUNNING'] ? 'fa-pause' : 'fa-play'
                }`"
              />
            </Button>
          </span>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
  import { RULE_CD } from '@/config';
  import { RULE_STATUS } from '@/config/Enum';
  import useGraphql from '@/hooks/useGraphql';
  import Button from '@/lib/Button.vue';
  import Input from '@/lib/Input.vue';
  import useAppStore from '@/store/AppStore';
  import { OpenFunctionExplorer, ShortAddress } from '@/utils';
  import { MoveFunctionId } from '@aptos-labs/ts-sdk';
  import { message } from 'ant-design-vue';
  import dayjs from 'dayjs';
  import { isEmpty } from 'lodash-es';

  const props = defineProps<{ appId: string | number }>();
  const { createRule, pauseRule, getRulesListByAppId } = useGraphql();
  const appStore = useAppStore();

  const rules = ref<any[]>([]);

  const entryFunctionRule = ref<string | MoveFunctionId>('');
  const adding = ref(false);

  const addRuleHandler = async () => {
    if (adding.value) return;
    // check duplicate
    try {
      adding.value = true;

      await createRule(entryFunctionRule.value as MoveFunctionId, props.appId);
      message.success('Added Successfully');
      entryFunctionRule.value = '';
      init();
    } catch (e: any) {
      message.error(e.message);
    } finally {
      adding.value = false;
    }
  };

  const init = async () => {
    if (!props.appId) return;
    entryFunctionRule.value = '';
    const result: any = await getRulesListByAppId(props.appId);
    rules.value = result.rule;
  };

  const switchBtnRefs = ref();
  const pausing = ref(false);
  const pauseRuleHandler = async (index: number, status: RULE_STATUS) => {
    const rule = rules.value[index];
    if (pausing.value || !rule || !switchBtnRefs.value[index]) return;

    if (Math.floor(dayjs().diff(dayjs(rule.updated_at)) / 1000) < RULE_CD) {
      message.error("Can't be switched so frequently");
      return;
    }

    if (rule.status == status) {
      return;
    }

    try {
      pausing.value = true;
      await pauseRule(rule.id, status);
      message.success('Update Rule Status Successfully!');
      init();
    } catch (e: any) {
      message.error(e.message);
    } finally {
      pausing.value = false;
    }
  };

  onMounted(() => {
    init();
  });
</script>

