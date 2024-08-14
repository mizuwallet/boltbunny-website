<template>
  <div class="flex-col">
    <!-- Top -->
    <!-- <span class="font-medium">Applications</span> -->
    <h2>Overview</h2>
    <div class="flex flex-col lg:flex-row justify-between items-start gap-2">
      <span class="text-text/90">
        Establish Applications with contractual rules.
        <br />
        And Deposited TOKENS will serve as GAS FEE for transactions initiated by users.
      </span>
      <Button @click="openAddApplicationModal = true">Create Application</Button>
    </div>

    <!-- Operations -->
    <div class="flex mt-5">
      <div class="text-md">
        <span>Search applications</span>
        <div class="flex gap-3 h-10">
          <Input class="lg:w-60" :prefix="true" v-model="applicationNameSearchKeyWord">
            <template #prefix>
              <font-awesome-icon
                icon="fa-solid fa-magnifying-glass"
                class="mr-1 w-3 h-3"
              ></font-awesome-icon>
            </template>
          </Input>
          <!-- <Button class="frame">Search</Button> -->
        </div>
      </div>
    </div>

    <!-- List -->
    <div class="flex-col gap-2 mt-2 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
      <ApplicationItem
        v-for="app in filterApps"
        :key="app.id"
        :data="app"
        @click="router.push({ path: `/dashboard/applications/${encodeURIComponent(app.name)}` })"
      ></ApplicationItem>
    </div>
  </div>

  <AddApplication v-model:open="openAddApplicationModal" @success="onAddSuccess"></AddApplication>
</template>

<script lang="ts" setup>
  import AddApplication from '@/components/dashboard/Modal/AddApplication.vue';
  import useGraphql from '@/hooks/useGraphql';
  import Button from '@/lib/Button.vue';
  import Input from '@/lib/Input.vue';

  const applicationNameSearchKeyWord = ref('');
  const openAddApplicationModal = ref(false);
  const router = useRouter();
  const { getAppListByUserId } = useGraphql();

  const onAddSuccess = () => {
    openAddApplicationModal.value = false;
    init();
  };

  const filterApps = computed(() => {
    if (applicationNameSearchKeyWord.value) {
      return apps.value.filter((app) => app.name.includes(applicationNameSearchKeyWord.value));
    } else {
      return apps.value;
    }
  });

  const appAggregate = ref({});
  const apps = ref<any[]>([]);
  const init = async () => {
    const data: any = await getAppListByUserId();
    const { applications, applications_aggregate } = data.login_user_by_pk;
    apps.value = applications;
    appAggregate.value = applications_aggregate.aggregate || {};
  };

  onMounted(() => {
    init();
  });
</script>

<route lang="yaml">
meta:
  layout: dashboard
</route>

