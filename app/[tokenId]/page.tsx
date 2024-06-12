import { TokenDetailsView } from '@/views';
import { PageProps } from '../types';

const TokenDetail = ({ params: { tokenId } }: PageProps) => {
  return <TokenDetailsView tokenId={tokenId} />;
};

export default TokenDetail;
