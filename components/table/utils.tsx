import { BuyAndSellIcon, InfoIcon, UpandDownIcon } from '@/public/icons';

const headers = [
  { primary: 'Wallet', secondary: '#', secondaryAlt: '#', tertiary: 'Token', key: 0 },
  {
    secondary: 'Address',
    secondaryAlt: 'User',
    tertiary: (
      <div className="flex items-center gap-1">
        Created <BuyAndSellIcon width={16} height={16} />
      </div>
    ),
    key: 1,
  },
  { primary: 'USD', key: 2 },
  {
    primary: 'Token amount',
    tertiary: (
      <div className="flex items-center gap-1">
        <span>Market cap</span>
        <InfoIcon />
      </div>
    ),
    key: 3,
  },
  {
    primary: 'Date',
    secondary: 'Holding',
    secondaryAlt: 'Points',
    tertiary: (
      <div className="flex items-center gap-1">
        TXNS <BuyAndSellIcon color="#0A0D14" width={16} height={16} />
      </div>
    ),
    key: 4,
    textRight: true,
  },
  {
    tertiary: 'Volume',
    key: 5,
  },
  {
    tertiary: 'Action',
    key: 7,
  },
];

export { headers };
