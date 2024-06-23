interface IConfiguration {
  show: boolean;
  close: () => void;
}

interface SelectChannelFormProps {
  warpcastChannelId: string;
}

interface ConfigurationFormProps {
  points: string;
}
