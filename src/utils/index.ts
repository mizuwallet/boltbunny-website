import { CURRENT_NETWORK } from '@/config';
import { MoveFunctionId } from '@aptos-labs/ts-sdk';
import { message } from 'ant-design-vue';
import BigNumber from 'bignumber.js';
import dayjs from 'dayjs';
import numeral from 'numeral';

export const ShortAddress = (
  address: string,
  opts: { prefixLen: number; suffixLen: number } = { prefixLen: 6, suffixLen: 4 },
) => {
  const reg: RegExp = new RegExp(`(^\\S{${opts.prefixLen}})(\\S*)(\\S{${opts.suffixLen}})$`);
  return address && address !== '0' ? address.replace(reg, '$1...$3') : '';
};
export const copy = (text: string) => {
  window.navigator.clipboard.writeText(text);
  message.success('Copied');
};

export const DateFormat = (date: string | number) => {
  if (!date) return '-';
  return dayjs(date).format('YYYY-MM-DD HH:mm:ss');
};

export const ShortDataFormat = (date: string | number) => {
  if (!date) return '-';
  return dayjs(date).format('YYYY-MM-DD HH:mm');
};

export const PercentFormat = (
  molecule: number | 'string' | BigNumber = 0,
  denominator: number | 'string' | BigNumber = 1,
) => {
  return new BigNumber(molecule).div(denominator).times(100).dp(2);
};

export const NumberFormat = (num: number | 'string' | BigNumber = 0) => {
  return new BigNumber(num).toFormat();
};

export const sleep = (ms: number) => {
  return new Promise((resolve) => setTimeout(resolve, ms));
};

export const NumeralFormat = (num: number | string) => {
  return numeral(num).format('0.[0]a');
};

export const NumberWithDecimal = (num: number | string, decimal: number = 8) => {
  return new BigNumber(num)
    .shiftedBy(-1 * decimal)
    .dp(5)
    .toFormat();
};

export const OpenFunctionExplorer = (
  functionStr: MoveFunctionId,
  network: string = CURRENT_NETWORK,
) => {
  const [contract, module, functionId] = functionStr.split('::');
  window.open(
    `https://explorer.aptoslabs.com/account/${contract}/modules/run/${encodeURIComponent(
      module,
    )}/${encodeURIComponent(functionId)}?network=${network}`,
    '_blank',
  );
};

export const OpenTransactionExplorer = (txId: string, network: string = CURRENT_NETWORK) => {
  window.open(`https://explorer.aptoslabs.com/txn/${txId}?network=${network}`, '_blank');
};

