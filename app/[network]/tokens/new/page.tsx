import { NewTokenView } from "@/views";
import { Network } from "@/components/button/types";

interface PageProps {
  params: { network: Network };
}

const NewTokens = ({ params }: PageProps) => {
  return <NewTokenView network={params.network} />;
};

export default NewTokens;
