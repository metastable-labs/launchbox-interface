import { Address } from 'viem';
import { axiosInstance } from '@/utils/axios';
import { FarcaterChannel } from './types';

type ISocial = {
  fetchFarcasterChannels: (address: Address) => Promise<FarcaterChannel[]>;
};

const social: ISocial = {
  fetchFarcasterChannels: async (address: Address): Promise<FarcaterChannel[]> => {
    const response = await axiosInstance.get(`launchbox/channels/${address}`);

    return response.data?.data;
  },
};

export default social;
