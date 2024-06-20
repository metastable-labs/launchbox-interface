import Image from 'next/image';
import classNames from 'classnames';

import LBContainer from '../container';
import { IAbout } from './types';

const About = ({ aboutDescription, aboutImageURL, aboutTitle, isBuilder, isMobile, isDesktop }: IAbout) => (
  <LBContainer>
    <section
      className={classNames('bg-white', {
        'py-16 md:pt-24 flex flex-col-reverse md:flex-row items-center justify-between gap-[184px] md:gap-24 pb-[72px] md:px-12 lg:px-7 xl:px-[60px]': !isBuilder,
        'py-[45px] flex items-center justify-between gap-[50.111px] w-full': isBuilder && isDesktop,
        'py-[45px] flex flex-col-reverse items-stretch justify-center gap-20 -mx-20 px-5': isBuilder && isMobile,
      })}>
      <Image
        src={aboutImageURL}
        alt="about-image"
        width={500}
        height={500}
        className={classNames('object-cover', {
          'w-[343px] h-[343px] md:w-[260px] md:h-[260px] lg:w-[500px] lg:h-[500px]': !isBuilder,
          'w-[313px] h-[313px]': isBuilder && isDesktop,
          'w-[343px] h-[343px]': isBuilder && isMobile,
        })}
      />

      <div
        className={classNames('flex flex-col items-start lg:max-w-[620px]', {
          'gap-4': !isBuilder || (isBuilder && isMobile),
          'gap-2.5 w-full': isBuilder && isDesktop,
        })}>
        <h1
          className={classNames('text-primary-1650 font-semibold', {
            'text-[37px] leading-[44.4px] tracking-[-0.37px] lg:text-[36px] lg:leading-[43.2px] lg:tracking-[-0.36px] w-full': !isBuilder,
            'text-[22.55px] leading-[27.06px] tracking-[-0.226px]': isBuilder && isDesktop,
            'text-[37px] leading-[44.4px] tracking-[-0.37px] w-full': isBuilder && isMobile,
          })}>
          {aboutTitle}
        </h1>

        <p
          className={classNames('text-primary-1700 w-full', {
            'text-base lg:text-[20px] lg:leading-[30px]': !isBuilder,
            'text-[11.275px] leading-[16.913px]': isBuilder && isDesktop,
            'text-base': isBuilder && isMobile,
          })}>
          {aboutDescription}
        </p>
      </div>
    </section>
  </LBContainer>
);

export default About;
