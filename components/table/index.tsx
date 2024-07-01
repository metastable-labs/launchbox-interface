import classNames from 'classnames';

import { ILBTable } from './types';
import { headers } from './utils';
import Row from './row';
import SkeletonRows from './skeleton';

const placeholder = {
  wallet: undefined,
  walletAvatarURL: undefined,
  type: undefined,
  usdAmount: undefined,
  tokenAmount: undefined,
  date: undefined,
  holding: undefined,
};

const LBTable = ({ data, loading, variant = 'primary', tokenSymbol, cta, rowClick, setShouldFetchMore, shouldFetchMore, total, take }: ILBTable) => {
  if (!data.length && !shouldFetchMore) {
    data = [placeholder];
  }

  return (
    <div className="self-stretch overflow-x-auto rounded-xl border border-primary-950 flex flex-col justify-between shadow-table-cta">
      <table className="md:min-w-full divide-y divide-primary-950">
        <thead className="bg-white text-primary-700 border-b border-primary-950">
          <tr>
            {headers.map((header, index) => (
              <th
                key={header.key}
                className={classNames('px-4 md:px-6 py-3 text-[12px] leading-[18px] font-medium whitespace-nowrap', {
                  'w-[83px]': index === 0 && (variant === 'secondary' || variant === 'secondaryAlt'),
                  hidden:
                    ((index === 1 || index === 5 || index === 6) && variant === 'primary') ||
                    ((index === 2 || index === 3 || index === 5 || index === 6) && (variant === 'secondary' || variant === 'secondaryAlt')) ||
                    (index === 2 && variant === 'tertiary'),

                  'text-right': header.textRight && variant === 'primary',
                  'text-left': !header.textRight || variant === 'secondary' || variant === 'secondaryAlt' || variant === 'tertiary',
                  'hidden lg:table-cell': variant === 'tertiary' && (index === 3 || index === 4),
                  'hidden md:table-cell': variant === 'primary' && (index === 2 || index === 4),
                  'hidden sm:table-cell': variant === 'tertiary' && (index === 1 || index === 5),
                })}>
                {header[variant]}
              </th>
            ))}
          </tr>
        </thead>

        <tbody className="divide-y divide-gray-200 text-sm font-medium">
          {data.map((item, index) => (
            <Row
              items={data}
              index={index}
              variant={variant}
              tokenSymbol={tokenSymbol}
              key={index}
              item={item}
              cta={cta}
              rowClick={rowClick}
              setShouldFetchMore={setShouldFetchMore}
              take={take}
              total={total}
            />
          ))}
        </tbody>

        {shouldFetchMore && <SkeletonRows variant={variant} />}
      </table>
    </div>
  );
};

export default LBTable;
