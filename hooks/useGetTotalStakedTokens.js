import { useContractRead } from "wagmi";
import ABI from "../constant/abi.json";
import config from "../constant/config";

export function useGetTotalStakedTokens() {
  const contract = useContractRead(
    {
      abi: ABI,
      address: config.addresses.stakeAddress,
      functionName: "getTotalStakedTokens",
      args: [],
      select: (incomingData) => {
        return {
          raw: incomingData,
          formatted: Number(incomingData) / 10 ** 18,
        }
      },
      enabled: true,
    },
  );

  return {
    contract,
    data: contract.data,
  };
}
