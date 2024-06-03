import { TokensView } from "@/views";
import { Network } from "@/components/button/types";

interface PageProps {
  params: { network: Network };
}

const Tokens = ({ params }: PageProps) => {
  return <TokensView network={params.network} />;
};

export default Tokens;
