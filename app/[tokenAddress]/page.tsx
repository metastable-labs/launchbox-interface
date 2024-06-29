import { TokenDetailsView } from '@/views';

const TokenDetail = ({ params: { tokenAddress } }: PageProps) => {
  return <TokenDetailsView tokenAddress={tokenAddress} />;
};

export default TokenDetail;
