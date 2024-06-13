import { axiosInstance } from '@/utils/axios';
import { Token } from './types';

type IToken = {
  fetchTokens: () => Promise<Token[]>;
  fetchToken: (id: string) => Promise<Token>;
  createToken: (data: FormData) => Promise<Token>;
};

const token: IToken = {
  fetchTokens: async (): Promise<Token[]> => {
    const response = await axiosInstance.get(`launchbox/tokens`);

    return response.data?.data;
  },

  fetchToken: async (id: string): Promise<Token> => {
    const response = await axiosInstance.get(`launchbox/tokens/${id}`);

    return response.data?.data;
  },

  createToken: async (data: FormData): Promise<Token> => {
    const response = await axiosInstance.post(`launchbox/tokens`, data);

    return response.data?.data;
  },
};

export default token;
