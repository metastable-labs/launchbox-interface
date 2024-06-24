const Skeleton = () => (
  <>
    {Array.from({ length: 8 }).map((_, i) => (
      <div key={i} className="bg-primary-200 w-full h-[275px] animate-pulse" />
    ))}
  </>
);

export default Skeleton;
