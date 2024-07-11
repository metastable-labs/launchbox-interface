import { AnimatePresence, motion } from 'framer-motion';

import { LBModal } from '@/components';
import useSystemFunctions from '@/hooks/useSystemFunctions';
import FarcasterConfiguration from './farcaster';
import NFTConfiguration from './nft';

const Configuration = ({ close, show, variant = 'farcaster' }: IConfiguration) => {
  const { socialState, tokenState } = useSystemFunctions();
  const { token } = tokenState;

  const channel = token?.socials?.warpcast?.channel;

  const hasHeader = !Boolean(socialState?.farcasterChannels?.length);
  const title = Boolean(channel) ? 'Configure action' : 'Select a channel';

  const items = [<FarcasterConfiguration close={close} key="farcaster" />, <NFTConfiguration close={close} key="nft" />];

  return (
    <LBModal show={show} close={close} variant="primary" hasHeader={hasHeader} title={title}>
      <AnimatePresence>
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
          {items.find((item) => item.key === variant)}
        </motion.div>
      </AnimatePresence>
    </LBModal>
  );
};

export default Configuration;
