'use client';
import Image from 'next/image';
import moment from 'moment';
import classNames from 'classnames';

import { HeartIcon, RecastIcon, ReplyIcon } from '@/public/icons';
import { ILBComment } from './types';
import { formatNumber } from '@/utils/helpers';

const LBComment = (props: ILBComment) => {
  const others = [
    { icon: <ReplyIcon />, count: formatNumber(props?.replies), text: 'replies' },
    { icon: <RecastIcon color="#868C98" />, count: formatNumber(props?.recasts), text: 'recasts' },
    { icon: <HeartIcon color="#868C98" />, count: formatNumber(props?.likes), text: 'Likes' },
  ];

  const dummyAvatar = 'https://res.cloudinary.com/dxnd4k222/image/upload/fl_preserve_transparency/v1718723895/Avatar_khczwg.jpg';

  return (
    <div className="self-stretch p-6 rounded-lg border border-primary-50 h-fit flex flex-col items-stretch gap-6 bg-pr">
      <div className="self-stretch flex items-center gap-4 bg-pr">
        <Image src={props.createdBy.profileImage || dummyAvatar} alt={props?.createdBy?.profileName} width={500} height={500} className="rounded-full w-10 h-10 object-cover" />
        <div className="flex flex-col gap-0.5">
          <p className="flex items-end gap-1">
            <span className="text-primary-650 text-[16px] leading-[22.4px] font-medium font-Clash-Display">{props?.createdBy?.profileName}</span>
            <span className="text-primary-750 text-[14px] leading-[19.6px] font-normal">@{props?.createdBy?.profileName}</span>
          </p>
          <p className="text-[14px] leading-[21px] text-primary-700">{moment(props?.createdAt).fromNow()}</p>
        </div>
      </div>

      <p className="text-primary-650 text-[16px] leading-[22.4px]">{props?.comment}</p>

      {props?.images?.length > 0 && (
        <div className={classNames('flex flex-col items-stretch', { 'gap-4': props?.images?.length > 1 })}>
          {props?.images.map((image, index) => (
            <Image key={`${props?.id}-image-${index}`} src={image} alt={`Image ${index + 1}`} width={1000} height={1000} className="object-cover w-full" />
          ))}
        </div>
      )}

      <div className="self-stretch flex items-center gap-2">
        {others.map(({ count, icon, text }, index) => (
          <div key={index} className={classNames('', { 'flex gap-2': index !== others.length - 1 })}>
            <div
              className={classNames('flex items-center gap-1 leading-[22.4px] transition-all duration-300 ease-in-out', {
                'text-primary-650': text === 'replies',
                'text-primary-750': text === 'recasts' || text === 'Likes',
              })}>
              {icon}
              <span className="font-medium text-[16px]">{count}</span>
              <span className={classNames('text-[14px]', { underline: text === 'replies' })}>{text}</span>
            </div>

            {index !== others.length - 1 && <span className="text-[14px] leading-[19.6px] text-primary-750">.</span>}
          </div>
        ))}
      </div>
    </div>
  );
};

export default LBComment;
