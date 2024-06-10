import { NewTokenView } from "@/views";
import { PageProps } from "@/app/type";

const NewTokens = ({ params }: PageProps) => {
  return <NewTokenView network={params.network} />;
};

export default NewTokens;
