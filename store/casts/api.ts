import { axiosInstance } from '@/utils/axios';
import { CastAnalytics, CastResponse } from './types';

type ICast = {
  fetchChannelCasts: (id: string, query?: string) => Promise<CastResponse>;
  fetchChannelCastAnalytics: (id: string, query?: string) => Promise<CastAnalytics>;
};

const cast: ICast = {
  fetchChannelCasts: async (id: string, query?: string): Promise<CastResponse> => {
    const response = await axiosInstance.get(`launchbox/tokens/${id}/casts?${query}`);

    return response.data;
  },

  fetchChannelCastAnalytics: async (id: string, query?: string): Promise<CastAnalytics> => {
    const response = await axiosInstance.get(`launchbox/tokens/${id}/channel-analytics?${query}`);

    return response?.data?.data;
  },
};

export default cast;
