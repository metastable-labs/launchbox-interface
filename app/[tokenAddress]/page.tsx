import { TokenDetailsView } from '@/views';

interface TokenDetailProps {
  params: {
    tokenAddress: string;
  };
}

const TokenDetail = ({ params: { tokenAddress } }: TokenDetailProps) => {
  return <TokenDetailsView tokenAddress={tokenAddress} />;
};

export default TokenDetail;
