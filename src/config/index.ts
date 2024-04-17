import { Aptos, AptosConfig } from '@aptos-labs/ts-sdk';

export * from './dashboard';

// jwt token
export const ACCESS_TOKEN_LS = 'AccessToken';

export const CURRENT_NETWORK = import.meta.env.VITE_APP_NETWORK;

export const IS_DEV = import.meta.env.MODE === 'development';

export const APT_DECIMALS = 8;

export const APTOS_COIN_TYPE = '0x1::aptos_coin::AptosCoin';

export const FUNCTION_TYPE = 'entry_function_payload';

export const AptosClient = new Aptos(
  new AptosConfig({
    network: CURRENT_NETWORK,
  }),
);

export const RULE_CD = 60 * 1;

