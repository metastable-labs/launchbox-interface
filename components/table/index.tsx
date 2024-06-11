import classNames from 'classnames';
import moment from 'moment';

import { UpandDownIcon } from '@/public/icons';
import Address from './address';
import { ILBTable } from './types';

const formatNumber = (num: number): string => {
  const formatWithPrecision = (value: number) => {
    return value % 1 === 0 ? value.toFixed(0) : value.toFixed(2);
  };

  if (num >= 1e9) {
    return formatWithPrecision(num / 1e9) + 'b';
  }
  if (num >= 1e6) {
    return formatWithPrecision(num / 1e6) + 'm';
  }
  if (num >= 1e3) {
    return formatWithPrecision(num / 1e3) + 'k';
  }
  return num.toString();
};

const placeholder = {
  wallet: undefined,
  walletAvatarURL: undefined,
  type: undefined,
  usdAmount: undefined,
  tokenAmount: undefined,
  date: undefined,
  holding: undefined,
};

const LBTable = ({ data, loading, variant = 'primary', tokenSymbol }: ILBTable) => {
  if (!data.length) {
    data = [placeholder];
  }

  const headers = [
    { primary: 'Wallet', secondary: '#', key: 0 },
    {
      primary: (
        <div className="flex items-center gap-1">
          Type <UpandDownIcon />
        </div>
      ),
      secondary: 'Address',
      key: 1,
    },
    { primary: 'USD', key: 2 },
    { primary: 'Token amount', key: 3 },
    { primary: 'Date', secondary: 'Holding', key: 4 },
  ];

  return (
    <div className={classNames('self-stretch overflow-x-auto rounded-xl border border-primary-950 flex flex-col justify-between bg-white shadow-table-cta', {})}>
      <table className="md:min-w-full divide-y divide-primary-950">
        <thead className="bg-primary-2250 text-primary-700 border-b border-primary-950">
          <tr>
            {headers.map((header, index) => (
              <th
                key={header.key}
                className={classNames('px-4 md:px-6 py-3 text-[12px] leading-[18px] font-medium whitespace-nowrap', {
                  'w-[83px]': index === 0 && variant === 'secondary',
                  'hidden md:table-cell': (index === 2 || index === 3) && variant === 'primary',
                  hidden: (index === 2 || index === 3) && variant === 'secondary',
                  'text-right': index === headers.length - 1 && variant === 'primary',
                  'text-left': index !== headers.length - 1 || variant === 'secondary',
                })}>
                {header[variant]}
              </th>
            ))}
          </tr>
        </thead>

        <tbody className="bg-white divide-y divide-gray-200 text-sm font-medium">
          {data.map((item, index) => (
            <tr key={index}>
              <td className={classNames('min-h-[71px] px-4 md:px-6 py-4 text-gray-900', { 'w-[83px]': variant === 'secondary' })}>
                {variant === 'primary' && <Address wallet={item.wallet || '-'} walletAvatarURL={item.walletAvatarURL} />}

                {variant === 'secondary' && <div className="w-full flex items-center justify-center">{index + 1}</div>}
              </td>

              <td className={classNames('min-h-[71px] px-4 md:px-6 py-4 whitespace-nowrap text-gray-500', { 'w-4/6': variant === 'secondary' })}>
                {variant === 'primary' && (
                  <span
                    className={classNames('capitalize', {
                      'text-primary-2600': item.type === 'buy',
                      'text-primary-2650': item.type === 'sell',
                    })}>
                    {item.type || '-'}
                  </span>
                )}

                {variant === 'secondary' && <Address wallet={item.wallet || '-'} walletAvatarURL={item.walletAvatarURL} />}
              </td>

              {variant === 'primary' && (
                <td className="min-h-[71px] px-4 md:px-6 py-4 whitespace-nowrap text-gray-500">
                  <span className="text-primary-650">{item.usdAmount ? '$' + formatNumber(item.usdAmount) : '-'}</span>
                </td>
              )}

              {variant === 'primary' && (
                <td className="min-h-[71px] px-4 md:px-6 py-4 whitespace-nowrap text-gray-500">
                  <span className="text-primary-650">
                    {item.tokenAmount && formatNumber(item.tokenAmount || 0) + ' ' + tokenSymbol}
                    {!item.tokenAmount && '-'}
                  </span>
                </td>
              )}

              <td className="min-h-[71px] px-4 md:px-6 py-4 whitespace-nowrap text-sm font-medium">
                {variant === 'primary' && <p className="text-primary-250 min-w-full text-right">{item.date ? moment(item.date).fromNow() : '-'}</p>}

                {variant === 'secondary' && <span className="text-primary-650">{`${item.holding?.toLocaleString() + '%' || '-'}`}</span>}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default LBTable;
