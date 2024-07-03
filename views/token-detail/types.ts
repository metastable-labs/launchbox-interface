type Tabs = 'overview' | 'leaderboard' | 'channel';
type SecondaryTabs = 'transactions' | 'holders';

interface IClickTabs {
  tabTexts: string[];
  tab: any;
  setTab: (tab: any) => void;
}

type Period = '1h' | '24h' | '1w' | '1m';

type AreaChartVariant = 'primary' | 'secondary';
interface IAreaChart {
  period: Period;
  variant?: AreaChartVariant;
}

export type { Tabs, SecondaryTabs, IClickTabs, Period, AreaChartVariant, IAreaChart };
