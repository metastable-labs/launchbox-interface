import { Network } from "@/components/button/types";
import TokenDetailsView from "@/views/token-detail";

interface TokenDetailsProps {
  params: { tokenId: string; network: Network };
}

const TokenDetails = ({ params: { network, tokenId } }: TokenDetailsProps) => {
  return <TokenDetailsView tokenId={tokenId} network={network} />;
};

export default TokenDetails;
