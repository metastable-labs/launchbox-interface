import { TokenDetailsView } from '@/views';

const TokenDetail = ({ params: { tokenAddress } }: { params: { tokenAddress: string }; children?: React.ReactNode }) => {
  return <TokenDetailsView tokenAddress={tokenAddress} />;
};

export default TokenDetail;
