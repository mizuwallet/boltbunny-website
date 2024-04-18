<template>
  <div class="flex-col">
    <div class="flex gap-2 items-center">
      <router-link to="/dashboard/applications">Applications</router-link>
      <span>
        <font-awesome-icon icon="fa-solid fa-chevron-right" class="h-3"></font-awesome-icon>
      </span>
      <span>
        {{ appInfo.name }}
      </span>
    </div>

    <div class="mt-2" v-if="appInfo.id">
      <NetworkTag :network="appInfo.network"></NetworkTag>
      <h2 class="text-4xl text-primary font-bold mt-1">
        {{ appInfo.name }}
        <span class="text-xs text-gray">
          {{ ShortDataFormat(appInfo.created_at) }}
        </span>
      </h2>

      <!-- <div class="flex items-center gap-2 mt-2">
        <ApplicationStatus :status="appInfo.status"></ApplicationStatus>
        <Button class="frame">Stop</Button>
        <Button>RUN</Button>
      </div> -->

      <div class="flex-col gap-2 mt-4">
        <Panel>
          <div class="flex items-center justify-between">
            <h2>API Secret Key</h2>
            <ApplicationType :type="appInfo.type"></ApplicationType>
          </div>
          <span class="text-xs -mt-5 text-gray flex items-center gap-1">
            <font-awesome-icon icon="fa-solid fa-circle-info" />
            <span>
              Keep this key secret. It is used to authenticate your application. PUBLIC key means to
              be used in client-side(SDK), PRIVATE key is intended for backend.
            </span>
          </span>
          <SecretDisplay :secret="appInfo.secret"></SecretDisplay>
        </Panel>

        <Panel>
          <h2>Rules</h2>
          <ApplicationRules :app-id="appInfo.id"></ApplicationRules>
        </Panel>

        <Panel>
          <h2>Allow Origins</h2>
          <ApplicationAllowOrigins
            :appId="appInfo.id"
            :allow-origins="appInfo.allowed_origins || []"
            @refresh="init"
          ></ApplicationAllowOrigins>
        </Panel>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
  import useGraphql from '@/hooks/useGraphql';
  import Panel from '@/lib/Panel.vue';
  import { ShortDataFormat } from '@/utils';

  const route = useRoute();

  const { getAppByAppName } = useGraphql();

  const appInfo = ref<any>({});
  const init = async () => {
    const result: any = await getAppByAppName(route.params.name as string);
    appInfo.value = result.application?.[0] || {};
  };

  onMounted(() => {
    init();
  });
</script>

<route lang="yaml">
meta:
  layout: dashboard
  parent: application
</route>

