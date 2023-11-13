import { useContractRead } from "wagmi";
import ABI from "../constant/abi.json";
import config from "../constant/config";

export function useGetUserStakes(address) {
  const contract = useContractRead({
    abi: ABI,
    functionName: "getUserStakes",
    args: [address],
    enabled: !!address,
    select: (data) => {
      return data[0].map((stake,index) => {
        return {
          stalker: stake.staker,
          amount: Number(stake.amount) / 10 ** 18,
          rawAmount: stake.amount,
          stakeType: stake.stakeType,
          startTime: Number(stake.startTime),
          id:Number(data[1][index])
        };
      });
    },
    address: config.addresses.stakeAddress,
  });

  return {
    contract,
    data: contract.data || [],
  };
}
