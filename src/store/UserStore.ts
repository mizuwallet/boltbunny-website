import { defineStore } from 'pinia';

interface UserStore {}

const useUserStore = defineStore('userStore', (): UserStore => {
  return {};
});

export default useUserStore;

