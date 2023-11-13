import { useContractWrite, useWaitForTransaction } from "wagmi";
import config from "../constant/config";

export function useApprove(amount) {
  const contract = useContractWrite({
    abi: [
      {
        inputs: [
          {
            internalType: "address",
            name: "spender",
            type: "address",
          },
          {
            internalType: "uint256",
            name: "amount",
            type: "uint256",
          },
        ],
        name: "approve",
        outputs: [
          {
            internalType: "bool",
            name: "",
            type: "bool",
          },
        ],
        stateMutability: "nonpayable",
        type: "function",
      },
    ],

    address: config.addresses.tokenAddress,
    functionName: "approve",
    args: [config.addresses.stakeAddress, amount * 10 ** 18],
  });

  const transaction = useWaitForTransaction({
    hash: contract.data?.hash,
  });

  return {
    contract,
    transaction,
    data: contract.data,
  };
}
