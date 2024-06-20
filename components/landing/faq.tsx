'use client';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import classNames from 'classnames';

import { PlusCircleIcon, MinusCircleIcon } from '@/public/icons';
import LBContainer from '../container';
import { IFAQ } from './types';

interface IFaq {
  question: string;
  answer: string;
  current: boolean;
  onClick: () => void;
  isBuilder?: boolean;
  isMobile?: boolean;
  isDesktop?: boolean;
}

const Faq = ({ answer, current, onClick, question, isBuilder, isDesktop, isMobile }: IFaq) => {
  const icons = [<PlusCircleIcon key={0} />, <MinusCircleIcon key={1} />];

  return (
    <div
      className={classNames('flex items-start', {
        'bg-primary-2250 transition-colors duration-300 ': current,
        'p-5 md:p-8 gap-6 rounded-2xl flex-row-reverse md:flex-row w-full lg:max-w-[768px]': !isBuilder,
        'gap-3.5 p-5 rounded-[10.022px] flex-row w-[481px]': isBuilder && isDesktop,
        'gap-1.5 p-5 rounded-xl flex-row-reverse w-full': isBuilder && isMobile,
      })}>
      <AnimatePresence>
        <motion.button onClick={onClick} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="outline-none">
          {icons[+current]}
        </motion.button>
      </AnimatePresence>

      <div
        className={classNames('flex flex-col flex-1', {
          'gap-2': !isBuilder,
          'gap-[5.02px]': isBuilder && isDesktop,
          'gap-1.5': isBuilder && isMobile,
        })}>
        <p
          className={classNames('text-primary-650 font-medium', {
            'text-[18px] leading-[28px]': !isBuilder,
            'text-[17px] leading-[26.444px]': isBuilder && isDesktop,
            'text-[15.5px] leading-[25px]': isBuilder && isMobile,
          })}>
          {question}
        </p>

        <motion.p
          animate={{ height: current ? 'fit-content' : 0 }}
          className={classNames('text-primary-700', {
            'text-base': !isBuilder,
            'text-[15.111px] leading-[22.667px]': isBuilder && (isDesktop || isMobile),
          })}>
          <AnimatePresence>
            {current && (
              <motion.span initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                {answer}
              </motion.span>
            )}
          </AnimatePresence>
        </motion.p>
      </div>
    </div>
  );
};

const FAQ = ({ faqDescription, faqTitle, faqs, isBuilder, isDesktop, isMobile }: IFAQ) => {
  const [current, setCurrent] = useState(0);

  return (
    <LBContainer>
      <section
        className={classNames('flex flex-col', {
          'py-16 md:py-24 items-center px-4 gap-12 md:gap-16': !isBuilder,
          'py-[45px] items-center justify-between gap-[50.111px] w-full': isBuilder && isDesktop,
          'py-[45px] items-stretch justify-center gap-12 -mx-20 px-5': isBuilder && isMobile,
        })}>
        <div className="self-stretch w-full flex flex-col items-center gap-4 md:gap-5">
          <h1
            className={classNames('text-primary-650 font-semibold text-center', {
              'text-[30px] leading-[38px] lg:text-[36px] lg:leading-[44px] lg:tracking-[-0.72px]': !isBuilder,
              'text-[22.55px] leading-[27.561px] tracking-[-0.451px]': isBuilder && isDesktop,
              'text-[20px] leading-[25px]': isBuilder && isMobile,
            })}>
            {faqTitle}
          </h1>

          <p
            className={classNames('text-primary-700 text-center max-w-[768px]', {
              'text-[18px] leading-[28px] lg:text-[20px] lg:leading-[30px]': !isBuilder,
              'text-[12.528px] leading-[18.792px]': isBuilder && isDesktop,
              'text-[16px] leading-[23px]': isBuilder && isMobile,
            })}>
            {faqDescription}
          </p>
        </div>

        <div
          className={classNames('flex flex-col w-full items-center', {
            'gap-4': !isBuilder,
            '': isBuilder && isDesktop,
            '': isBuilder && isMobile,
          })}>
          {faqs.map((faq, index) => (
            <Faq key={index} {...faq} current={current === index} onClick={() => setCurrent(index)} isBuilder={isBuilder} isDesktop={isDesktop} isMobile={isMobile} />
          ))}
        </div>
      </section>
    </LBContainer>
  );
};

export default FAQ;
