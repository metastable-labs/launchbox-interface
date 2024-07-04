import { Address } from 'viem';

interface ILBComment {
  id: string;
  createdAt: string;
  updatedAt?: string;
  createdBy: {
    profileName: string;
    userAddress: Address;
    profileImage: string;
  };
  comment: string;
  images: string[];
  replies: number;
  recasts: number;
  likes: number;
}

export type { ILBComment };
