import { TokensView } from '@/views';
import { PageProps } from '@/app/type';

const Tokens = ({ params }: PageProps) => {
  return <TokensView network={params.network} />;
};

export default Tokens;
