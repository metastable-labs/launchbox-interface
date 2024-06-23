import Image from 'next/image';
import classNames from 'classnames';

import PoweredBy from './powered-by';
import LBClickAnimation from '../click-animation';
import { TwitterIcon } from '@/public/icons';
import { IFooter } from './types';

const Footer = ({ footerLinks, isBuilder, isDesktop, isMobile, logoURL }: IFooter) => {
  return (
    <footer
      className={classNames('flex items-center justify-center', {
        'px-5 md:px-7 lg:px-[140px] py-16': !isBuilder,
        'px-[75.17px] py-[40.09px] rounded-b-xl': isBuilder && isDesktop,
        'px-5 py-14 rounded-b-xl': isBuilder && isMobile,
      })}>
      <div
        className={classNames('w-full  flex flex-col justify-center', {
          'gap-[72px] items-center': !isBuilder || (isBuilder && isMobile),
          'gap-[45.1px]': isBuilder && isDesktop,
        })}>
        <div
          className={classNames('', {
            'w-full flex flex-col md:flex-row md:justify-between gap-9': !isBuilder,
            'w-full flex justify-between gap-56': isBuilder && isDesktop,
            'w-full flex flex-col gap-11': isBuilder && isMobile,
          })}>
          <Image
            src={logoURL}
            alt="logo"
            width={500}
            height={500}
            className={classNames('object-cover', {
              'w-[104px] h-[38px]': !isBuilder || (isBuilder && isMobile),
              'w-[58px] h-[18px]': isBuilder && isDesktop,
            })}
          />

          <div
            className={classNames('', {
              'w-full md:w-3/5 flex flex-col md:flex-row gap-[61px]': !isBuilder,
              'w-full flex gap-11': isBuilder && isDesktop,
              'w-full flex flex-col gap-[61px]': isBuilder && isMobile,
            })}>
            {footerLinks.map(({ links, title, hidden }, index) => (
              <div
                key={index}
                className={classNames('flex flex-col', {
                  'gap-4 min-w-[147px]': !isBuilder || (isBuilder && isMobile),
                  'gap-[15.11px] min-w-[138px]': isBuilder && isDesktop,
                })}>
                <span
                  className={classNames('text-primary-1850 font-medium', {
                    'text-[10.022px] leading-[15.033px]': isBuilder && isDesktop,
                  })}>
                  {title}
                </span>

                <div
                  className={classNames('flex flex-col items-start justify-center', {
                    'gap-3': !isBuilder || (isBuilder && isMobile),
                    'gap-2.5': isBuilder && isDesktop,
                  })}>
                  {links.map(({ title, link }, index) => (
                    <a
                      key={index}
                      href={link}
                      target="_blank"
                      className={classNames('text-primary-1900 font-medium', {
                        'text-[10.022px] leading-[15.033px]': isBuilder && isDesktop,
                      })}>
                      {title}
                    </a>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div
          className={classNames('flex items-center self-stretch', {
            'justify-center': !isBuilder || (isBuilder && isMobile),
            'justify-between': isBuilder && isDesktop,
          })}>
          <PoweredBy isBuilder={isBuilder} isDesktop={isDesktop} isMobile={isMobile} />

          {isBuilder && isDesktop && (
            <LBClickAnimation>
              <TwitterIcon />
            </LBClickAnimation>
          )}
        </div>
      </div>
    </footer>
  );
};

export default Footer;
