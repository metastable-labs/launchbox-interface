"use client";
import { ReactNode } from "react";
import { CookiesProvider } from "react-cookie";

import RainbowProvider from "@/config/rainbow/rainbowkit";

const App = ({ children }: { children: ReactNode }) => {
  const cookieOptions = {
    path: "/",
    expires: new Date(new Date().getTime() + 8 * 60 * 60 * 1000),
  };

  return (
    <CookiesProvider defaultSetOptions={cookieOptions}>
      <RainbowProvider>{children}</RainbowProvider>
    </CookiesProvider>
  );
};

export default App;
