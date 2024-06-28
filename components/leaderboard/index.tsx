import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import classNames from 'classnames';
import Image from 'next/image';

import { CopyIcon, UserIcon, CoinIcon, LinkIcon, RoundedCloseIcon } from '@/public/icons';
import LBClickAnimation from '../click-animation';
import LBTable from '../table';
import { leaderboardData } from '@/views/token-detail/dummy';
import { formatNumber } from '@/utils/helpers';

const dummyUser: ILBLeaderboardUser = {
  name: 'Choco',
  avatar: 'https://res.cloudinary.com/dxnd4k222/image/upload/fl_preserve_transparency/v1718723895/Avatar_khczwg.jpg',
  type: 'farcaster',
  position: 1,
};

const LBLeaderboard = ({ variant = 'private' }: ILBLeaderboard) => {
  const [user, setUser] = useState<ILBLeaderboardUser>();
  const [showCheckScore, setShowCheckScore] = useState(true);

  const actions = [
    {
      type: 'inactive',
      show: true,
      items: [
        {
          icon: <UserIcon />,
          text: `${(40_678).toLocaleString()}`,
          secondaryText: 'Participants',
        },
        {
          icon: <CoinIcon />,
          text: `${formatNumber(22_700_000).toUpperCase()}`,
          secondaryText: 'Total Points',
        },
      ],
    },
    {
      type: 'active',
      show: variant === 'private',
      items: [
        {
          icon: <LinkIcon />,
          text: 'Public link',
          secondaryText: undefined,
        },
        {
          icon: <CopyIcon />,
          text: 'Embed',
          secondaryText: undefined,
        },
      ],
    },
  ];

  const handleFindUser = () => setUser(dummyUser);

  return (
    <div
      className={classNames('self-stretch flex-1 flex flex-col gap-6 relative min-h-full overflow-auto', {
        'p-6 rounded-lg border border-primary-50 mx-5 min-h-[80vh] mb-10': variant === 'public',
      })}>
      <h1 className="text-primary-650 text-[24px] leading-[38px] font-medium">Leaderboard</h1>

      <div className="flex items-center justify-between flex-wrap gap-4">
        {actions.map(({ type, items, show }) => (
          <div key={type} className="flex items-center gap-2 flex-wrap">
            {items.map(({ icon, text, secondaryText }) => (
              <LBClickAnimation
                key={text}
                className={classNames('px-3.5 py-2.5 rounded-lg border border-primary-1950 flex items-center bg-white shadow-table-cta', {
                  'pointer-events-none gap-1': type === 'inactive',
                  hidden: !show,
                  'md:gap-1': type === 'active',
                })}>
                {icon}
                <p className={classNames('flex items-center justify-center gap-1 text-primary-2000 text-sm font-medium', { 'md:px-0.5': type == 'active', 'px-0.5': type === 'inactive' })}>
                  <span className={classNames('', { 'hidden md:block': type === 'active' })}>{text}</span>
                  <span className="hidden md:block">{secondaryText}</span>
                </p>
              </LBClickAnimation>
            ))}
          </div>
        ))}
      </div>

      <div className={classNames('overflow-auto pb-20', { 'max-h-[50vh]': variant === 'private', 'max-h-[470px]': variant === 'public' })}>
        <LBTable data={leaderboardData} variant="secondaryAlt" />
      </div>

      <AnimatePresence>
        {showCheckScore && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="min-w-full absolute bottom-0 left-0 px-[53px] pb-[30px] flex items-center justify-center">
            <div className={classNames('w-full px-3.5 py-2.5 rounded-lg border border-primary-1950 md:flex items-center justify-center md:justify-between bg-white shadow-landing-nav', { '': !user })}>
              <span className="hidden md:block px-4 py-2.5 rounded-lg border border-primary-1950 shadow-table-cta">#{user ? user.position : '??'}</span>

              <>
                {user && (
                  <div className="hidden md:flex items-center gap-1 py-1 pl-1 pr-2 justify-center bg-primary-200 rounded-full">
                    <Image src={user.avatar} alt="avatar" width={500} height={500} className="w-4 h-4 object-cover rounded-full" />
                    <span className="text-primary-250 text-[14px] leading-[21px] font-medium">{user.name}</span>{' '}
                  </div>
                )}

                {!user && (
                  <div className="hidden md:flex items-center justify-center gap-1.5">
                    <CoinIcon />
                    <span className="text-primary-2000 text-sm font-medium">Where are you on the leaderboard?</span>
                  </div>
                )}
              </>

              <div
                className={classNames('flex items-center', {
                  'justify-between': user,
                  'justify-center': !user,
                })}>
                <LBClickAnimation
                  onClick={handleFindUser}
                  className={classNames('py-2 px-3 md:px-3.5 md:py-2.5 rounded-lg border border-primary-1950 shadow-table-cta w-fit', {
                    'pointer-events-none': user,
                  })}>
                  <span className="text-primary-2000 text-sm font-medium">{user ? "You're on the table!" : 'Check your score'}</span>
                </LBClickAnimation>

                {user && (
                  <LBClickAnimation className="md:hidden" onClick={() => setShowCheckScore(false)}>
                    <RoundedCloseIcon />
                  </LBClickAnimation>
                )}
              </div>

              {user && (
                <div className="mt-3 flex items-center gap-3 md:hidden">
                  <span className="px-3.5 py-2.5 rounded-lg border border-primary-1950 shadow-table-cta">#{user.position}</span>
                  <div className="flex items-center gap-1 py-1 pl-1 pr-2 justify-center bg-primary-200 rounded-full">
                    <Image src={user.avatar} alt="avatar" width={500} height={500} className="w-4 h-4 object-cover rounded-full" />
                    <span className="text-primary-250 text-[14px] leading-[21px] font-medium">{user.name}</span>{' '}
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default LBLeaderboard;
