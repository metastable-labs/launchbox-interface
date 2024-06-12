import { title } from 'process';
import CustomizingPaper from './paper';
import { ApperanceIcon, FooterIcon, HeroIcon, TokenomicsIcon, NavigationIcon } from '@/public/icons';
import { IInactiveTabs } from './types';

const InactiveTabs = ({ onClick }: IInactiveTabs) => {
  const tabs = [
    {
      title: 'Appearance',
      icon: <ApperanceIcon />,
      isActive: false,
      onClick: () => onClick('appearance'),
    },
    {
      title: 'Navigation',
      icon: <NavigationIcon />,
      isActive: false,
      onClick: () => onClick('navigation'),
    },
    {
      title: 'Hero section',
      icon: <HeroIcon />,
      isActive: false,
      onClick: () => onClick('hero'),
    },
    {
      title: 'Tokenomics',
      icon: <TokenomicsIcon />,
      isActive: false,
      onClick: () => onClick('tokenomics'),
    },
    {
      title: 'Footer',
      icon: <FooterIcon />,
      isActive: false,
      onClick: () => onClick('footer'),
    },
  ];
  return (
    <div className="flex flex-col items-stretch gap-4 min-w-full min-h-full transition-all ease-in-out duration-700">
      {tabs.map((tab, index) => (
        <CustomizingPaper key={index} {...tab} />
      ))}
    </div>
  );
};

export default InactiveTabs;
