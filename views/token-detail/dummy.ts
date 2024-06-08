import { TableItem } from "@/components/table/types";

const tokenDetailData = {
  name: "Satosh",
  symbol: "SAT",
  tokenAddress: "0x1234567890123456789012345678901234567890",
  tokenImageURL:
    "https://res.cloudinary.com/dxnd4k222/image/upload/fl_preserve_transparency/v1717743095/crypto-icon-instance_ygqnhb.jpg",
  siteConfigLink: "https://satoshis.com",
  networkBadgeURL:
    "https://res.cloudinary.com/dxnd4k222/image/upload/fl_preserve_transparency/v1717743095/Badge_1.0_issdfx.jpg",
  amount: 456.86,
  change: -12.34,
};

const transactionsData: TableItem[] = [
  {
    wallet: "0x123456789012345678901234567890",
    walletAvatarURL:
      "https://res.cloudinary.com/dxnd4k222/image/upload/fl_preserve_transparency/v1717871583/Avatar_1.0_npmw4c.jpg",
    type: "buy",
    usdAmount: 13456.09,
    tokenAmount: 1430109,
    date: "2021-10-01T00:00:00Z",
  },
  {
    wallet: "0x123456789012345678901234567890",
    walletAvatarURL:
      "https://res.cloudinary.com/dxnd4k222/image/upload/fl_preserve_transparency/v1717871583/Avatar_1.0_1_gxydxc.jpg",
    type: "sell",
    usdAmount: 120,
    tokenAmount: 50005,
    date: "2021-10-01T00:00:00Z",
  },
  {
    wallet: "0x123456789012345678901234567890",
    walletAvatarURL:
      "https://res.cloudinary.com/dxnd4k222/image/upload/fl_preserve_transparency/v1717871583/Avatar_1.0_2_drwkq1.jpg",
    type: "buy",
    usdAmount: 3450.3,
    tokenAmount: 20090,
    date: "2021-10-01T00:00:00Z",
  },
  {
    wallet: "0x123456789012345678901234567890",
    walletAvatarURL:
      "https://res.cloudinary.com/dxnd4k222/image/upload/fl_preserve_transparency/v1717871583/Avatar_1.0_3_kgtkxs.jpg",
    type: "sell",
    usdAmount: 10,
    tokenAmount: 200,
    date: "2021-10-01T00:00:00Z",
  },
];

const holdingsData = [
  {
    wallet: "0x123456789012345678901234567890",
    walletAvatarURL:
      "https://res.cloudinary.com/dxnd4k222/image/upload/fl_preserve_transparency/v1717871583/Avatar_1.0_npmw4c.jpg",
    holding: 90.02,
  },
  {
    wallet: "0x123456789012345678901234567890",
    walletAvatarURL:
      "https://res.cloudinary.com/dxnd4k222/image/upload/fl_preserve_transparency/v1717871583/Avatar_1.0_1_gxydxc.jpg",
    holding: 10.98,
  },
  {
    wallet: "0x123456789012345678901234567890",
    walletAvatarURL:
      "https://res.cloudinary.com/dxnd4k222/image/upload/fl_preserve_transparency/v1717871583/Avatar_1.0_2_drwkq1.jpg",
    holding: 0,
  },
  {
    wallet: "0x123456789012345678901234567890",
    walletAvatarURL:
      "https://res.cloudinary.com/dxnd4k222/image/upload/fl_preserve_transparency/v1717871583/Avatar_1.0_3_kgtkxs.jpg",
    holding: 0,
  },
];

export { tokenDetailData, transactionsData, holdingsData };
