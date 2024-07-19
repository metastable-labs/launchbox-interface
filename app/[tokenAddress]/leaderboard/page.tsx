import PublicLeaderboard from '@/views/publicLeaderboard';

interface PageProps {
  params: {
    tokenAddress: string;
  };
}

const Builder = ({ params: { tokenAddress } }: PageProps) => {
  return <PublicLeaderboard tokenAddress={tokenAddress} />;
};

export default Builder;
