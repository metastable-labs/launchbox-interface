import { TokenView } from '@/views';
import { PageProps } from '@/app/types';

const Token = ({ params }: PageProps) => {
  return <TokenView network="base" />;
};

export default Token;
