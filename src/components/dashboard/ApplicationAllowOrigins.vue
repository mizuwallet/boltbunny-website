<template>
  <div class="flex-col gap-1">
    <div class="flex items-center gap-3 w-full">
      <Input v-model:model-value="originURL" placeholder="https://" class="!w-full" />
      <Button @click="addOriginHandler" :loading="adding">+ Add Origin</Button>
    </div>

    <NoData v-if="isEmpty(allowOrigins)" />
    <div class="flex-col gap-2 mt-2" v-else>
      <div class="flex-col !gap-1 overflow-x-auto max-w-full">
        <div
          class="flex-2 p-2 bg-primary/5 rounded-1 px-3 relative"
          v-for="(origin, index) in allowOrigins"
          :key="index"
        >
          <a
            :href="origin"
            target="_blank"
            class="cursor-pointer hover:text-primary max-w-2/3 lg:max-w-full overflow-x-auto"
          >
            {{ origin }}
          </a>

          <span class="ml-auto">
            <Button class="!h-6 !text-xs frame" @click="removeOrigin(origin)" ref="switchBtnRefs">
              <font-awesome-icon :icon="`fa-regular fa-trash-can`" />
            </Button>
          </span>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
  import useGraphql from '@/hooks/useGraphql';
  import Button from '@/lib/Button.vue';
  import Input from '@/lib/Input.vue';
  import { message } from 'ant-design-vue';
  import { clone, isEmpty, remove } from 'lodash-es';

  interface Props {
    allowOrigins: string[];
    appId: number | string;
  }

  const props = defineProps<Props>();

  const emits = defineEmits(['refresh']);

  const { updateOriginByAppId } = useGraphql();

  const originURL = ref('');
  const adding = ref(false);

  const originValidate = (origin: string) => {
    if (!origin?.match(/^https:\/\//)) {
      throw new Error('Invalid origin url');
    }
  };

  const addOriginHandler = async () => {
    const origin = originURL.value;

    try {
      originValidate(origin);
      await updateOriginByAppId(props.appId, [...props.allowOrigins, origin]);
      message.success('Successfully Added');
      emits('refresh');
      originURL.value = '';
    } catch (e: any) {
      message.error(e.message);
    }
  };

  const removeOrigin = async (origin: string) => {
    try {
      const copyOfOirgins = clone(props.allowOrigins);
      remove(copyOfOirgins, (allow: any) => allow == origin);
      await updateOriginByAppId(props.appId, copyOfOirgins);
      message.success('Successfully Removed');
      emits('refresh');
      originURL.value = '';
    } catch (e: any) {
      message.error(e.message);
    }
  };
</script>

