'use client';
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import classNames from 'classnames';
import { useCookies } from 'react-cookie';

import { LBLandingPageComponent } from '@/components';
import { CustomizeChange, ILBLandingPageComponent } from '@/components/landing/types';
import Header from './header';
import { defaultData } from '../landing';
import CustomizingInterface from './customizing';

const externalLink = '#';

const BuilderView = () => {
  const [cookies, setCookie] = useCookies(['buildData']);
  const [buildData, setBuildData] = useState<ILBLandingPageComponent>(defaultData);
  const [displayType, setDisplayType] = useState<DisplayType>('desktop');
  const [shouldHideCustomize, setShouldHideCustomize] = useState(false);
  const [logoFile, setLogoFile] = useState<File | null>(null);
  const [heroImageFile, setHeroImageFile] = useState<File | null>(null);
  const [aboutImageFile, setAboutImageFile] = useState<File | null>(null);
  const [saveActive, setSaveActive] = useState(false);
  const [publishActive, setPublishActive] = useState(false);

  const hideCoustomize = () => setShouldHideCustomize((prev) => !prev);
  const publish = () => setPublishActive(false);
  const save = () => {
    setCookie('buildData', buildData, { path: '/', maxAge: 604800 });
    setSaveActive(false);
  };

  const handleChange = (name: CustomizeChange, value: any) => {
    setBuildData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const headerData = {
    externalLink,
    shouldHideCustomize,
    hideCoustomize,
    publish,
    publishActive,
    save,
    saveActive,
    setDisplay: setDisplayType,
    displayType,
  };

  const customisingInterfaceData = {
    setLogoFile,
    data: buildData,
    handleChange,
    setHeroImageFile,
    setAboutImageFile,
  };

  useEffect(() => {
    const storedBuildData = cookies.buildData;
    if (storedBuildData) {
      setBuildData(storedBuildData);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    setSaveActive(true);
    setPublishActive(true);
  }, [buildData]);

  return (
    <>
      <Header {...headerData} />

      <main
        className={classNames('flex h-full px-10', {
          'gap-8': !shouldHideCustomize,
        })}>
        <motion.div
          animate={{
            width: shouldHideCustomize ? 0 : '30%',
            opacity: shouldHideCustomize ? 0 : 1,
          }}
          className="h-screen overflow-auto pt-[112px] flex mb-10">
          <CustomizingInterface {...customisingInterfaceData} />
        </motion.div>

        <motion.div
          animate={{
            width: shouldHideCustomize ? '100%' : '70%',
            scale: shouldHideCustomize ? 1.02 : 1,
          }}
          className="h-screen overflow-auto flex justify-center pt-[112px]">
          <LBLandingPageComponent {...buildData} isBuilder isDesktop={displayType === 'desktop'} isMobile={displayType === 'mobile'} />
        </motion.div>
      </main>
    </>
  );
};

export default BuilderView;
