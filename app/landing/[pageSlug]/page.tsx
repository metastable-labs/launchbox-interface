'use client';

import useTokenActions from '@/store/token/actions';
import { TokenLandingPageView } from '@/views';
import { useEffect } from 'react';

interface TokenLandingPageProps {
  params: {
    pageSlug: string;
  };
}

const TokenLandingPage = ({ params: { pageSlug } }: TokenLandingPageProps) => {
  const { getToken } = useTokenActions();

  useEffect(() => {
    getToken(pageSlug);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pageSlug]);
  return <TokenLandingPageView />;
};

export default TokenLandingPage;
