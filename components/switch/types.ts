interface ISwitchIcon {
  switched?: boolean;
  onClick?: () => void;
}

interface ILBSwitch {
  onClick: () => void;
  switched: boolean;
  title: string;
  instruction: string;
  hasBorder?: boolean;
  disabled?: boolean;
}
