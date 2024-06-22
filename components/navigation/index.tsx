'use client';

import { useState } from 'react';
import { usePathname } from 'next/navigation';
import classNames from 'classnames';
import { useAccount } from 'wagmi';
import { useConnectModal } from '@rainbow-me/rainbowkit';

import Left from './left';
import Right from './right';
import Menu from './menu';
import { BuyAndSellIcon, PlusIcon, QuestionIcon, TokenIcon } from '@/public/icons';
import { INavLinks, INavActions, ILBNavigation } from './types';
import LBModal from '../modal';
import { ModalType } from './modals/types';
import WalletModal from './modals/wallet';
import NetworkModal from './modals/network';

const LBNavigation = ({ network }: ILBNavigation) => {
  const { address, isConnected } = useAccount();
  const { openConnectModal } = useConnectModal();
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);
  const [modalType, setModalType] = useState<ModalType>();

  const links: INavLinks = [
    {
      title: 'My Tokens',
      icon: <TokenIcon />,
      href: '/token',
      isActive: false,
    },
    {
      title: 'Create',
      icon: <PlusIcon color="#0A0D14" />,
      href: '/token/new',
      isActive: false,
    },
    {
      title: 'Buy/Sell',
      icon: <BuyAndSellIcon />,
      href: '/',
      isActive: false,
    },
    {
      title: 'How it works',
      icon: <QuestionIcon />,
      href: '/faq',
      isActive: false,
    },
  ];

  const updatedLinks = links.map((link) => {
    const absolutePaths = ['/token', '/faq', '/builder'];
    const isHomeOrTokenId = link.href === '/' && (pathname === '/' || (/^\/[a-zA-Z0-9]+$/.test(pathname) && !absolutePaths.includes(pathname)));
    return {
      ...link,
      isActive: link.href === pathname || isHomeOrTokenId,
    };
  });

  const toggleMenu = () => setMenuOpen((prev) => !prev);

  const closeModal = () => setModalType(undefined);

  const handleModal = (type: ModalType) => {
    if (type === 'wallet' && !isConnected && openConnectModal) {
      return openConnectModal();
    }
    setModalType(type);
  };

  const actionItems: INavActions = [
    {
      variant: 'network',
      isVisibile: isConnected,
      onClick: () => handleModal('network'),
    },
    {
      text: address || 'Connect wallet',
      variant: 'wallet',
      isVisibile: true,
      onClick: () => {
        if (!isConnected && openConnectModal) {
          return openConnectModal();
        }

        return handleModal('wallet');
      },
    },
  ];

  if (pathname === '/builder' || pathname === '/leaderboard') return;

  return (
    <>
      <div className={classNames('fixed w-screen z-10 flex justify-center items-center md:pt-0 bg-white border-b border-primary-50')}>
        <nav className="flex-1 flex bg-white px-4 py-[14px] md:px-11 md:py-5 items-center justify-between relative">
          <Left links={updatedLinks} />
          <Right menuOpen={menuOpen} toggleMenu={toggleMenu} actionItems={actionItems} />

          <Menu menuOpen={menuOpen} links={updatedLinks} actionItems={actionItems} />
        </nav>

        <LBModal show={Boolean(modalType)} close={closeModal}>
          {modalType === 'wallet' && <WalletModal close={closeModal} />}
          {modalType === 'network' && <NetworkModal close={closeModal} />}
        </LBModal>
      </div>
      <div className="h-[68.54px] md:h-[82px]" />
    </>
  );
};

export default LBNavigation;
