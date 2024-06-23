import { ApperanceIcon, FooterIcon, HeroIcon, TokenomicsIcon, NavigationIcon, QuestionIcon, AboutIcon } from '@/public/icons';
import CustomizingPaper from './paper';
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
      title: 'About section',
      icon: <AboutIcon />,
      isActive: false,
      onClick: () => onClick('about'),
    },
    {
      title: 'Tokenomics',
      icon: <TokenomicsIcon />,
      isActive: false,
      onClick: () => onClick('tokenomics'),
    },
    {
      title: 'FAQ',
      icon: <QuestionIcon width={24} height={24} />,
      isActive: false,
      onClick: () => onClick('faq'),
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
