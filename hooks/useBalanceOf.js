import { useContractRead } from "wagmi";
import config from "../constant/config";

export function useBalanceOf(address) {
  const contract = useContractRead({
    abi: [
      {
        inputs: [
          {
            internalType: "address",
            name: "account",
            type: "address",
          },
        ],
        name: "balanceOf",
        outputs: [
          {
            internalType: "uint256",
            name: "",
            type: "uint256",
          },
        ],
        stateMutability: "view",
        type: "function",
      },
    ],
    address: config.addresses.tokenAddress,
    functionName: "balanceOf",
    args: [address],
    enabled: !!address,
    select: (data) => {
        return {
            raw: data,
            formatted: Number(data) / 10 ** 18,
        };
    }
  });

  return {
    contract,
    data: contract.data,
  }
}
