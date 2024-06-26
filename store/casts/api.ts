import { axiosInstance } from '@/utils/axios';
import { CastResponse } from './types';

type ICast = {
  fetchChannelCasts: (id: string, query?: string) => Promise<CastResponse>;
};

const cast: ICast = {
  fetchChannelCasts: async (id: string, query?: string): Promise<CastResponse> => {
    const response = await axiosInstance.get(`launchbox/tokens/${id}/casts?${query}`);

    return response.data;
  },
};

export default cast;
