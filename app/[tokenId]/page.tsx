import { TokenDetailsView } from '@/views';
import { PageProps } from '../types';

const TokenDetail = ({ params: { tokenId } }: PageProps) => {
  return <TokenDetailsView tokenId={tokenId} network="base" />;
};

export default TokenDetail;
