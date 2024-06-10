import { useRef } from "react";
import classNames from "classnames";
import Image from "next/image";

import CustomizingPaper from "./paper";
import { INavigation } from "./types";
import { NavigationIcon } from "@/public/icons";
import { LBClickAnimation } from "@/components";

const Navigation = ({
  onClick,
  handleChange,
  isActive,
  handleLogoFile,
  logoURL,
  buyLink,
}: INavigation) => {
  const logoInputRef = useRef<HTMLInputElement>(null);

  const handleUpload = () => {
    if (logoInputRef.current) {
      logoInputRef.current.click();
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    if (file) {
      handleLogoFile(file);

      const reader = new FileReader();
      reader.onloadend = () => {
        const result = reader.result as string;
        handleChange("logoURL", result);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="px-4 rounded-lg border border-primary-50 bg-white flex flex-col self-stretch">
      <CustomizingPaper
        icon={<NavigationIcon />}
        isActive={isActive}
        title="Navigation"
        onClick={() => onClick("navigation")}
      />

      <div className="flex flex-col items-stretch justify-center gap-8 self-stretch pb-8">
        <div className="flex flex-col w-full gap-4">
          <span>Upload logo</span>

          <div className="w-[248px] h-[48px] flex items-center justify-center bg-white rounded-lg border border-primary-50">
            {logoURL && (
              <Image
                src={logoURL}
                alt="logo"
                width={500}
                height={500}
                className={classNames("object-cover w-[90px] h-[33px]")}
              />
            )}

            {!logoURL && (
              <span className="text-primary-750 text-[16px] leading-[20px]">
                Logo placeholder
              </span>
            )}
          </div>

          <div className="flex items-center justify-start gap-2">
            <LBClickAnimation
              onClick={handleUpload}
              className="rounded-lg py-2 px-3 bg-white border border-primary-1950 shadow-table-cta flex items-center justify-center"
            >
              Upload
            </LBClickAnimation>
            <span className="text-primary-700 text-sm">
              Recommended size 1:1, upto 500kb
            </span>
          </div>
        </div>

        <div className="relative flex flex-col w-full gap-1.5">
          <label className="text-primary-2000 text-sm">Buy button link</label>

          <div className="w-full flex items-center justify-center bg-white rounded-lg border border-primary-1950 overflow-hidden">
            <div className="px-3 py-2 ">https://</div>

            <input
              type="text"
              value={buyLink}
              onChange={(e) => handleChange("buyLink", e.target.value)}
              className="border-l border-l-primary-1950 px-3 py-2 text-primary-2200 flex-1 h-full outline-none"
              disabled
            />
          </div>

          <p className="text-primary-700 text-sm">
            This is auto-generated and cannot be modified
          </p>
        </div>
      </div>

      <input
        ref={logoInputRef}
        id="file-input"
        type="file"
        accept=".jpg, .jpeg, .png, .svg"
        className="hidden"
        onChange={handleFileChange}
      />
    </div>
  );
};

export default Navigation;
