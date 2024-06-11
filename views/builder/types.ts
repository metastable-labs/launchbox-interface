type DisplayType = 'mobile' | 'desktop';

interface HeaderProps {
  setDisplay: (display: DisplayType) => void;
  displayType: DisplayType;
  hideCoustomize: () => void;
  shouldHideCustomize: boolean;
  save: () => void;
  saveActive: boolean;
  publish: () => void;
  publishActive: boolean;
  externalLink: string;
}
