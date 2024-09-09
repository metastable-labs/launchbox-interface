import { LBContainer } from '@/components';

const Skeleton = () => {
  return (
    <main className="transition-all ease-in-out duration-500 relative overflow-hidden animate-pulse">
      <header className="border-b border-b-primary-1400 bg-white flex justify-between items-center fixed w-screen z-30  py-5 px-4 md:px-20">
        <div className="flex items-center justify-center gap-2">
          <div className="w-8 h-8 bg-primary-50 rounded-full" />
          <div className="w-[104px] h-8 bg-primary-50 rounded-base" />
        </div>

        <div className="w-[115px] h-10 bg-primary-50 rounded-base" />
      </header>

      <LBContainer>
        <section className="pt-[128px] md:pt-[160px] flex flex-col md:flex-row items-center justify-between gap-20 pb-[72px] md:px-12 lg:px-7 xl:px-[60px]">
          <div className="flex flex-col items-start gap-10">
            <div className="self-stretch flex flex-col items-start gap-4">
              <div className="w-full h-11 bg-primary-50 rounded-base" />

              <div className="w-full flex flex-col gap-4 ">
                {[...Array(3)].map((_, index) => (
                  <div key={index} className="h-3 bg-primary-50 w-full rounded-base" />
                ))}
              </div>
            </div>

            <div className="flex flex-col md:flex-row items-stretch md:items-center justify-center gap-4 w-full md:w-auto">
              {[...Array(2)].map((_, index) => (
                <div key={index} className="w-[115px] h-10 bg-primary-50 rounded-base" />
              ))}
            </div>
          </div>

          <div className="w-[343px] h-[343px] md:w-[260px] md:h-[260px] lg:w-[500px] lg:h-[500px] bg-primary-50 rounded-2xl" />
        </section>
      </LBContainer>

      <LBContainer>
        <section className="pt-[128px] md:pt-[160px] flex flex-col md:flex-row items-center justify-between gap-20 pb-[72px] md:px-12 lg:px-7 xl:px-[60px]">
          <div className="min-w-[45%] h-[343px] md:w-[260px] md:h-[260px] lg:w-[500px] lg:h-[500px] bg-primary-50 rounded-2xl" />

          <div className="w-full self-stretch flex flex-col items-stretch gap-4">
            <div className="h-11 bg-primary-50 rounded-base" />

            <div className="flex flex-col items-stretch gap-4 ">
              {[...Array(3)].map((_, index) => (
                <div key={index} className="h-3 bg-primary-50 rounded-base" />
              ))}
            </div>
          </div>
        </section>
      </LBContainer>

      <section className="bg-primary-1750 bg-opacity-60">
        <LBContainer>
          <div className="flex flex-col w-full py-[120px] mt-[80px] md:px-12 lg:px-7 xl:px-[60px] gap-16">
            <div className="flex flex-col self-stretch items-start gap-4">
              <div className="bg-primary-50 h-8 rounded-full w-36" />

              {[...Array(3)].map((_, index) => (
                <div key={index} className="bg-primary-50 h-3 w-full rounded-base" />
              ))}
            </div>

            <div className="flex flex-col lg:flex-row gap-6 items-stretch lg:min-h-[587.21px] w-full">
              <div className="bg-white self-stretch shadow-tokenomics-shadow flex items-center justify-center p-4 w-full lg:w-1/2 min-h-[444.6px] lg:min-h-full">
                <div className="relative z-10 w-[300px] h-[300px] lg:w-[403.6px] lg:h-[403.6px]">
                  <div className="h-full w-full bg-primary-50 p-16 rounded-full">
                    <div className="w-full h-full rounded-full bg-white" />
                  </div>
                </div>
              </div>

              <div className="bg-white self-stretch shadow-tokenomics-shadow flex items-center justify-center p-4 w-full lg:w-1/2 lg:min-h-full">
                <div className="flex items-stretch lg:items-center justify-start gap-[10.62px] flex-wrap w-full lg:max-w-[414px] my-14 lg:my-0">
                  {[...Array(8)].map((_, index) => (
                    <div
                      key={index}
                      className="flex items-start bg-primary-1750 border-primary-200 p-[8.49px] gap-2 rounded-[6.37px] border-[0.531px] min-w-full lg:min-w-[200px] shadow-distribution-card-shadow h-full">
                      <div className="pt-2">
                        <div className="rounded-full w-5 h-5 bg-primary-50" />
                      </div>

                      <div className="flex flex-col items-start justify-center text-primary-150 gap-3 w-full">
                        <div className="h-2 w-full bg-primary-50 rounded-full" />
                        <span className="text-sm text-primary-50">_ _%</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </LBContainer>
      </section>
    </main>
  );
};

export default Skeleton;
