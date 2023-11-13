"use client";
import React from "react";
import Image from "next/image";

import logo from "../images/logo.png";
import { BiMenu, BiWalletAlt } from "react-icons/bi";
import { Dropdown } from "antd";
import { ConnectButton, useConnectModal } from "@rainbow-me/rainbowkit";
import { useAccount } from "wagmi";


export function CustomConnectButton() {


  return (
    <ConnectButton.Custom>
      {({
        account,
        chain,
        openAccountModal,
        openChainModal,
        openConnectModal,
        authenticationStatus,
        mounted,
      }) => {
        const ready = mounted && authenticationStatus !== "loading";
        const connected =
          ready &&
          account &&
          chain &&
          (!authenticationStatus || authenticationStatus === "authenticated");

        return (
          <div
            {...(!ready && {
              "aria-hidden": true,
              style: {
                opacity: 0,
                pointerEvents: "none",
                userSelect: "none",
              },
            })}
          >
            {(() => {
              if (!connected) {
                return (
                  <button
                    className="p-2 px-6 bg-white text-md font-bold text-black flex items-center gap-1"
                    onClick={openConnectModal}
                    type="button"
                  >
                    Connect Wallet
                  </button>
                );
              }

              if (chain.unsupported) {
                return (
                  <button
                    className="p-2 px-6 bg-white text-md font-bold text-black flex items-center gap-1"
                    onClick={openChainModal}
                    type="button"
                  >
                    Wrong network
                  </button>
                );
              }

              return (
                <div style={{ display: "flex", gap: 12 }}>
                  <button
                    className="p-2 px-6 bg-white text-md font-bold text-black flex items-center gap-1"
                    onClick={openAccountModal}
                    type="button"
                  >
                    {account.displayName}
                    {account.displayBalance
                      ? ` (${account.displayBalance})`
                      : ""}
                  </button>
                </div>
              );
            })()}
          </div>
        );
      }}
    </ConnectButton.Custom>
  );
}

function Navbar() {
  const items = [
    {
      key: "1",
      label: (
       <a href="https://www.rapidchain.net/" target="_blank">
        <button className="p-2 px-6 text-md text-white font-bold flex items-center gap-1 border-[1px] bg-none border-slate-400 w-full">
          BUY $RAPID
        </button>
        </a>
      ),
    },
    {
      key: "2",
      label: <CustomConnectButton />,
    },
  ];

  return (
    <div className="h-[80px] rounded-lg bg-theme-mainColor w-full flex px-4 py-2 items-center justify-between">
      <div className="h-[80px] flex items-center justify-start max-h-full">
        <Image
          src={logo}
          alt=""
          className="max-h-full my-auto object-contain w-[72px]"
        />
      </div>
      <Dropdown
        className="flex md:hidden"
        menu={{
          items,
        }}
        placement="bottomRight"
        arrow
      >
        <BiMenu className="text-5xl text-white" />
      </Dropdown>
      <div className="hidden md:flex items-center justify-end w-3/6 gap-2">
      <a href="https://www.rapidchain.net/" target="_blank">

        <button className="p-2 px-6 text-md text-white font-bold flex items-center gap-1 border-[1px] bg-none border-slate-400">
        BUY $RAPID
        </button>
        </a>
        <CustomConnectButton />
      </div>
    </div>
  );
}

export default Navbar;
