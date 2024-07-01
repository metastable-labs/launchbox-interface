type ButtonVariants = 'link' | 'new' | 'plain';
type ButtonColorVariant = 'primary' | 'secondary' | 'tertiary';

type Network = 'base' | 'optimism' | 'mode' | 'scroll';

interface ILBButton {
  variant?: ButtonVariants;
  color?: ButtonColorVariant;
  onClick?: () => void;
  text: string;
  fullWidth?: boolean;
  disabled?: boolean;
  type?: 'button' | 'submit' | 'reset';
  loading?: boolean;
}

export type { ILBButton, ButtonVariants, Network };
