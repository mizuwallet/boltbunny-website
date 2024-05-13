import { ACCESS_TOKEN_LS, AptosClient } from '@/config';
import wallets from '@/config/wallets';
import { HexInput } from '@aptos-labs/ts-sdk';
import { WalletCore } from '@aptos-labs/wallet-adapter-core';
import { breakpointsTailwind } from '@vueuse/core';
import { jwtDecode } from 'jwt-decode';
import { defineStore } from 'pinia';

interface AppStore {
  mobileSet: ComputedRef<boolean>;
  connectModalOpen: Ref<boolean>;
  walletCore: WalletCore;
  autoConnect: Ref<boolean>;
  address: Ref<string | undefined>;
  jwtAddress: Ref<string | undefined>;
  balance: Ref<number>;
  userId: Ref<string | null>;
  accessToken: Ref<string | null>;
  connecting: Ref<boolean>;

  loadJwtToken: () => void;
  decodeUserInfo: (jwtStr: string) => void;
}

const WALLET_NAME = 'AptosWalletName';

const useAppStore = defineStore('appStore', (): AppStore => {
  const connectModalOpen = ref(false);
  const connecting = ref(false);
  const autoConnect = ref(true);
  const address = ref();
  const jwtAddress = ref();
  const balance = ref(0);
  const userId = ref();
  const accessToken = ref(window.localStorage.getItem('accessToken'));
  const walletCore = new WalletCore(wallets);
  const breakpoints = useBreakpoints(breakpointsTailwind);
  const mobileSet = computed(() => breakpoints.smaller('md').value);

  walletCore.on('accountChange', () => {
    address.value = walletCore.account?.address;
  });

  walletCore.on('connect', () => {
    window.localStorage.setItem(WALLET_NAME, walletCore.wallet?.name || '');
    address.value = walletCore.account?.address;
    fetchBalance();
  });

  walletCore.on('disconnect', () => {
    address.value = undefined;
  });

  const fetchBalance = () => {
    if (address.value) {
      AptosClient.getAccountCoinAmount({
        accountAddress: address.value as HexInput,
        coinType: '0x1::aptos_coin::AptosCoin',
      })
        .then((res: any) => {
          balance.value = res;
        })
        .catch(() => {
          balance.value = 0;
        });
    } else {
      balance.value = 0;
    }
  };

  // put it dashboard
  // if (autoConnect) {
  //   setTimeout(async () => {
  //     if (window.localStorage.getItem(WALLET_NAME)) {
  //       try {
  //         connecting.value = true;
  //         await walletCore.connect(window.localStorage.getItem(WALLET_NAME) as string);
  //         address.value = walletCore.account?.address;
  //       } catch (e: any) {
  //         console.log(e);
  //       } finally {
  //         connecting.value = false;
  //       }
  //     } else {
  //       connecting.value = false;
  //     }
  //   }, 1000);
  // }

  watch(
    () => address.value,
    () => {
      if (window.localStorage.getItem(ACCESS_TOKEN_LS) && jwtAddress.value != address.value) {
        window.open('/', '_self');
        accessToken.value = '';
        window.localStorage.removeItem(ACCESS_TOKEN_LS);
      }
    },
  );

  const loadJwtToken = () => {
    const jwt = window.localStorage.getItem(ACCESS_TOKEN_LS);
    if (jwt) {
      accessToken.value = jwt;
      decodeUserInfo(jwt);
    } else {
      accessToken.value = '';
    }
  };

  const decodeUserInfo = (jwtStr: string) => {
    if (jwtStr) {
      const jwt: any = jwtDecode(jwtStr);

      if ((jwt.exp || 0) * 1e3 < Date.now()) {
        window.localStorage.removeItem(ACCESS_TOKEN_LS);
        return;
      }
      jwtAddress.value = jwt.address;
      userId.value = jwt['https://hasura.io/jwt/claims']['x-hasura-user-id'];
    }
  };

  return {
    connectModalOpen,
    connecting,
    autoConnect,
    address,
    jwtAddress,
    userId,
    balance,
    accessToken,
    mobileSet,
    walletCore,

    decodeUserInfo,
    loadJwtToken,
  };
});

export default useAppStore;

