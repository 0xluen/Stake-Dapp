import React from "react";
import Image from "next/image";

import img from "../images/statistics.png";
import { useGetTotalStakedTokens } from "../hooks/useGetTotalStakedTokens";
import { useGetTotalStakers } from "../hooks/useGetTotalStakers";

const NumberFormat = new Intl.NumberFormat('en-US');

function Statistics(props) {
  const totalStakedTokens = useGetTotalStakedTokens();
  const totalStakers = useGetTotalStakers();

  const items = [
    {
      title: NumberFormat.format(totalStakedTokens.data?.formatted) ,
      value: "Total Value Locked",
    },
    {
      title: "10%",
      value: "Avarage Apy",
    },
    {
      title: NumberFormat.format(totalStakers.data?.formatted),
      value: "Number of Stakers",
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      {items.map((item, index) => (
        <div
          key={index}
          className="bg-theme-mainbold rounded-lg p-6 flex flex-col gap-6"
        >
          <span className="text-xl md:text-3xl font-bold text-white">
            {item.title}
          </span>
          <div className="flex flex-col">
            <span className="text-md md:text-lg text-slate-300">
              {item.value}
            </span>
            <Image src={img} alt="" className="w-full" />
          </div>
        </div>
      ))}
    </div>
  );
}

export default Statistics;
