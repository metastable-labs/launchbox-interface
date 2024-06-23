type Tabs = 'overview' | 'leaderboard' | 'channel';
type SecondaryTabs = 'transactions' | 'holders';

interface IClickTabs {
  tabTexts: string[];
  tab: any;
  setTab: (tab: any) => void;
}

type Period = '1h' | '24h' | '1w' | '1m';

type LineChartVariant = 'primary' | 'secondary';
interface ILineChart {
  data: { date: Date; value: number }[];
  period: Period;
  variant?: LineChartVariant;
}

export type { Tabs, SecondaryTabs, IClickTabs, Period, LineChartVariant, ILineChart };
