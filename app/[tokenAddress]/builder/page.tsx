import { BuilderView } from '@/views';

interface PageProps {
  params: {
    tokenAddress: string;
  };
}

const Builder = ({ params: { tokenAddress } }: PageProps) => {
  return <BuilderView tokenId={tokenAddress} />;
};

export default Builder;
