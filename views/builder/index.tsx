"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import classNames from "classnames";

import Header from "./header";
import {
  CustomizeChange,
  ILBLandingPageComponent,
} from "@/components/landing/types";
import { defaultData } from "../landing";
import { LBLandingPageComponent } from "@/components";
import CustomizingInterface from "./customizing";

const externalLink = "#";

const BuilderView = () => {
  const [buildData, setBuildData] =
    useState<ILBLandingPageComponent>(defaultData);
  const [displayType, setDisplayType] = useState<DisplayType>("desktop");
  const [shouldHideCustomize, setShouldHideCustomize] = useState(false);
  const [logoFile, setLogoFile] = useState<File | null>(null);
  const [heroImageFile, setHeroImageFile] = useState<File | null>(null);

  const publishActive = false;
  const saveActive = false;

  const hideCoustomize = () => setShouldHideCustomize((prev) => !prev);
  const publish = () => {};
  const save = () => {};

  const handleChange = (name: CustomizeChange, value: any) => {
    setBuildData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const headerData = {
    externalLink,
    shouldHideCustomize,
    hideCoustomize,
    publish,
    publishActive,
    save,
    saveActive,
    setDisplay: setDisplayType,
    displayType,
  };

  const customisingInterfaceData = {
    setLogoFile,
    data: buildData,
    handleChange,
    setHeroImageFile,
  };

  return (
    <>
      <Header {...headerData} />

      <main
        className={classNames("flex h-full px-10", {
          "gap-8": !shouldHideCustomize,
        })}
      >
        <motion.div
          animate={{
            width: shouldHideCustomize ? 0 : "30%",
            opacity: shouldHideCustomize ? 0 : 1,
          }}
          className="h-screen pt-[112px] flex"
        >
          <CustomizingInterface {...customisingInterfaceData} />
        </motion.div>

        <motion.div
          animate={{
            width: shouldHideCustomize ? "100%" : "70%",
            scale: shouldHideCustomize ? 1.02 : 1,
          }}
          className="h-screen overflow-auto flex justify-center pt-[112px]"
        >
          <LBLandingPageComponent
            {...buildData}
            isBuilder
            isDesktop={displayType === "desktop"}
            isMobile={displayType === "mobile"}
          />
        </motion.div>
      </main>
    </>
  );
};

export default BuilderView;
