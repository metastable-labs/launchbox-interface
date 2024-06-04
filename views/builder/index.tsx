"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import classNames from "classnames";

import Header from "./header";
import { ILBLandingPageComponent } from "@/components/landing/types";
import { defaultData } from "../landing";
import { LBLandingPageComponent } from "@/components";

const externalLink = "#";

const BuilderView = () => {
  const [buildData, setBuildData] =
    useState<ILBLandingPageComponent>(defaultData);
  const [displayType, setDisplayType] = useState<DisplayType>("desktop");
  const [shouldHideCustomize, setShouldHideCustomize] = useState(false);

  const publishActive = false;
  const saveActive = false;

  const hideCoustomize = () => setShouldHideCustomize((prev) => !prev);
  const publish = () => {};
  const save = () => {};

  return (
    <>
      <Header
        externalLink={externalLink}
        shouldHideCustomize={shouldHideCustomize}
        hideCoustomize={hideCoustomize}
        publish={publish}
        publishActive={publishActive}
        save={save}
        saveActive={saveActive}
        setDisplay={setDisplayType}
        displayType={displayType}
      />

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
          className="h-screen bg-primary-300 pt-[112px] flex items-center justify-center"
        >
          Editing Interface goes here
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
