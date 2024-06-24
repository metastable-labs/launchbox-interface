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

const comments: ILBComment[] = [
  {
    comment:
      'Rolling out channel specific user rankings think of these as customizable channel power badges - an essential lego for decentralized channels - rankings for 100 channels live, 500+ by eow - ongoing eyeballing/feedback from channel owners and @automod @jrgi - soon @neynar makes it easy to consume for devs/frames more ⭐️',
    createdAt: '2024-06-08T00:00:00Z',
    createdBy: {
      avatar: 'https://res.cloudinary.com/dxnd4k222/image/upload/fl_preserve_transparency/v1718723895/Avatar_khczwg.jpg',
      id: 'fhjfh7wdws9',
      name: 'Sahil',
      username: 'sahil',
    },
    id: 'fhjfh7hkjsu',
    images: ['https://res.cloudinary.com/dxnd4k222/image/upload/fl_preserve_transparency/v1718804332/image_54_u75dgm.jpg'],
    likes: 5700,
    recasts: 12,
    replies: [
      {
        comment:
          'Excited to announce the integration of new features in our platform! 🎉 Continuous improvement and feedback from our community has been invaluable. Check out the new update and let us know your thoughts! #productupdate #community',
        createdAt: '2024-06-10T12:34:56Z',
        createdBy: {
          avatar: 'https://res.cloudinary.com/dxnd4k222/image/upload/fl_preserve_transparency/v1718723895/Avatar_khczwg.jpg',
          id: 'fjkfj83hdsn',
          name: 'Ananya',
          username: 'ananya',
        },
        id: 'fjkfj83hdsn1',
        images: [],
        likes: 3200,
        recasts: 20,
        replies: [],
        updatedAt: '2024-06-10T12:34:56Z',
      },
      {
        comment:
          'Excited to announce the integration of new features in our platform! 🎉 Continuous improvement and feedback from our community has been invaluable. Check out the new update and let us know your thoughts! #productupdate #community',
        createdAt: '2024-06-10T12:34:56Z',
        createdBy: {
          avatar: 'https://res.cloudinary.com/dxnd4k222/image/upload/fl_preserve_transparency/v1718723895/Avatar_khczwg.jpg',
          id: 'fjkfj83hdsn',
          name: 'Ananya',
          username: 'ananya',
        },
        id: 'fjkfj83hdsn1',
        images: [],
        likes: 3200,
        recasts: 20,
        replies: [],
        updatedAt: '2024-06-10T12:34:56Z',
      },
      {
        comment:
          'Excited to announce the integration of new features in our platform! 🎉 Continuous improvement and feedback from our community has been invaluable. Check out the new update and let us know your thoughts! #productupdate #community',

        createdAt: '2024-06-10T12:34:56Z',
        createdBy: {
          avatar: 'https://res.cloudinary.com/dxnd4k222/image/upload/fl_preserve_transparency/v1718723895/Avatar_khczwg.jpg',
          id: 'fjkfj83hdsn',
          name: 'Ananya',
          username: 'ananya',
        },
        id: 'fjkfj83hdsn1',
        images: [],
        likes: 3200,
        recasts: 20,
        replies: [],
        updatedAt: '2024-06-10T12:34:56Z',
      },
      {
        comment:
          'Excited to announce the integration of new features in our platform! 🎉 Continuous improvement and feedback from our community has been invaluable. Check out the new update and let us know your thoughts! #productupdate #community',

        createdAt: '2024-06-10T12:34:56Z',
        createdBy: {
          avatar: 'https://res.cloudinary.com/dxnd4k222/image/upload/fl_preserve_transparency/v1718723895/Avatar_khczwg.jpg',
          id: 'fjkfj83hdsn',
          name: 'Ananya',
          username: 'ananya',
        },
        id: 'fjkfj83hdsn1',
        images: [],
        likes: 3200,
        recasts: 20,
        replies: [],
        updatedAt: '2024-06-10T12:34:56Z',
      },
    ],
    updatedAt: '2024-06-08T00:00:00Z',
  },
  {
    comment:
      'Excited to announce the integration of new features in our platform! 🎉 Continuous improvement and feedback from our community has been invaluable. Check out the new update and let us know your thoughts! #productupdate #community',

    createdAt: '2024-06-10T12:34:56Z',
    createdBy: {
      avatar: 'https://res.cloudinary.com/dxnd4k222/image/upload/fl_preserve_transparency/v1718723895/Avatar_khczwg.jpg',
      id: 'fjkfj83hdsn',
      name: 'Ananya',
      username: 'ananya',
    },
    id: 'fjkfj83hdsn1',
    images: [],
    likes: 3200,
    recasts: 20,
    replies: [],
    updatedAt: '2024-06-10T12:34:56Z',
  },
  {
    comment:
      'Join us for our upcoming webinar on decentralized applications! 🚀 Learn from industry experts and get insights into the future of decentralized tech. Register now! #webinar #decentralization Join us for our upcoming webinar on decentralized applications! 🚀 Learn from industry experts and get insights into the future of decentralized tech. Register now! #webinar #decentralization',
    createdAt: '2024-06-12T08:20:15Z',
    createdBy: {
      avatar: 'https://res.cloudinary.com/dxnd4k222/image/upload/fl_preserve_transparency/v1718723895/Avatar_khczwg.jpg',
      id: 'fjd8392kdfs',
      name: 'Ravi',
      username: 'ravi',
    },
    id: 'fjd8392kdfs2',
    images: [],
    likes: 4400,
    recasts: 15,
    replies: [],
    updatedAt: '2024-06-12T08:20:15Z',
  },
  {
    comment: 'Our team is working tirelessly to bring you the best experience. Big shoutout to everyone involved! 🙌 Stay tuned for more updates. #teamwork #development',
    createdAt: '2024-06-14T14:45:30Z',
    createdBy: {
      avatar: 'https://res.cloudinary.com/dxnd4k222/image/upload/fl_preserve_transparency/v1718723895/Avatar_khczwg.jpg',
      id: 'fj8390wjsdf',
      name: 'Maya',
      username: 'maya',
    },
    id: 'fj8390wjsdf3',
    images: [],
    likes: 5100,
    recasts: 18,
    replies: [],
    updatedAt: '2024-06-14T14:45:30Z',
  },
  {
    comment: 'Just released a new tutorial on how to get started with decentralized finance (DeFi). Check it out and start your DeFi journey today! 💡 #DeFi #tutorial',
    createdAt: '2024-06-16T10:15:45Z',
    createdBy: {
      avatar: 'https://res.cloudinary.com/dxnd4k222/image/upload/fl_preserve_transparency/v1718723895/Avatar_khczwg.jpg',
      id: 'fji3490kfns',
      name: 'Aarav',
      username: 'aarav',
    },
    id: 'fji3490kfns4',
    images: [],
    likes: 6000,
    recasts: 22,
    replies: [],
    updatedAt: '2024-06-16T10:15:45Z',
  },
  {
    comment:
      'Proud to announce that we have reached 10,000 active users! 🎉 Thank you to our amazing community for the support. Here’s to many more milestones! #milestone #community Proud to announce that we have reached 10,000 active users! 🎉 Thank you to our amazing community for the support. Here’s to many more milestones! #milestone #communit Proud to announce that we have reached 10,000 active users! 🎉 Thank you to our amazing community for the support. Here’s to many more milestones! #milestone #community',
    createdAt: '2024-06-18T09:00:00Z',
    createdBy: {
      avatar: 'https://res.cloudinary.com/dxnd4k222/image/upload/fl_preserve_transparency/v1718723895/Avatar_khczwg.jpg',
      id: 'fj9384jkdks',
      name: 'Zara',
      username: 'zara',
    },
    id: 'fj9384jkdks5',
    images: [],
    likes: 7500,
    recasts: 30,
    replies: [],
    updatedAt: '2024-06-18T09:00:00Z',
  },
];

const holders = [
  { name: 'drippy.eth', amount: 95100000, avatarURL: 'https://res.cloudinary.com/dxnd4k222/image/upload/fl_preserve_transparency/v1718723895/Avatar_khczwg.jpg' },
  { name: 'Evans', amount: 25700000, avatarURL: 'https://res.cloudinary.com/dxnd4k222/image/upload/fl_preserve_transparency/v1718723894/Avatar_1_rg5wgw.jpg' },
  { name: 'CJ', amount: 7510000, avatarURL: 'https://res.cloudinary.com/dxnd4k222/image/upload/fl_preserve_transparency/v1718723894/Avatar_2_ch4dwg.jpg' },
  { name: 'tammmy', amount: 95100000, avatarURL: 'https://res.cloudinary.com/dxnd4k222/image/upload/fl_preserve_transparency/v1718723894/Avatar_3_jhomgx.jpg' },
  { name: 'rossnothere', amount: 64000000, avatarURL: 'https://res.cloudinary.com/dxnd4k222/image/upload/fl_preserve_transparency/v1718723894/Avatar_4_dlvjwk.jpg' },
];

const leaderboardData: TableItem[] = [
  {
    name: 'choco.eth',
    walletAvatarURL: 'https://res.cloudinary.com/dxnd4k222/image/upload/fl_preserve_transparency/v1718723895/Avatar_khczwg.jpg',
    points: 95100000,
    userType: 'farcaster',
  },
  {
    name: 'meister.eth',
    walletAvatarURL: 'https://res.cloudinary.com/dxnd4k222/image/upload/fl_preserve_transparency/v1718723894/Avatar_1_rg5wgw.jpg',
    points: 45000000,
    userType: 'farcaster',
  },
  {
    wallet: '0x123456789012345678901234567890',
    points: 95100000,
    userType: 'wallet',
  },
  {
    name: 'zamfara',
    walletAvatarURL: 'https://res.cloudinary.com/dxnd4k222/image/upload/fl_preserve_transparency/v1718723894/Avatar_2_ch4dwg.jpg',
    points: 510000,
    userType: 'farcaster',
  },
  {
    name: '!static',
    walletAvatarURL: 'https://res.cloudinary.com/dxnd4k222/image/upload/fl_preserve_transparency/v1718723894/Avatar_4_dlvjwk.jpg',
    points: 450000,
    userType: 'farcaster',
  },
  {
    wallet: '0x123456789012345678901234567890',
    points: 95100,
    userType: 'wallet',
  },
  {
    wallet: '0x123456789012345678901234567890',
    points: 51000,
    userType: 'wallet',
  },
  {
    wallet: '0x123456789012345678901234567890',
    points: 10000,
    userType: 'wallet',
  },
];

export { tokenDetailData, transactionsData, holdingsData, periods, generateData, comments, holders, leaderboardData };
