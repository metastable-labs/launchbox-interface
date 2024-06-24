import { Address } from 'viem';
import { axiosInstance } from '@/utils/axios';
import { Transaction } from './types';

type ITransaction = {
  fetchTokenTransactions: (id: string) => Promise<Transaction[]>;
};

const transaction: ITransaction = {
  fetchTokenTransactions: async (id: string): Promise<Transaction[]> => {
    const response = await axiosInstance.get(`launchbox/tokens/${id}/transactions`);

    return response.data?.data;
  },
};

export default transaction;
