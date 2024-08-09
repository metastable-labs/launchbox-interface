import React from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import classNames from 'classnames';
import { Doughnut } from 'react-chartjs-2';
import { motion } from 'framer-motion';

import { IDistributionCard, ITokenomics } from './types';
import useScreenDetect from '@/hooks/useScreenDetect';

ChartJS.register(ArcElement, Tooltip, Legend);

const DistributionCard = ({ title, color, percentage, isBuilder, isDesktop, isMobile }: IDistributionCard) => {
  return (
    <div
      className={classNames('flex items-start bg-primary-1750 border-primary-200', {
        'p-[8.49px] gap-2 rounded-[6.37px] border-[0.531px] min-w-full lg:min-w-[200px] shadow-distribution-card-shadow': !isBuilder,
        'p-[5.32px] gap-[5.01px] rounded border-[0.333px] min-w-[125px] shadow-preview-distribution-card-shadow': isBuilder && isDesktop,
        'p-[8.49px] gap-2 rounded-[6.37px] border-[0.531px] min-w-full shadow-distribution-card-shadow': isBuilder && isMobile,
      })}>
      <div
        className={classNames('', {
          'pt-2': !isBuilder || (isBuilder && isMobile),
          'pt-[5.01px]': isBuilder && isDesktop,
        })}>
        <motion.div
          animate={{ backgroundColor: color }}
          className={classNames('rounded-full', {
            'min-w-5 min-h-5': !isBuilder || (isBuilder && isMobile),
            'w-[12.5px] h-[12.5px]': isBuilder && isDesktop,
          })}
        />
      </div>

      <div
        className={classNames('flex flex-col items-start justify-center text-primary-150', {
          'gap-3': !isBuilder || (isBuilder && isMobile),
          'gap-[7.52px]': isBuilder && isDesktop,
        })}>
        <span
          className={classNames('font-medium', {
            'text-[20px] leading-[30px] tracking-[-0.22px] lg:text-[24px] lg:leading-[36px] lg:tracking-[-0.264px]': !isBuilder,
            'text-[15.033px] leading-[22.55px] tracking-[-0.165px]': isBuilder && isDesktop,
            'text-[20px] leading-[30px] tracking-[-0.22px]': isBuilder && isMobile,
          })}>
          {title}
        </span>

        <span
          className={classNames('', {
            'text-base tracking-[-0.176px]': !isBuilder || (isBuilder && isMobile),
            'text-[10.022px] leading-[15.033px] tracking-[-0.11px]': isBuilder && isDesktop,
          })}>
          {percentage}%
        </span>
      </div>
    </div>
  );
};

const Tokenomics = ({ tokenDistributions, tokenSymbol, tokenTotalSupply, isBuilder, isDesktop: isParentDesktop, isMobile: isParentMobile }: ITokenomics) => {
  const { isMobile, isTablet } = useScreenDetect();
  const colors = ['#CAC2FF', '#C2EFFF', '#FBEDB1'];

  const data = {
    labels: tokenDistributions?.map((d) => d.title),
    datasets: [
      {
        label: `${tokenSymbol} Distribution`,
        data: tokenDistributions?.map((d) => d.percentage),
        backgroundColor: ['#CAC2FF', '#C2EFFF', '#FBEDB1'],
        hoverBackgroundColor: colors,
        borderWidth: 6,
        hoverBorderWidth: 0,
      },
    ],
  };

  const cutout = isBuilder && isParentDesktop ? 95 : isBuilder && isParentMobile ? 100 : isMobile ? 100 : isTablet ? 95 : 125;

  const options = {
    cutout: cutout,
    plugins: {
      legend: {
        display: false,
      },
      crosshair: false,
    },
  };

  return (
    <div
      className={classNames('', {
        'flex flex-col lg:flex-row gap-6 items-stretch lg:min-h-[587.21px] w-full': !isBuilder,
        'flex gap-[15.03px] w-full min-h-[367px]': isBuilder && isParentDesktop,
        'flex flex-col gap-6 items-center justify-center w-[343px]': isBuilder && isParentMobile,
      })}>
      <div
        className={classNames('bg-white self-stretch shadow-tokenomics-shadow flex items-center justify-center', {
          'p-4 w-full lg:w-1/2 min-h-[444.6px] lg:min-h-full': !isBuilder,
          'p-[10.2px] w-1/2': isBuilder && isParentDesktop,
        })}>
        <div
          className={classNames('relative z-10', {
            'w-[300px] h-[300px] lg:w-[403.6px] lg:h-[403.6px]': !isBuilder,
            'w-[292.8px] h-[292.8px]': isBuilder && isParentDesktop,
            'w-[300px] h-[412px] flex items-center justify-center': isBuilder && isParentMobile,
          })}>
          <Doughnut data={data} options={options} />

          <div
            className={classNames('absolute -z-10 top-0 right-0 flex flex-col items-center justify-center w-full h-full', {
              'gap-[10.41px]': !isBuilder,
              'gap-[8.77px]': isBuilder && isParentDesktop,
            })}>
            <span
              className={classNames('text-primary-250 ', {
                'text-[10.406px] leading-[8.381px] tracking-[-0.114px] lg:text-[14px] lg:leading-[11.275px] lg:tracking-[-0.154px]': !isBuilder,
                'text-[8.769px] leading-[7.063px] tracking-[-0.096px]': isBuilder && isParentDesktop,
              })}>
              Total Supply
            </span>
            <span
              className={classNames('text-primary-1800 font-medium text-center', {
                'text-[17.839px] leading-[26.758px] lg:text-[24px] lg:leading-[36px]': !isBuilder,
                'text-[15.033px] leading-[22.55px]': isBuilder && isParentDesktop,
              })}>
              {tokenSymbol} {tokenTotalSupply?.toLocaleString()}
            </span>
          </div>
        </div>
      </div>

      <div
        className={classNames('bg-white self-stretch shadow-tokenomics-shadow flex items-center justify-center', {
          'p-4 w-full lg:w-1/2 lg:min-h-full': !isBuilder,
          'p-[10.2px] w-1/2': isBuilder && isParentDesktop,
          'p-4 w-full min-h-[587px] flex-col justify-start': isBuilder && isParentMobile,
        })}>
        <div
          className={classNames('', {
            'flex items-stretch lg:items-center justify-start gap-[10.62px] flex-wrap w-full lg:max-w-[414px] my-14 lg:my-0': !isBuilder,
            'flex items-stretch justify-start gap-[6.65px] flex-wrap max-w-[259px]': isBuilder && isParentDesktop,
            'flex flex-col items-stretch gap-[10.62px] w-full': isBuilder && isParentMobile,
          })}>
          {tokenDistributions?.map(({ percentage, title }, index) => (
            <DistributionCard color={colors[index]} key={index} percentage={percentage} title={title} isBuilder={isBuilder} isDesktop={isParentDesktop} isMobile={isParentMobile} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Tokenomics;
