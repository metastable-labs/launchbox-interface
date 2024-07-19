import { Address } from 'viem';

import { axiosInstance } from '@/utils/axios';
import { GetSystemIncentiveChannels, ActivateIncentiveProps, ActivateIncentiveResponse, DeleteIncentiveProps, GetTokenIncentives, AllLeaderboard, GetRankPosition } from './types';

type IIncentive = {
  fetchSystemIncentiveChannels: () => Promise<GetSystemIncentiveChannels[]>;
  fetchTokenIncentives: (tokenId: string) => Promise<GetTokenIncentives>;
  activateIncentive: (id: string, data: ActivateIncentiveProps) => Promise<ActivateIncentiveResponse>;
  deleteIncentive: (id: string, data: DeleteIncentiveProps) => Promise<ActivateIncentiveResponse>;
  fetchAllLeaderboard: (tokenId: string, query: string) => Promise<AllLeaderboard>;
  fetchRankPostion: (tokenId: string, address: Address) => Promise<GetRankPosition>;
};

const incentive: IIncentive = {
  fetchSystemIncentiveChannels: async (): Promise<GetSystemIncentiveChannels[]> => {
    const response = await axiosInstance.get(`launchbox/incentive_channels`);

    return response.data;
  },

  fetchTokenIncentives: async (tokenId: string): Promise<GetTokenIncentives> => {
    const response = await axiosInstance.get(`launchbox/tokens/${tokenId}/ranking`);

    return response.data?.data;
  },

  activateIncentive: async (id: string, data: ActivateIncentiveProps): Promise<ActivateIncentiveResponse> => {
    const response = await axiosInstance.post(`launchbox/tokens/${id}/incentives`, data);

    return response.data;
  },

  deleteIncentive: async (id: string, data: DeleteIncentiveProps): Promise<ActivateIncentiveResponse> => {
    const response = await axiosInstance.delete(`launchbox/tokens/${id}/incentives`, { data });

    return response.data;
  },

  fetchAllLeaderboard: async (tokenId: string, query: string): Promise<AllLeaderboard> => {
    const response = await axiosInstance.get(`launchbox/tokens/${tokenId}/leaderboard?${query}`);

    return response?.data;
  },

  fetchRankPostion: async (tokenId: string, address: Address): Promise<GetRankPosition> => {
    const response = await axiosInstance.get(`launchbox/tokens/${tokenId}/rank?adddress=${address}`);

    return response?.data;
  },
};

export default incentive;
