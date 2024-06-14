type Tabs = 'overview' | 'leaderboard' | 'channel';
type SecondaryTabs = 'transactions' | 'holders';

interface IClickTabs {
  tabTexts: string[];
  tab: any;
  setTab: (tab: any) => void;
}

export type { Tabs, SecondaryTabs, IClickTabs };
