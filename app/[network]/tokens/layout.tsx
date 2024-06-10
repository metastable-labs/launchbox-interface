import App from "./app";
import { PageProps } from "@/app/type";

export default function RootLayout({ params, children }: Readonly<PageProps>) {
  return <App params={params}>{children}</App>;
}
