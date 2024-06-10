import classNames from "classnames";

import CustomizingPaper from "./paper";
import { IAppearance, ICustomizeTab } from "./types";
import { ApperanceIcon } from "@/public/icons";
import LBColorInput from "@/components/color-input";

const Appearance = ({
  onClick,
  handleChange,
  isActive,
  primaryColor,
  secondaryColor,
}: IAppearance) => {
  return (
    <div
      className={classNames("", {
        "px-4 rounded-lg border border-primary-50 bg-white flex flex-col self-stretch":
          isActive,
      })}
    >
      <CustomizingPaper
        icon={<ApperanceIcon />}
        isActive={isActive}
        title="Appearance"
        onClick={() => onClick("appearance")}
      />

      <div className="flex flex-col items-stretch justify-center gap-5 self-stretch pb-8">
        <LBColorInput
          color={primaryColor}
          handleChange={(color) => handleChange("primaryColor", color)}
          label="Primary color"
          instruction="Set the primary color to match your branding"
        />

        <LBColorInput
          color={secondaryColor}
          handleChange={(color) => handleChange("secondaryColor", color)}
          label="Secondary color"
          instruction="Set the secondary color to match your branding"
        />
      </div>
    </div>
  );
};

export default Appearance;
