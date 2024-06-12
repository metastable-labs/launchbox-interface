import { NewTokenView } from '@/views';
import { PageProps } from '@/app/types';

const NewTokens = ({ params }: PageProps) => {
  return <NewTokenView network="base" />;
};

export default NewTokens;
