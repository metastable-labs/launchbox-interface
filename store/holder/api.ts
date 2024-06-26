import { axiosInstance } from '@/utils/axios';
import { HolderResponse } from './types';

type IHolder = {
  fetchTokenHolders: (id: string, query?: string) => Promise<HolderResponse>;
};

const holder: IHolder = {
  fetchTokenHolders: async (id: string, query?: string): Promise<HolderResponse> => {
    const response = await axiosInstance.get(`launchbox/tokens/${id}/holders?${query}`);

    return response.data;
  },
};

export default holder;
