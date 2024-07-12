interface IConfiguration {
  show: boolean;
  close: () => void;
  variant?: string;
}

interface SelectChannelFormProps {
  warpcastChannelId: string;
}

interface ConfigurationFormProps {
  points: string;
}

type Action = {
  image: string;
  title: string;
  description: string;
  onClick?: () => void;
  comingSoon?: boolean;
  secondaryTitle?: string;
};
