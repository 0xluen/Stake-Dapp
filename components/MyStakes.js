import React, { useState } from "react";
import { useGetUserStakes } from "../hooks/useGetUserStakes";
import { useAccount } from "wagmi";
import { useContractWrite, useWaitForTransaction } from "wagmi";
import config from "../constant/config";
import { ethers } from "ethers";
import ABI from "../constant/abi.json";
import useCountdown from "../hooks/useCountdown";

function MyStakes() {
  const days = [7, 30, 60];
  const account = useAccount();
  const stakes = useGetUserStakes(account.address);

  const currentUnixTimestamp = Math.floor(Date.now() / 1000); 


  const unstake = async (id) => {

    const provider = new ethers.providers.Web3Provider(window.ethereum);
  
    const contract = new ethers.Contract(config.addresses.stakeAddress, ABI, provider.getSigner());
  
    const tx = await contract.unstakeTokens(id)
  
    const receipt = await tx.wait();

  }


  



  return (
    <div
      className={`w-full flex flex-col p-6 gap-4 rounded-lg bg-theme-mainbold`}
    >
      <div className="flex items-center justify-between">
        <div className="flex flex-col gap-2 w-full">
          <h2 className="text-2xl text-white">My Stakes</h2>
          <hr className="border-[1px] border-slate-600 w-full h-[1px]" />
        </div>
      </div>
      {stakes.data.map((item, index) => {
        return(
          <div>
          { item.amount > 0 &&  <>
            <div className="flex flex-col gap-2" key={index}>
              <div className="flex items-center justify-start gap-1">
                <span className="text-slate-400 text-lg">Lock period: </span>
                <span className="text-white text-lg">{
                item.stakeType == 0 ? "3" : item.stakeType == 1 ? "6" : "12"
                } month</span>
              </div>
              <div className="flex items-center justify-start gap-1">
                <span className="text-slate-400 text-lg">APY Rate: </span>
                <span className="text-theme-blueBold text-lg">
                  {item.stakeType === 0
                    ? "8%"
                    : item.stakeType === 1
                    ? "10%"
                    : "12%"}
                </span>
                
              </div>
              <div className="flex items-center justify-start gap-1">
                <span className="text-slate-400 text-lg">Amount: </span>
                <span className="text-theme-blueBold text-lg">
                  {(Number(item.rawAmount) / 10 ** 18)}
                </span>
                
              </div>
              <div className="flex items-center justify-start gap-1">
                <span className="text-slate-400 text-lg">
                  Unlock Stake:{" "}
                </span>
                <span className="text-white text-lg">
                  {new Date((item.startTime + (item.stakeType === 0 ? 3 : item.stakeType === 1 ? 6 : 12) * 2592000) * 1000).toLocaleString()}
                </span>
              </div>
              <div className="mt-2">,
                    
                  <button className={new Date((item.startTime + (item.stakeType === 0 ? 3 : item.stakeType === 1 ? 6 : 12) * 2592000) * 1000) < currentUnixTimestamp ? "bg-violet-500 px-6 py-4 w-full opacity-50" : "bg-violet-500 cursor-not-allowed px-6 py-4 w-full opacity-50"} onClick={e=>unstake(item.id)}>Unlock </button>
                    
              </div>
  
            </div>
            {index !== days.length - 1 && (
              <hr className="border-[1px] border-slate-600 w-full h-[1px]" />
            )}
          </> }
          </div>
        )
      })}
    </div>
  );
}

export default MyStakes;
