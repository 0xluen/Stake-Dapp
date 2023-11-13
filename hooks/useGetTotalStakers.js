import { useContractRead } from "wagmi";
import ABI from "../constant/abi.json";
import config from "../constant/config";

export function useGetTotalStakers() {
  const contract = useContractRead(
    {
      abi: ABI,
      address: config.addresses.stakeAddress,
      args: [],
      functionName: "getTotalStakers",
      select: (incomingData) => {
        return {
          raw: incomingData,
          formatted: Number(incomingData),
        };
      },
      enabled: true,
    },
  );

  return {
    contract,
    data: contract.data,
  };
}
