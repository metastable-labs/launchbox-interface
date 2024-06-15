import { TokenDetailsView } from '@/views';
import { PageProps } from '../types';

const TokenDetail = ({ params: { tokenAddress } }: PageProps) => {
  return <TokenDetailsView tokenAddress={tokenAddress} />;
};

export default TokenDetail;
