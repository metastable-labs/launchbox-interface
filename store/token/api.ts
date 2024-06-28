import { axiosInstance } from '@/utils/axios';
import { Token, Tokens } from './types';

type IToken = {
  fetchTokens: (query: string) => Promise<Tokens>;
  fetchToken: (id: string) => Promise<Token>;
  createToken: (data: FormData) => Promise<Token>;
};

const token: IToken = {
  fetchTokens: async (query: string): Promise<Tokens> => {
    const response = await axiosInstance.get(`launchbox/tokens?${query}`);

    const data = {
      tokens: response.data?.data,
      meta: response.data?.meta,
    };

    return data;
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
