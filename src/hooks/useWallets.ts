import useAppStore from '@/store/AppStore';
import { WalletName } from '@aptos-labs/wallet-adapter-core';

const useWallets = () => {
  const appStore = useAppStore();
  const connecting = ref(false);

  const connect = async (walletName: WalletName) => {
    try {
      connecting.value = true;
      await appStore.walletCore?.connect(walletName);
    } catch (error: any) {
      console.log('connect error', error);
    } finally {
      connecting.value = false;
    }
  };

  const disconnect = async () => {
    try {
      await appStore.walletCore?.disconnect();
    } catch (error) {}
  };

  return {
    connecting,

    connect,
    disconnect,
  };
};

export default useWallets;

