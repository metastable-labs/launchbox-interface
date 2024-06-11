"use client";

import { useState } from "react";
import { usePathname } from "next/navigation";
import classNames from "classnames";
import { useAccount } from "wagmi";

import Left from "./left";
import Right from "./right";
import Menu from "./menu";
import { TokenIcon } from "@/public/icons";
import { INavLinks, INavActions, ILBNavigation } from "./types";
import LBModal from "../modal";
import { ModalType } from "./modals/types";
import WalletModal from "./modals/wallet";
import NetworkModal from "./modals/network";

const LBNavigation = ({ network }: ILBNavigation) => {
  const { address } = useAccount();
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);
  const [modalType, setModalType] = useState<ModalType>();

  const links: INavLinks = [
    {
      title: "Tokens",
      icon: <TokenIcon />,
      href: "/tokens",
      isActive: false,
    },
    {
      title: "Launch",
      icon: <TokenIcon />,
      href: "/tokens/new",
      isActive: false,
    },
  ];

  const updatedLinks = links?.map((link) => {
    const updatedHref = `/${network}${link.href}`;
    return {
      ...link,
      href: updatedHref,
      isActive: updatedHref === pathname,
    };
  });

  const toggleMenu = () => setMenuOpen((prev) => !prev);

  const closeModal = () => setModalType(undefined);

  const handleModal = (type: ModalType) => {
    setModalType(type);
  };

  const actionItems: INavActions = [
    {
      variant: "network",
    },
    {
      text: address || "Connect",
      variant: "wallet",
    },
  ];

  return (
    <>
      <div
        className={classNames(
          "fixed w-screen z-10 flex justify-center items-center md:pt-0 bg-white border-b border-primary-50"
        )}
      >
        <nav className="flex-1 flex bg-white px-4 py-[14px] md:px-11 md:py-5 items-center justify-between relative">
          <Left links={updatedLinks} />
          <Right
            menuOpen={menuOpen}
            toggleMenu={toggleMenu}
            actionItems={actionItems}
            handleModal={handleModal}
          />

          <Menu
            menuOpen={menuOpen}
            links={updatedLinks}
            actionItems={actionItems}
            handleModal={handleModal}
          />
        </nav>

        <LBModal show={Boolean(modalType)} close={closeModal}>
          {modalType === "wallet" && <WalletModal close={closeModal} />}
          {modalType === "network" && <NetworkModal close={closeModal} />}
        </LBModal>
      </div>
      <div className="h-[123px] md:h-[82px]" />
    </>
  );
};

export default LBNavigation;
