import { useContractWrite, useWaitForTransaction } from "wagmi"
import ABI from "../constant/abi.json"
import config from "../constant/config.js"

export function useStakeTokens() {
    const contract = useContractWrite({
        abi: ABI,
        address: config.addresses.stakeAddress,
        functionName: "stakeTokens",
        args: [],
    });

    const transaction = useWaitForTransaction({
        hash: contract.data?.hash,
    });

    return {
        contract,
        transaction,
    }
}