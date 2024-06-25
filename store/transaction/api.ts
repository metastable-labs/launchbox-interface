import { axiosInstance } from '@/utils/axios';
import { TransactionResponse } from './types';

type ITransaction = {
  fetchTokenTransactions: (id: string, query?: string) => Promise<TransactionResponse>;
};

const transaction: ITransaction = {
  fetchTokenTransactions: async (id: string, query?: string): Promise<TransactionResponse> => {
    const response = await axiosInstance.get(`launchbox/tokens/${id}/transactions?${query}`);

    return response.data;
  },
};

export default transaction;
