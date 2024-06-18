import moment from 'moment';

import { TableItem } from '@/components/table/types';
import { Address } from 'viem';
import { Period } from './types';

const tokenDetailData = {
  id: '0cnswi32',
  name: 'Satosh',
  tokenSymbol: 'SAT',
  tokenAddress: '0x1234567890123456789012345678901234567890',
  tokenImageURL: 'https://res.cloudinary.com/dxnd4k222/image/upload/fl_preserve_transparency/v1717743095/crypto-icon-instance_ygqnhb.jpg',
  tokenSupply: 20000000,
  siteConfigLink: 'https://satoshis.com',
  networkBadgeURL: 'https://res.cloudinary.com/dxnd4k222/image/upload/fl_preserve_transparency/v1717743095/Badge_1.0_issdfx.jpg',
  amount: 456.86,
  change: -12.34,
  farcasterLink: 'https://satoshis.com',
  websiteLink: 'https://satoshis.com',
  createdAt: moment().subtract(2, 'minutes').toISOString(),
  updatedAt: moment().subtract(2, 'minutes').toISOString(),
  liquidity: { numerator: 3, denominator: 3450.3 },
  marketCap: { numerator: 400000, denominator: 0.000056 },
  txns: { numerator: 706, denominator: { numerator: 406, denominator: 300 } },
  volume: 1430000,
  walletAvatarURL: 'https://res.cloudinary.com/dxnd4k222/image/upload/fl_preserve_transparency/v1717743095/crypto-icon-instance_ygqnhb.jpg',
  network: 'base',
  holders: 20000,
  fdv: 20000000,
};

const transactionsData: TableItem[] = [
  {
    wallet: '0x123456789012345678901234567890',
    walletAvatarURL: 'https://res.cloudinary.com/dxnd4k222/image/upload/fl_preserve_transparency/v1717871583/Avatar_1.0_npmw4c.jpg',
    type: 'buy',
    usdAmount: 13456.09,
    tokenAmount: 1430109,
    createdAt: '2024-06-08T00:00:00Z',
    transactionType: 'buy',
  },
  {
    wallet: '0x123456789012345678901234567890',
    walletAvatarURL: 'https://res.cloudinary.com/dxnd4k222/image/upload/fl_preserve_transparency/v1717871583/Avatar_1.0_1_gxydxc.jpg',
    type: 'sell',
    usdAmount: 120,
    tokenAmount: 50005,
    createdAt: '2023-06-01T00:00:00Z',
    transactionType: 'sell',
  },
  {
    wallet: '0x123456789012345678901234567890',
    walletAvatarURL: 'https://res.cloudinary.com/dxnd4k222/image/upload/fl_preserve_transparency/v1717871583/Avatar_1.0_2_drwkq1.jpg',
    type: 'buy',
    usdAmount: 3450.3,
    tokenAmount: 20090,
    createdAt: '2021-10-01T00:00:00Z',
    transactionType: 'buy',
  },
  {
    wallet: '0x123456789012345678901234567890',
    walletAvatarURL: 'https://res.cloudinary.com/dxnd4k222/image/upload/fl_preserve_transparency/v1717871583/Avatar_1.0_3_kgtkxs.jpg',
    type: 'sell',
    usdAmount: 10,
    tokenAmount: 200,
    createdAt: '2021-10-01T00:00:00Z',
    transactionType: 'sell',
  },
  {
    wallet: '0x123456789012345678901234567890',
    walletAvatarURL: 'https://res.cloudinary.com/dxnd4k222/image/upload/fl_preserve_transparency/v1717871583/Avatar_1.0_npmw4c.jpg',
    type: 'buy',
    usdAmount: 13456.09,
    tokenAmount: 1430109,
    createdAt: '2024-06-08T00:00:00Z',
    transactionType: 'buy',
  },
  {
    wallet: '0x123456789012345678901234567890',
    walletAvatarURL: 'https://res.cloudinary.com/dxnd4k222/image/upload/fl_preserve_transparency/v1717871583/Avatar_1.0_1_gxydxc.jpg',
    type: 'sell',
    usdAmount: 120,
    tokenAmount: 50005,
    createdAt: '2023-06-01T00:00:00Z',
    transactionType: 'sell',
  },
  {
    wallet: '0x123456789012345678901234567890',
    walletAvatarURL: 'https://res.cloudinary.com/dxnd4k222/image/upload/fl_preserve_transparency/v1717871583/Avatar_1.0_2_drwkq1.jpg',
    type: 'buy',
    usdAmount: 3450.3,
    tokenAmount: 20090,
    createdAt: '2021-10-01T00:00:00Z',
    transactionType: 'buy',
  },
  {
    wallet: '0x123456789012345678901234567890',
    walletAvatarURL: 'https://res.cloudinary.com/dxnd4k222/image/upload/fl_preserve_transparency/v1717871583/Avatar_1.0_3_kgtkxs.jpg',
    type: 'sell',
    usdAmount: 10,
    tokenAmount: 200,
    createdAt: '2021-10-01T00:00:00Z',
    transactionType: 'sell',
  },
  {
    wallet: '0x123456789012345678901234567890',
    walletAvatarURL: 'https://res.cloudinary.com/dxnd4k222/image/upload/fl_preserve_transparency/v1717871583/Avatar_1.0_npmw4c.jpg',
    type: 'buy',
    usdAmount: 13456.09,
    tokenAmount: 1430109,
    createdAt: '2024-06-08T00:00:00Z',
    transactionType: 'buy',
  },
  {
    wallet: '0x123456789012345678901234567890',
    walletAvatarURL: 'https://res.cloudinary.com/dxnd4k222/image/upload/fl_preserve_transparency/v1717871583/Avatar_1.0_1_gxydxc.jpg',
    type: 'sell',
    usdAmount: 120,
    tokenAmount: 50005,
    createdAt: '2023-06-01T00:00:00Z',
    transactionType: 'sell',
  },
  {
    wallet: '0x123456789012345678901234567890',
    walletAvatarURL: 'https://res.cloudinary.com/dxnd4k222/image/upload/fl_preserve_transparency/v1717871583/Avatar_1.0_2_drwkq1.jpg',
    type: 'buy',
    usdAmount: 3450.3,
    tokenAmount: 20090,
    createdAt: '2021-10-01T00:00:00Z',
    transactionType: 'buy',
  },
  {
    wallet: '0x123456789012345678901234567890',
    walletAvatarURL: 'https://res.cloudinary.com/dxnd4k222/image/upload/fl_preserve_transparency/v1717871583/Avatar_1.0_3_kgtkxs.jpg',
    type: 'sell',
    usdAmount: 10,
    tokenAmount: 200,
    createdAt: '2021-10-01T00:00:00Z',
    transactionType: 'sell',
  },
];

const holdingsData: { wallet: Address; walletAvatarURL: string; holding: number }[] = [
  {
    wallet: `0x${'123456789012345678901234567890'}`,
    walletAvatarURL: 'https://res.cloudinary.com/dxnd4k222/image/upload/fl_preserve_transparency/v1717871583/Avatar_1.0_npmw4c.jpg',
    holding: 90.02,
  },
  {
    wallet: `0x${'123456789012345678901234567890'}`,
    walletAvatarURL: 'https://res.cloudinary.com/dxnd4k222/image/upload/fl_preserve_transparency/v1717871583/Avatar_1.0_1_gxydxc.jpg',
    holding: 10.98,
  },
  {
    wallet: `0x${'123456789012345678901234567890'}`,
    walletAvatarURL: 'https://res.cloudinary.com/dxnd4k222/image/upload/fl_preserve_transparency/v1717871583/Avatar_1.0_2_drwkq1.jpg',
    holding: 0,
  },
  {
    wallet: `0x${'123456789012345678901234567890'}`,
    walletAvatarURL: 'https://res.cloudinary.com/dxnd4k222/image/upload/fl_preserve_transparency/v1717871583/Avatar_1.0_3_kgtkxs.jpg',
    holding: 0,
  },
  {
    wallet: `0x${'123456789012345678901234567890'}`,
    walletAvatarURL: 'https://res.cloudinary.com/dxnd4k222/image/upload/fl_preserve_transparency/v1717871583/Avatar_1.0_npmw4c.jpg',
    holding: 90.02,
  },
  {
    wallet: `0x${'123456789012345678901234567890'}`,
    walletAvatarURL: 'https://res.cloudinary.com/dxnd4k222/image/upload/fl_preserve_transparency/v1717871583/Avatar_1.0_1_gxydxc.jpg',
    holding: 10.98,
  },
  {
    wallet: `0x${'123456789012345678901234567890'}`,
    walletAvatarURL: 'https://res.cloudinary.com/dxnd4k222/image/upload/fl_preserve_transparency/v1717871583/Avatar_1.0_2_drwkq1.jpg',
    holding: 0,
  },
  {
    wallet: `0x${'123456789012345678901234567890'}`,
    walletAvatarURL: 'https://res.cloudinary.com/dxnd4k222/image/upload/fl_preserve_transparency/v1717871583/Avatar_1.0_3_kgtkxs.jpg',
    holding: 0,
  },
  {
    wallet: `0x${'123456789012345678901234567890'}`,
    walletAvatarURL: 'https://res.cloudinary.com/dxnd4k222/image/upload/fl_preserve_transparency/v1717871583/Avatar_1.0_npmw4c.jpg',
    holding: 90.02,
  },
  {
    wallet: `0x${'123456789012345678901234567890'}`,
    walletAvatarURL: 'https://res.cloudinary.com/dxnd4k222/image/upload/fl_preserve_transparency/v1717871583/Avatar_1.0_1_gxydxc.jpg',
    holding: 10.98,
  },
  {
    wallet: `0x${'123456789012345678901234567890'}`,
    walletAvatarURL: 'https://res.cloudinary.com/dxnd4k222/image/upload/fl_preserve_transparency/v1717871583/Avatar_1.0_2_drwkq1.jpg',
    holding: 0,
  },
  {
    wallet: `0x${'123456789012345678901234567890'}`,
    walletAvatarURL: 'https://res.cloudinary.com/dxnd4k222/image/upload/fl_preserve_transparency/v1717871583/Avatar_1.0_3_kgtkxs.jpg',
    holding: 0,
  },
  {
    wallet: `0x${'123456789012345678901234567890'}`,
    walletAvatarURL: 'https://res.cloudinary.com/dxnd4k222/image/upload/fl_preserve_transparency/v1717871583/Avatar_1.0_npmw4c.jpg',
    holding: 90.02,
  },
  {
    wallet: `0x${'123456789012345678901234567890'}`,
    walletAvatarURL: 'https://res.cloudinary.com/dxnd4k222/image/upload/fl_preserve_transparency/v1717871583/Avatar_1.0_1_gxydxc.jpg',
    holding: 10.98,
  },
  {
    wallet: `0x${'123456789012345678901234567890'}`,
    walletAvatarURL: 'https://res.cloudinary.com/dxnd4k222/image/upload/fl_preserve_transparency/v1717871583/Avatar_1.0_2_drwkq1.jpg',
    holding: 0,
  },
  {
    wallet: `0x${'123456789012345678901234567890'}`,
    walletAvatarURL: 'https://res.cloudinary.com/dxnd4k222/image/upload/fl_preserve_transparency/v1717871583/Avatar_1.0_3_kgtkxs.jpg',
    holding: 0,
  },
];

const periods = [
  { text: '1H', value: '1h' as Period },
  { text: '24H', value: '24h' as Period },
  { text: '1W', value: '1w' as Period },
  { text: '1M', value: '1m' as Period },
];

const generateData = (period: Period, isSecondary?: boolean) => {
  const data = [];
  const today = new Date();
  let value = 500;
  let startTime;

  switch (period) {
    case '1h':
      startTime = new Date(today.getTime() - 60 * 60 * 1000);
      for (let i = 0; i <= 60; i += 5) {
        const date = new Date(startTime.getTime() + i * 60 * 1000);
        value += Math.random() * 20 - 10;
        data.push({ date, value: isSecondary ? Math.round(value) : value });
      }
      break;
    case '24h':
      startTime = new Date(today.getTime() - 24 * 60 * 60 * 1000);
      for (let i = 0; i <= 24; i += 2) {
        const date = new Date(startTime.getTime() + i * 60 * 60 * 1000);
        value += Math.random() * 50 - 25;
        data.push({ date, value: isSecondary ? Math.round(value) : value });
      }
      break;
    case '1w':
      startTime = new Date(today.getTime() - 7 * 24 * 60 * 60 * 1000);
      for (let i = 0; i <= 7; i++) {
        const date = new Date(startTime.getTime() + i * 24 * 60 * 60 * 1000);
        value += Math.random() * 100 - 50;
        data.push({ date, value: isSecondary ? Math.round(value) : value });
      }
      break;
    case '1m':
      startTime = new Date(today.getTime() - 30 * 24 * 60 * 60 * 1000);
      for (let i = 0; i <= 4; i++) {
        const date = new Date(startTime.getTime() + i * 7 * 24 * 60 * 60 * 1000);
        value += Math.random() * 200 - 100;
        data.push({ date, value: isSecondary ? Math.round(value) : value });
      }
      break;
    default:
      throw new Error("Invalid period. Choose from '1h', '24h', '1w', or '1m'");
  }

  const smoothingFactor = 0.3;
  for (let i = 1; i < data.length - 1; i++) {
    data[i].value = Math.round(data[i].value * smoothingFactor + ((data[i - 1].value + data[i + 1].value) / 2) * (1 - smoothingFactor));
  }

  return data;
};

export { tokenDetailData, transactionsData, holdingsData, periods, generateData };
