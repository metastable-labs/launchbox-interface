type TableVariant = "primary" | "secondary";

interface TableItem {
  wallet?: string;
  walletAvatarURL?: string;
  type?: "buy" | "sell";
  usdAmount?: number;
  tokenAmount?: number;
  tokenSymbol?: string;
  date?: string;
  holding?: number;
}

interface IAddress {
  wallet?: string;
  walletAvatarURL?: string;
}

interface ILBTable {
  data: TableItem[];
  variant?: TableVariant;
  loading?: boolean;
  tokenSymbol?: string;
}

export type { TableItem, TableVariant, IAddress, ILBTable };
