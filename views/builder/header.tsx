import { AnimatePresence, motion } from 'framer-motion';
import classNames from 'classnames';

import { LBClickAnimation } from '@/components';
import { BackIcon, CloseAltIcon, DesktopIcon, ExternalLinkIcon, PhoneIcon } from '@/public/icons';

const Header = ({ externalLink, hideCoustomize, shouldHideCustomize, publish, publishActive, save, saveActive, setDisplay, displayType }: HeaderProps) => {
  const icons = [<CloseAltIcon key={1} />, <BackIcon key={0} />];
  const displays = [
    {
      icon: <DesktopIcon />,
      onClick: () => setDisplay('desktop'),
      type: 'desktop' as DisplayType,
    },
    {
      icon: <PhoneIcon />,
      onClick: () => setDisplay('mobile'),
      type: 'mobile' as DisplayType,
    },
  ];

  const actions = [
    { actionText: 'Save', onClick: save, active: saveActive },
    { actionText: 'Publish', onClick: publish, active: publishActive },
  ];

  return (
    <header className="fixed w-screen h-16 z-30 flex justify-between items-center px-5 md:px-8 border-b border-b-primary-50 bg-primary-3300 font-Clash-Display">
      <div className="flex items-center justify-center gap-4">
        <LBClickAnimation onClick={hideCoustomize} className="p-2 border border-primary-1950 shadow-table-cta bg-white rounded-lg flex, items-center justify-center">
          <AnimatePresence mode="popLayout">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} key={shouldHideCustomize ? 0 : 1}>
              {icons[shouldHideCustomize ? 0 : 1]}
            </motion.div>
          </AnimatePresence>
        </LBClickAnimation>

        <AnimatePresence mode="popLayout">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            key={shouldHideCustomize ? 0 : 1}
            className="text-primary-700 text-[16px] leading-[20px] font-medium min-w-[164px]">
            {shouldHideCustomize ? 'Back to customize' : 'Customize token page'}
          </motion.div>
        </AnimatePresence>
      </div>

      <div className="flex items-center justify-center gap-5">
        {displays.map(({ icon, onClick, type }, index) => (
          <LBClickAnimation
            key={icon.toString()}
            onClick={onClick}
            className={classNames('p-2 border border-primary-1950 shadow-table-cta rounded-lg flex, items-center justify-center transition-colors duration-300 ease-in-out', {
              'bg-primary-50': type === displayType,
              'bg-white': type != displayType,
            })}>
            {icon}
          </LBClickAnimation>
        ))}
      </div>

      <div className="flex items-center justify-center gap-2">
        <a href={externalLink} target="_blank">
          <LBClickAnimation className="p-3 border border-primary-1950 shadow-table-cta bg-white rounded-lg flex, items-center justify-center">
            <ExternalLinkIcon color="#0A0D14" />
          </LBClickAnimation>
        </a>

        {actions.map(({ actionText, onClick, active }, index) => (
          <LBClickAnimation
            key={actionText}
            onClick={onClick}
            className={classNames('px-4 py-2.5 shadow-table-cta rounded-lg flex items-center justify-center font-medium transition-colors duration-300 ease-in-out border', {
              'border-primary-1950 bg-white text-primary-2000': index === 0 && active,
              'border-primary-2100 bg-primary-3350 text-white': index === 1 && active,
              'border-primary-950 text-primary-2050 bg-white pointer-events-none': !active,
              'bg-white': index === 0 && !active,
              'bg-primary-2150': index === 1 && !active,
            })}>
            {actionText}
          </LBClickAnimation>
        ))}
      </div>
    </header>
  );
};

export default Header;
