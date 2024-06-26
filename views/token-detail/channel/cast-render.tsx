import { useEffect, useRef, useState } from 'react';
import useSystemFunctions from '@/hooks/useSystemFunctions';
import useCastActions from '@/store/casts/actions';
import { LBComment } from '@/components';
import { ExclaimIcon } from '@/public/icons';

const CastRender = () => {
  const { castState } = useSystemFunctions();
  const { getChannelCasts } = useCastActions();
  const [shouldFetchMoreCasts, setShouldFetchMoreCasts] = useState(false);
  const observerRef = useRef<HTMLDivElement>(null);

  const casts = castState?.casts?.map((cast) => ({
    id: cast.fid,
    createdAt: cast.castedAtTimestamp,
    updatedAt: cast.castedAtTimestamp,
    createdBy: {
      profileName: cast.castedBy.profileName,
      userAddress: cast.castedBy.userAddress,
    },
    comment: cast.text,
    images: [],
    replies: cast.numberOfReplies,
    recasts: cast.numberOfRecasts,
    likes: cast.numberOfLikes,
  }));

  const showShouldFetchMoreCasts = shouldFetchMoreCasts || (castState.loading && !castState.casts);
  const showEmptyState = !showShouldFetchMoreCasts && !casts;

  useEffect(() => {
    if (!shouldFetchMoreCasts) return;

    const skip = castState?.casts?.length;

    getChannelCasts(`take=20&skip=${skip}`, { onSuccess: () => setShouldFetchMoreCasts(false) });

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [shouldFetchMoreCasts]);

  useEffect(() => {
    const currentObserverRef = observerRef.current;
    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (entry.isIntersecting && Number(castState?.casts?.length) < Number(castState?.meta?.totalCount)) {
          setShouldFetchMoreCasts(true);
        }
      },
      { threshold: 1.0 },
    );

    if (currentObserverRef) {
      observer.observe(currentObserverRef);
    }

    return () => {
      if (currentObserverRef) {
        observer.unobserve(currentObserverRef);
      }
    };
  }, [castState.casts, castState.meta?.totalCount]);

  return (
    <>
      {casts?.map((comment, index) => (
        <div ref={index === casts.length - 2 ? observerRef : null} key={comment.id} className="self-stretch">
          <LBComment {...comment} />
        </div>
      ))}
      {showShouldFetchMoreCasts && Array.from({ length: 4 }).map((_, i) => <div key={i} className="self-stretch rounded-lg bg-primary-50 h-48" />)}

      {showEmptyState && (
        <div className="self-stretch w-full mt-24 flex items-center justify-center">
          <div className="p-6 bg-white border border-primary-900 rounded-base shadow-table-cta flex flex-col items-center justify-center gap-1">
            <div className="flex items-center justify-center bg-very-light-gray rounded-full border-t border-primary-900 p-4">
              <div className="flex items-center justify-center rounded-full border border-primary-50 bg-white p-[14px] shadow-fade-light">
                <ExclaimIcon width={28} height={28} />
              </div>
            </div>

            <h1 className="text-primary-400 text-[20px] leading-[30px] text-center">No Casts yet</h1>
            <p className="text-primary-700 text-[14px] leading-[24px] text-center max-w-[400px]">This channel does not have any casts</p>
          </div>
        </div>
      )}
    </>
  );
};

export default CastRender;
