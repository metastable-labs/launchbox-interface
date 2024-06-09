"use client";
import { ReactNode } from "react";
import { motion } from "framer-motion";
import { usePathname } from "next/navigation";

import LBNavigation from "@/components/navigation";
import { Network } from "@/components/button/types";
import { LBTiles } from "@/components";

interface PageProps {
  params: { network: Network };
  children: ReactNode;
}

const networkBackgrounds: Record<Network, string> = {
  base: "linear-gradient(180deg, #FFF 0%, #FCFCFC 43%, #0052FF 100%)",
  optimism: "linear-gradient(180deg, #FFF 0%, #FCFCFC 43%, #FF1636 100%)",
  mode: "linear-gradient(180deg, #FFF 0%, #FCFCFC 43%, #CDFF00 100%)",
  scroll: "linear-gradient(180deg, #FFF 0%, #FCFCFC 43%, #F1C087 100%)",
};

const App = ({ children, params }: PageProps) => {
  const pathname = usePathname();

  // Regex to match the path of the token detail page
  const tokenDetailPageRegex = /\/tokens\/[a-zA-Z0-9]+$/;
  const isTokenDetailPage = tokenDetailPageRegex.test(pathname);
  return (
    <main>
      <LBNavigation network={params.network} />
      {children}
      {!isTokenDetailPage && (
        <div className="flex justify-center fixed w-screen bottom-0 -z-10">
          <LBTiles network={params.network} />
        </div>
      )}
      {!isTokenDetailPage && (
        <motion.div
          animate={{ backgroundImage: networkBackgrounds[params.network] }}
          className="fixed top-0 left-0 w-screen h-screen bg-cover bg-center -z-10 opacity-10 transition-all duration-300 ease-in-out pointer-events-none"
        />
      )}
    </main>
  );
};

export default App;
