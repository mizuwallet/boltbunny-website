import { IS_DEV } from '@/config';
import { Network } from '@aptos-labs/ts-sdk';
import { IdentityConnectWallet } from '@identity-connect/wallet-adapter-plugin';
import { PetraWallet } from 'petra-plugin-wallet-adapter';

// TODO: update these keys
const ID_WALLET_TESTNET_KEY = '1fe13d8d-449b-46b8-97b0-2b0aed662e8a';
const ID_WALLET_KEY = 'b2a873ea-617b-4b3b-aa5f-26631ba3993d';

const wallets = [
  new IdentityConnectWallet(IS_DEV ? ID_WALLET_TESTNET_KEY : ID_WALLET_KEY, {
    networkName: IS_DEV ? Network.TESTNET : Network.MAINNET,
  }),
  new PetraWallet(),
];

export default wallets;

