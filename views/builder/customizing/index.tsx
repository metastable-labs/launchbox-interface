'use client';
import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';

import { ICustomizeInterface, Tabs } from './types';
import Appearance from './appearance';
import Footer from './footer';
import Hero from './hero';
import Navigation from './navigation';
import Tokenomics from './tokenomics';
import InactiveTabs from './inactive-tabs';

const CustomizingInterface = ({ handleChange, data, setLogoFile, setHeroImageFile }: ICustomizeInterface) => {
  const [activeTab, setActiveTab] = useState<Tabs>('undefined');

  const handleTabChange = (tab: Tabs) => {
    if (tab === activeTab) {
      return setActiveTab('undefined');
    }

    return setActiveTab(tab);
  };

  const appearanceData = {
    handleChange,
    onClick: handleTabChange,
    isActive: activeTab === 'appearance',
    primaryColor: data.primaryColor,
    secondaryColor: data.secondaryColor,
  };

  const navigationData = {
    handleChange,
    onClick: handleTabChange,
    isActive: activeTab === 'navigation',
    handleLogoFile: setLogoFile,
    buyLink: data.buyLink,
    logoURL: data.logoURL,
    navButtonText: data.navButtonText,
  };

  const heroData = {
    handleChange,
    onClick: handleTabChange,
    isActive: activeTab === 'hero',
    heroTitle: data.heroTitle,
    heroDescription: data.heroDescription,
    heroImageURL: data.heroImageURL,
    handleHeroImageFile: setHeroImageFile,
  };

  const tokenomicsData = {
    handleChange,
    onClick: handleTabChange,
    isActive: activeTab === 'tokenomics',
    tokenDistributions: data.tokenDistributions,
    tokenTotalSupply: data.tokenTotalSupply,
  };

  const footerData = {
    handleChange,
    onClick: handleTabChange,
    isActive: activeTab === 'footer',
    chainExplorerLink: data.chainExplorerLink,
    farcasterLink: data.farcasterLink,
    telegramLink: data.telegramLink,
    xLink: data.xLink,
  };

  const items = [
    <InactiveTabs key="undefined" onClick={handleTabChange} />,
    <Appearance key="appearance" {...appearanceData} />,
    <Navigation key="navigation" {...navigationData} />,
    <Hero key="hero" {...heroData} />,
    <Tokenomics key="tokenomics" {...tokenomicsData} />,
    <Footer key="footer" {...footerData} />,
  ];

  return (
    <div className="flex flex-col items-stretch gap-4 min-w-full min-h-full transition-all ease-in-out duration-700">
      <AnimatePresence mode="popLayout">
        <motion.div key={activeTab} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.5 }}>
          {items.find((item) => item.key === activeTab)}
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

export default CustomizingInterface;
