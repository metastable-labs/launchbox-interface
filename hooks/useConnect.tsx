import { useEffect } from 'react';
import { useAccount, useSwitchChain, useChainId } from 'wagmi';
import { base } from 'wagmi/chains';
import { usePrivy } from '@privy-io/react-auth';

const useConnect = () => {
  const { connector } = useAccount();
  const chainId = useChainId();
  const { switchChain } = useSwitchChain();
  const { ready, authenticated } = usePrivy();

  const listener = () => {
    if (chainId && authenticated && ready) {
      if (chainId !== base.id) {
        return switchChain && switchChain({ chainId: base.id });
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
