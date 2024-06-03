import { Network } from "@/components/button/types";
import App from "./app";

interface RootProps {
  params: { network: Network };
  children: React.ReactNode;
}

export default function RootLayout({ params, children }: Readonly<RootProps>) {
  return <App params={params}>{children}</App>;
}