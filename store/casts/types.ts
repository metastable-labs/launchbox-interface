import { Address } from 'viem';

type CastResponse = {
  data: Cast[];
  meta: CastMeta;
};

type Cast = {
  castedAtTimestamp: string;
  url: string;
  text: string;
  numberOfReplies: number;
  numberOfRecasts: number;
  numberOfLikes: number;
  fid: string;
  castedBy: {
    profileName: string;
    userAddress: Address;
  };
  channel: {
    name: string;
    createdAtTimestamp: string;
    channelId: string;
    description: string;
    imageUrl: string;
    leadIds: string[];
    url: string;
    dappName: string;
    followerCount: number;
  };
};

type CastMeta = {
  take: number;
  skip: number;
  totalCount: number;
  social_capital: number;
  weekly_casts: number;
  weekly_casts_increased: boolean;
  weekly_casts_percentage_change: number;
};

type CastAnalytics = {
  percentageChange: number;
  isIncreased: boolean;
  dataPoints: {
    date: string;
    castsCount: number;
  }[];
};

export type { Cast, CastMeta, CastResponse, CastAnalytics };
