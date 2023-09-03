"use client";
import React, { useEffect } from "react";
import millify from "millify";
import Link from "next/link";
import AOS from "aos";
import "aos/dist/aos.css";

// In your component's useEffect:

function Card({ curElem }) {
  useEffect(() => {
    AOS.init();
  }, []);
  const { uuid, rank, name, iconUrl, price, marketCap, change } = curElem;
  return (
    <div className="">
      <Link
        href={`/cryptos/${uuid}`}
        data-aos="fade-up"
        data-aos-anchor-placement="center-bottom"
      >
        {" "}
        <div className="sizecard hover:opacity-75 ">
          <div className="w-72 p-3 hover:bg-slate-600  m-2 max-w-sm shadow-[4.0px_8.0px_8.0px_rgba(0,0,0,0.38)] rounded-lg bg-[conic-gradient(at_left,_var(--tw-gradient-stops))] from-yellow-500 via-purple-500 to-blue-500">
            <div className="flex justify-between  border-slate-50 border-b items-center pb-4">
              <h5 className="mb-1 text-lg font-medium text-white">
                {rank}.
                {`${name.length > 20 ? name.substring(0, 15) + "..." : name}`}
              </h5>{" "}
              <img
                className="w-16 h-16  mb-3 moving rounded-full shadow-lg"
                src={iconUrl}
                alt="Bonnie image"
              />
            </div>
            <div className="flex flex-col m-3">
              <span className="text-sm text-white m-1 ">
                Price: {millify(price)}
              </span>
              <span className="text-sm text-white m-1 ">
                Market Cap: {millify(marketCap)}
              </span>
              <span className="text-sm text-white m-1 ">
                Daily Change: {millify(change)}
              </span>
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
}

export default Card;

//   <div className="w-48 bg-green-600 p-4 h-44">
//     <div className="flex w-full bg-cyan-400  items-center justify-between">
//       <div className="">1.Bitcoin</div>
//       <div>
//         <img
//           className="cardimg mt-0"
//           src="https://cdn.coinranking.com/Sy33Krudb/btc.svg"
//         />
//       </div>
//     </div>
//   </div>
