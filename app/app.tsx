"use client";
import { ReactNode } from "react";
import { CookiesProvider } from "react-cookie";

import RainbowProvider from "@/config/rainbow/rainbowkit";
import useConnect from "@/hooks/useConnect";

const App = ({ children }: { children: ReactNode }) => {
  const cookieOptions = {
    path: "/",
    expires: new Date(new Date().getTime() + 8 * 60 * 60 * 1000),
  };

  return (
    <CookiesProvider defaultSetOptions={cookieOptions}>
      <RainbowProvider>
        <Wrapper>{children}</Wrapper>
      </RainbowProvider>
    </CookiesProvider>
  );
};

const Wrapper = ({ children }: { children: ReactNode }) => {
  const {} = useConnect();
  return <main>{children}</main>;
};

export default App;
