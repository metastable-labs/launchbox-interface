'use client';
import { useState } from 'react';
import Image from 'next/image';
import moment from 'moment';
import classNames from 'classnames';

import { HeartIcon, RecastIcon, ReplyIcon } from '@/public/icons';
import { formatNumber } from '../table/row';
import LBClickAnimation from '../click-animation';

const LBComment = ({ comments, createdAt, createdBy, id, images, likes: initialLikes, recasts: initialRecasts, replies, updatedAt }: ILBComment) => {
  const [liked, setLiked] = useState(false);
  const [recasted, setRecasted] = useState(false);
  const [likes, setLikes] = useState(initialLikes);
  const [recasts, setRecasts] = useState(initialRecasts);

  const handleRecast = () => {
    setRecasts((prevRecasts) => prevRecasts + (recasted ? -1 : 1));
    setRecasted((prev) => !prev);
  };

  const handleLike = () => {
    setLikes((prevLikes) => prevLikes + (liked ? -1 : 1));
    setLiked((prev) => !prev);
  };

  const others = [
    { icon: <ReplyIcon />, count: formatNumber(replies.length), text: 'replies' },
    { icon: <RecastIcon color={recasted ? '#32AE60' : '#868C98'} />, count: formatNumber(recasts), onClick: handleRecast, text: 'recasts' },
    { icon: <HeartIcon color={liked ? '#AF1D38' : '#868C98'} />, count: formatNumber(likes), onClick: handleLike, text: 'Likes' },
  ];

  return (
    <div className="self-stretch p-6 rounded-lg border border-primary-50 h-fit flex flex-col items-stretch gap-6 bg-pr">
      <div className="self-stretch flex items-center gap-4 bg-pr">
        <Image src={createdBy?.avatar} alt={createdBy?.name} width={500} height={500} className="rounded-full w-10 h-10 object-cover" />
        <div className="flex flex-col gap-0.5">
          <p className="flex items-end gap-1">
            <span className="text-primary-650 text-[16px] leading-[22.4px] font-medium">{createdBy?.name}</span>
            <span className="text-primary-750 text-[14px] leading-[19.6px] font-normal">@{createdBy?.username}</span>
          </p>
          <p className="text-[14px] leading-[21px] text-primary-700">{moment(createdAt).fromNow()}</p>
        </div>
      </div>

      <ol className="list-decimal pl-4 text-primary-650 text-[16px] leading-[22.4px]">
        {comments.map((comment, index) => (
          <li key={`${id}-comment-${index}`} className="mb-2">
            {comment}
          </li>
        ))}
      </ol>

      {images?.length > 0 && (
        <div className={classNames('flex flex-col items-stretch', { 'gap-4': images?.length > 1 })}>
          {images.map((image, index) => (
            <Image key={`${id}-image-${index}`} src={image} alt={`Image ${index + 1}`} width={1000} height={1000} className="object-cover w-full" />
          ))}
        </div>
      )}

      <div className="self-stretch flex items-center gap-2">
        {others.map(({ count, icon, onClick, text }, index) => (
          <div key={index} className={classNames('', { 'flex gap-2': index !== others.length - 1 })}>
            <div
              className={classNames('flex items-center gap-1 leading-[22.4px] transition-all duration-300 ease-in-out', {
                'text-primary-650': text === 'replies',
                'text-primary-750': (text === 'recasts' && !recasted) || (text === 'Likes' && !liked),
                'text-primary-2450': text === 'recasts' && recasted,
                'text-primary-2650': text === 'Likes' && liked,
              })}>
              <LBClickAnimation onClick={onClick}>{icon}</LBClickAnimation>
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
