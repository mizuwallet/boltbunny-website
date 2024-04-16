<template>
  <Modal class="!w-full md:!w-120" centered :footer="false">
    <h1 class="text-4xl py-4 font-bold text-center">Create Application</h1>
    <Form class="flex-col w-full">
      <FormItem label="Application Name" info="10 ~ 20 characters: [A-Za-z0-9]">
        <Input class="!h-10" v-model:model-value="formData.name" maxlength="20" />
        <span class="text-red text-xs" v-if="!validate.name">Invalid Application Name</span>
      </FormItem>
      <FormItem label="Network">
        <Select v-model:modal-value="network" :options="NETWORK_LIST"></Select>
      </FormItem>
      <FormItem label="API Secret Type">
        <Select v-model:modal-value="appType" :options="APP_TYPE"></Select>
        <span class="text-gray text-xs bg-white/10 p-1 rounded-1 flex-2">
          <font-awesome-icon icon="fa-solid fa-circle-info"></font-awesome-icon>
          The {{ APPLICATION_TYPE[appType] }} key is used for the client side.
        </span>
      </FormItem>
      <FormItem>
        <Button class="!w-full !h-10" @click="createApplicationHanlder" :loading="creating">
          Create Application
        </Button>
      </FormItem>
    </Form>
  </Modal>
</template>

<script lang="ts" setup>
  import { APPLICATION_TYPE } from '@/config/Enum';
  import useGraphql from '@/hooks/useGraphql';
  import Button from '@/lib/Button.vue';
  import Form from '@/lib/Form.vue';
  import FormItem from '@/lib/FormItem.vue';
  import Input from '@/lib/Input.vue';
  import Select from '@/lib/Select.vue';
  import useAppStore from '@/store/AppStore';
  import { Modal, message } from 'ant-design-vue';
  import { v4 as uuidv4 } from 'uuid';

  const emits = defineEmits(['success']);
  const { createApp } = useGraphql();
  const appStore = useAppStore();

  const APP_TYPE = [
    { label: APPLICATION_TYPE[0], value: APPLICATION_TYPE['PUBLIC'] },
    {
      label: `${APPLICATION_TYPE[1]} (Coming Soon)`,
      value: APPLICATION_TYPE['PRIVATE'],
      disabled: true,
    },
  ];

  const NETWORK_LIST = [
    {
      label: 'MAINNET',
      value: 'mainnet',
    },
    {
      label: 'TESTNET',
      value: 'testnet',
    },
    {
      label: 'DEVNET',
      value: 'devnet',
    },
  ];

  const appType = ref(APPLICATION_TYPE['PUBLIC']);
  const network = ref(NETWORK_LIST[0].value);

  const formData = ref({
    name: '',
  });

  const validate = ref({
    name: true,
  });

  const initFormData = () => {
    formData.value.name = '';
  };

  const creating = ref(false);
  const createApplicationHanlder = async () => {
    if (creating.value) return;

    if (!appStore.userId) {
      message.error('Please login first');
      return;
    }

    if (!formData.value.name) {
      message.error('Please input the application name');
      return;
    }

    if (!validate.value.name) {
      message.error('Invalid application name');
      return;
    }

    try {
      creating.value = true;
      await createApp({
        name: formData.value.name,
        userId: appStore.userId!,
        secret: `bb_${network.value}_${APPLICATION_TYPE[appType.value].toLowerCase()}_${uuidv4()}`,
        network: network.value,
      });
      message.success('Application created successfully');
      emits('success');
      initFormData();
    } catch (e: any) {
      message.error(e.message);
    } finally {
      creating.value = false;
    }
  };

  const array = new Uint32Array(10);

  watch(
    () => formData.value.name,
    () => {
      validate.value.name =
        !!formData.value.name &&
        formData.value.name.length >= 4 &&
        !!formData.value.name.match(/^[A-Za-z0-9_-]+$/);
    },
  );
</script>

