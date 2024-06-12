type ButtonVariants = 'link' | 'new' | 'plain' | 'plainAlt';

type Network = 'base' | 'optimism' | 'mode' | 'scroll';

interface ILBButton {
  variant?: ButtonVariants;
  onClick?: () => void;
  text: string;
  fullWidth?: boolean;
  disabled?: boolean;
  type?: 'button' | 'submit' | 'reset';
  loading?: boolean;
}

export type { ILBButton, ButtonVariants, Network };
