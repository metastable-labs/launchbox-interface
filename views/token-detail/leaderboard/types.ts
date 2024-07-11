type ConfigurationVariant = 'farcaster' | 'nft';

interface IConfiguration {
  show: boolean;
  close: () => void;
  variant?: ConfigurationVariant;
}

interface SelectChannelFormProps {
  warpcastChannelId: string;
}

interface ConfigurationFormProps {
  points: string;
}
