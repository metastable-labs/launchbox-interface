import { TimerIcon } from '@/public/icons';
import Image from 'next/image';

const Leaderboard = () => {
  return (
    <div className="w-full flex flex-col items-stretch justify-center gap-9">
      <div className="self-stretch flex flex-col gap-1">
        <div className="flex items-center gap-3">
          <h1 className="text-primary-650 text-[24px] leading-[38px] font-Biform">Incentive</h1>

          <div className="flex items-center justify-center py-1 pl-1 pr-2 rounded-full bg-primary-2400">
            <TimerIcon />
            <span className="text-primary-2350 text-[14px] leading-[21px] font-medium">Coming soon</span>
          </div>
        </div>

        <p className="text-primary-700">Create new leaderboards and build incentives systems for your community</p>
      </div>

      <div className="relative pt-5 xl:py-56 flex flex-col">
        <Image src="https://res.cloudinary.com/djzeufu4j/image/upload/v1718476485/content_ymq0li.png" alt="leaderboard" layout="fill" objectFit="cover" className="hidden xl:block" />
        {/* 
        <div className="w-full h-full absolute top-[90%] left-0 flex flex-col gap-1 items-center justify-center">
          <h1 className="text-primary-400 text-[24px] leading-[36px] text-center font-semibold">Coming soon</h1>

          <p className="text-primary-700">We’re rolling out this feature soon!</p>
        </div> */}
      </div>
    </div>
  );
};

export default Leaderboard;
