import Rating from 'react-rating-stars-component';
import classNames from 'classnames';

import { IInfo } from './types';

const Info = ({ text, title, activeFollowersPercentage, priceChangePercentage, socialScore, txns, weeklyCastPercentage, hasBorder, noChannel }: IInfo) => {
  const primary = activeFollowersPercentage || weeklyCastPercentage || priceChangePercentage;
  const isPositive = priceChangePercentage && priceChangePercentage > 0;
  return (
    <div className={classNames('self-stretch flex items-center justify-between', { 'pb-4 border-b border-b-primary-50': hasBorder })}>
      <span className="text-primary-700 text-[14px] leading-[24px] ">{title}</span>

      <div className={classNames('text-primary-650 text-[16px] leading-[20px] font-medium uppercase', { 'flex items-center gap-1.5': primary, 'flex items-center justify-center gap-2': socialScore })}>
        {!txns && noChannel ? '-' : text}

        {primary && (
          <span
            className={classNames('text-[12px] leading-[20px] lowercase', {
              'text-primary-750': activeFollowersPercentage,
              'text-primary-450': weeklyCastPercentage || (priceChangePercentage && isPositive),
              'text-primary-1050': priceChangePercentage && !isPositive,
            })}>
            {noChannel ? (
              '-'
            ) : (
              <>
                {isPositive && '+'}
                {primary}%{activeFollowersPercentage && ' active'}
              </>
            )}
          </span>
        )}

        {txns && (
          <div className="flex items-center justify-center gap-1 text-primary-650 text-[16px] leading-[20px] font-medium">
            <span>{noChannel ? '-' : txns.numerator}</span>
            <span>(</span>
            <span className="text-primary-2600">{noChannel ? '-' : txns.denominator.numerator}</span>
            <span className="text-primary-750 text-[12px]">/</span>
            <span className="text-primary-2650">{noChannel ? '-' : txns.denominator.denominator}</span>
            <span>)</span>
          </div>
        )}

        {socialScore && (
          <>
            <span>(</span>
            <Rating count={5} value={noChannel ? 0 : socialScore} size={16} activeColor="#F2AE40" color="#D9D9D9" isHalf={true} edit={false} classNames="star-ratings" />
            <span>)</span>
          </>
        )}
      </div>
    </div>
  );
};

export default Info;
