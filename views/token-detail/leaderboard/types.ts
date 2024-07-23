interface IConfiguration {
  show: boolean;
  close: () => void;
  variant?: string;
  isEdit?: boolean;
}

interface SelectChannelFormProps {
  warpcastChannelId: string;
}

interface ConfigurationFormProps {
  points: string;
}

interface FarcasterConfigurationProps {
  castPoints: string;
  followPoints: string;
}

type Action = {
  image: string;
  title: string;
  description: string;
  onClick?: () => void;
  comingSoon?: boolean;
  secondaryTitle?: string;
  loading?: boolean;
  actionText?: string;
};
