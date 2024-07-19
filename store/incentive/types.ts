import { Address } from 'viem';

type Metadata = {
  contract?: string;
  channel?: string;
};

type Incentive = {
  id: string;
  action_id: string;
  points: number;
  is_active: boolean;
  metadata: Metadata;
};

type Participant = {
  id: string;
  leaderboard_id: string;
  farcaster_username: string;
  associated_address: string;
};

type ActivateIncentiveAction = {
  id: string;
  points: number;
  metadata: Metadata;
};

type ActivateIncentiveProps = {
  actions: ActivateIncentiveAction[];
};

type DeleteIncentiveProps = {
  action_id: string;
};

type ActivateIncentiveResponse = {
  id: string;
  token_id: string;
  is_active: boolean;
  created_at: string;
  updated_at: string;
  incentives: Incentive[];
  participants: Participant[];
};

type GetRankPosition = {
  total_points: number;
  rank: number;
};

interface IncentiveAction {
  id: string;
  name: string;
  description: string;
  slug: string;
}

type GetSystemIncentiveChannels = {
  id: string;
  name: string;
  info: string;
  slug: string;
  actions: IncentiveAction[];
};

interface TokenIncentiveAction {
  id: string;
  name: string;
  info: string;
  slug: string;
  actions: {
    id: string;
    name: string;
    description: string;
    slug: string;
    points: number;
    metadata: {
      contract: string;
    };
  }[];
}

interface Participants {
  id: string;
  leaderboard_id: string;
  farcaster_username: string;
  associated_address: string;
  completed_actions: string[];
}

type GetTokenIncentives = {
  id: string;
  token_id: string;
  is_active: boolean;
  created_at: string;
  updated_at: string;
  incentives: TokenIncentiveAction[];
  participants: Participants[];
};

type Ranking = {
  points: number;
  address: Address;
  farcaster_username: string;
};

type AllLeaderboard = {
  ranking: Ranking[];
  total: number;
};

type AllLeaderboardMeta = {
  total?: number;
  take?: number;
  skip?: number;
};

export type {
  Incentive,
  ActivateIncentiveProps,
  DeleteIncentiveProps,
  ActivateIncentiveResponse,
  GetRankPosition,
  GetSystemIncentiveChannels,
  GetTokenIncentives,
  Ranking,
  AllLeaderboard,
  AllLeaderboardMeta,
};
