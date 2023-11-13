import { useContractRead, useContractWrite, useWaitForTransaction } from "wagmi"
import ABI from "../constant/abi.json"
import config from "../constant/config.js"

export function useCalculateReward(stakeId) {
    const contract = useContractRead({
        abi: ABI,
        address: config.addresses.stakeAddress,
        functionName: "calculateReward",
        args: [stakeId],

        enabled: !!stakeId,

        select: (data) => {
            return {
                raw: data,
                formatted: Number(data) / 10 ** 18,
            };
        }
    });

    return {
        contract,
        data: contract.data
    }
}