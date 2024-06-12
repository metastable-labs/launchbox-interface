type TokenDetailData = {
  name: string;
  tokenSymbol: string;
  tokenAddress: string;
  tokenImageURL: string;
  siteConfigLink: string;
  networkBadgeURL: string;
  amount: number;
  change: number;
};

interface ILiquidityChart {
  liquidityData: { date: Date; value: number }[];
}

interface IOverview {
  tokenDetailData: TokenDetailData;
}
