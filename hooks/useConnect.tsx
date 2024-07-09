import { useEffect } from 'react';
import { useAccount } from 'wagmi';
import { base } from 'wagmi/chains';
import { usePrivy } from '@privy-io/react-auth';
import { switchChain } from '@wagmi/core';
import { wagmiConfig } from '@/config/privy-provider';

const useConnect = () => {
  const { connector, chainId } = useAccount();
  const { ready, authenticated } = usePrivy();

  const listener = async () => {
    if (chainId && authenticated && ready) {
      if (chainId !== base.id) {
        await switchChain(wagmiConfig, { chainId: base.id });
      }
    }
  };

  useEffect(() => {
    listener();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [chainId, authenticated]);

  return {
    connector,
  };
};

export default useConnect;
