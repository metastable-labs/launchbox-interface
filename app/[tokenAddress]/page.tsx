import type { Metadata } from 'next';

import { TokenDetailsView } from '@/views';
import { Token } from '@/store/token/types';

interface TokenDetailProps {
  params: {
    tokenAddress: string;
  };
}

const getData = async (tokenAddress: string): Promise<Token> => {
  const token = await fetch(`https://api.supermigrate.xyz/v1/launchbox/tokens/${tokenAddress}`);

  const response = await token.json();

  return response?.data;
};

export async function generateMetadata({ params: { tokenAddress } }: TokenDetailProps): Promise<Metadata> {
  // fetch data
  const token = await getData(tokenAddress);

  return {
    themeColor: '#000000',
    title: token.token_name,
    openGraph: {
      images: [
        {
          url: token.token_logo_url,
        },
      ],
      description: `trade $${token.token_symbol} on launchbox`,
      type: 'website',
      title: `Launchbox ~ ${token.token_name}`,
      siteName: 'launchbox-interface.vercel.app',
      url: `https://launchbox-interface.vercel.app/${token.token_address}`,
    },
    twitter: {
      images: [
        {
          url: token.token_logo_url,
        },
      ],
      description: `trade $${token.token_symbol} on launchbox`,
      title: `Launchbox ~ ${token.token_name}`,
      site: 'launchbox-interface.vercel.app',
      card: 'summary_large_image',
    },
  };
}

const TokenDetail = ({ params: { tokenAddress } }: TokenDetailProps) => {
  return <TokenDetailsView tokenAddress={tokenAddress} />;
};

export default TokenDetail;
