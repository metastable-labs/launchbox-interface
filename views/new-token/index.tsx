'use client';
import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';

import { LBContainer } from '@/components';
import { Network } from '@/components/button/types';
import Step1 from './step-1';
import Step2 from './step-2';
import PrimaryHeader from './primary-header';
import SecondaryHeader from './secondary-header';
import { NewTokenData } from './types';

const NewTokenView = () => {
  const [step, setStep] = useState(0);
  const [newTokenData, setNewTokenData] = useState<NewTokenData>();

  const steps = [<Step1 setStep={setStep} key={0} setNewTokenData={setNewTokenData} />, <Step2 key={1} tokenData={newTokenData} setStep={setStep} />];
  return (
    <LBContainer>
      <div className="pt-12 flex flex-col gap-8 lg:px-8 items-center pb-14">
        <PrimaryHeader />

        <div className="w-full flex flex-col self-stretch items-center justify-center gap-6">
          <SecondaryHeader setStep={setStep} step={step} />
          <AnimatePresence mode="popLayout">
            <motion.div key={step} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
              {steps[step]}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </LBContainer>
  );
};

export default NewTokenView;
