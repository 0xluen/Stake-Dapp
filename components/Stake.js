import React, { useEffect, useState } from "react";
import useCountdown from "../hooks/useCountdown";
import { useApprove } from "../hooks/useApprove";
import { useBalanceOf } from "../hooks/useBalanceOf";
import { useStakeTokens } from "../hooks/useStakeTokens";
import { useAccount } from "wagmi";

const NumberFormat = new Intl.NumberFormat("en-US");

function Stake() {
  const lockedDays = [3, 6, 12];

  const [selectedDay, setSelectedDay] = useState(12);
  const [amount, setAmount] = useState(0);

  const account = useAccount();

  const approve = useApprove(amount);
  const stackTokens = useStakeTokens(amount);
  const balanceOf = useBalanceOf(account.address);

  const handleSelectDay = (day) => {
    setSelectedDay(day);
    // ..
  };

  const [days, hours, minutes, seconds] = useCountdown(new Date("2023-11-22"));

  const handleApproveClick = async () => {
    approve.contract.write();
  };

  const handleStackClick = async () => {
    await stackTokens.contract.writeAsync({
      args: [amount * 1e18, selectedDay == 3 ? 0 : selectedDay == 6 ? 1 : 2],
    });
  };

  useEffect(() => {
    if (approve.transaction.isSuccess) {
      stackTokens.contract.reset();
      approve.contract.reset();
      setTimeout(() => {
        window.location.reload();
      }, 2000); 
    }
  }, [stackTokens.transaction.isSuccess]);

  const balance = balanceOf.data?.formatted;

  const displayBalance = isNaN(balance) ? 0 : NumberFormat.format(balance);
  return (
    <div
      className={`w-full h-full flex flex-col p-6 gap-4 rounded-lg bg-theme-mainbold`}
    >
      <div className="flex items-center justify-between">
        <div className="flex flex-col gap-2 w-full">
          <h2 className="text-2xl text-white">Stake</h2>
          <h4 className="text-xl text-white">Time remaining for the stake to close :</h4>
          <div className="grid grid-cols-2 md:grid-cols-4 w-full">
            <span className={`w-full py-2 text-sm text-center text-slate-300`}>
              {days} DAYS
            </span>
            <span className={`w-full py-2 text-sm text-center text-slate-300`}>
              {hours} HOURS
            </span>
            <span className={`w-full py-2 text-sm text-center text-slate-300`}>
              {minutes} MINUTES
            </span>
            <span className={`w-full py-2 text-sm text-center text-slate-300`}>
              {seconds} SECONDS
            </span>
          </div>
          <hr className="border-[1px] border-slate-600 w-full h-[1px]" />
        </div>
      </div>
      <div className="grid grid-cols-3 w-full gap-2">
        {lockedDays.map((day, index) => (
          <button
            key={index}
            onClick={() => handleSelectDay(day)}
            className={`
            mx-auto font-bold px-4 w-full py-2 hover:bg-theme-gray hover:text-theme-blueBold text-md text-white border-[1px] border-theme-gray
            ${selectedDay === day ? "bg-theme-gray text-theme-blueBold" : ""}
            `}
          >
            {day} MONTHS
          </button>
        ))}
      </div>
      <div className="flex flex-col gap-2">
        <div className="flex items-center justify-start gap-1">
          <span className="text-slate-400 text-lg">Lock period: </span>
          <span className="text-white text-lg">{selectedDay} Months</span>
        </div>
        <div className="flex items-center justify-start gap-1">
          <span className="text-slate-400 text-lg">APY Rate: </span>
          <span className="text-theme-blueBold text-lg">
            {selectedDay == 3 ? "8%" : selectedDay == 6 ? "10%" : "12%"}
          </span>
        </div>
        <div className="flex items-center justify-start gap-1">
          <span className="text-slate-400 text-lg">
            Unlock Time:{" "}
          </span>
          <span className="text-white text-lg">
            {new Intl.DateTimeFormat('tr-TR').format(Date.now() + selectedDay * 30 * 24 * 60 * 60 * 1000)}
          </span>
        </div>
      </div>
      <span className="text-white text-lg font-bold">
        Balance: {displayBalance} RAPID
      </span>
      <div className="flex justify-around w-full items-center gap-2 md:gap-6">
        <div className="flex items-center justify-between border-[1px] p-4 w-4/6 border-theme-gray">
          <input
            onChange={(e) =>
              setAmount(
                isNaN(Number(e.target.value)) ? 0 : Number(e.target.value)
              )
            }
            min={0}
            max={balanceOf.data?.formatted}
            type="number"
            className="max-w-[75%] bg-theme-mainbold outline-0 text-slate-300 px-3"
            placeholder="00.00"
            value={amount}
          />
          <span
            onClick={() => setAmount(balanceOf.data?.formatted)}
            className="text-white"
          >
            MAX
          </span>
        </div>
        {!approve.transaction.isSuccess && (
          <button
            onClick={handleApproveClick}
            className={`mx-auto font-bold p-4 bg-theme-blueBold text-white w-full text-md border-[1px] border-theme-gray`}
          >
            {approve.transaction.isLoading
              ? "Loading..."
              : approve.transaction.isError
              ? "Error"
              : approve.transaction.isSuccess
              ? "Success"
              : "Approve"}
          </button>
        )}
        {approve.transaction.isSuccess &&
          !stackTokens.transaction.isSuccess && (
            <button
              onClick={handleStackClick}
              className={`mx-auto font-bold p-4 bg-theme-blueBold text-white w-full text-md border-[1px] border-theme-gray`}
            >
              {stackTokens.transaction.isLoading
                ? "Loading..."
                : stackTokens.transaction.isError
                ? "Error"
                : stackTokens.transaction.isSuccess
                ? "Success"
                : "Stake"}
            </button>
          )}
      </div>
    </div>
  );
}

export default Stake;
