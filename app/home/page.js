"use client";
import React, { useState } from "react";
import axios from "axios";
import { useEffect } from "react";
import millify from "millify";
import Link from "next/link";
import Card from "../components/card";
import { ImOpt } from "react-icons/im";
import Loading from "../loading";
import CreateApiConfig from "../crypto_api/apicrypto";
function Homepage() {
  const [maindata, setmaindata] = useState([]);
  const [cardData, setcarddata] = useState([]);
  const [isloading, setLoading] = useState(false);

  useEffect(() => {
    const datafetch = async () => {
      const endpoint = "/coins";
      const params = {
        referenceCurrencyUuid: "yhjMzLPhuIDl",
        timePeriod: "24h",
        orderBy: "marketCap",
        orderDirection: "desc",
        limit: "50",
        offset: "0",
      };

      const options = CreateApiConfig(endpoint, params);

      try {
        const info = await axios.request(options);
        // console.log(info.data);
        setmaindata(info.data);
        setcarddata(info.data.data.coins);
        setLoading(true);
      } catch (error) {
        // console.error(error);
      }
    };
    datafetch();
  }, []);
  return (
    <>
      {" "}
      {isloading ? (
        <main className="h-full mt-5 p-5">
          <div className="text-3xl text-slate-200 font-semibold">
            Global Crypto status
          </div>
          <table className="m-auto  w-full ">
            <tbody className="flex justify-between flex-row">
              <tr className="flex text-white p-3 flex-col w-2/4 ">
                <td>Total Cryptos.</td>
                {maindata.data && maindata.data.stats
                  ? millify(maindata.data.stats.totalCoins)
                  : " "}
              </tr>
              <tr className="flex text-white  p-3 flex-col w-2/4">
                <td>Total Exchange</td>
                {maindata.data && maindata.data.stats
                  ? millify(maindata.data.stats.totalExchanges)
                  : ""}
              </tr>
            </tbody>
            <tbody className="flex text-white flex-row ">
              <tr className="flex  p-3 flex-col  w-2/4">
                <td>Total Market cap</td>
                {maindata.data && maindata.data.stats
                  ? millify(maindata.data.stats.totalMarketCap)
                  : ""}
              </tr>
              <tr className="flex  p-3 flex-col  w-2/4">
                <td className="">Total 24h Volume</td>
                {maindata.data && maindata.data.stats
                  ? millify(maindata.data.stats.total24hVolume)
                  : ""}
              </tr>
            </tbody>
            <tbody className="flex  text-white flex-row ">
              <tr className="flex  p-3 flex-col ">
                <td className=" ">Total Markets</td>
                {maindata.data && maindata.data.stats
                  ? millify(maindata.data.stats.totalMarkets)
                  : ""}
              </tr>
            </tbody>
          </table>
          <div className="sm:text-3xl text-xl text-slate-300 h-auto font-semibold">
            Top 10 Currencies in the world
          </div>{" "}
          <div className="flex  justify-around flex-wrap ">
            {cardData.slice(0, 10).map((coin, index) => (
              <Card key={index} curElem={coin} />
            ))}
          </div>
          <div>
            <div class="buttons ">
              <Link href="/cryptos">
                <button class="blob-btn">
                  Show more
                  <span class="blob-btn__inner">
                    <span class="blob-btn__blobs">
                      <span class="blob-btn__blob"></span>
                      <span class="blob-btn__blob"></span>
                      <span class="blob-btn__blob"></span>
                      <span class="blob-btn__blob"></span>
                    </span>
                  </span>
                </button>
              </Link>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="hidden"
                version="1.1"
              >
                <defs>
                  <filter id="goo">
                    <feGaussianBlur
                      in="SourceGraphic"
                      result="blur"
                      stdDeviation="10"
                    ></feGaussianBlur>
                    <feColorMatrix
                      in="blur"
                      mode="matrix"
                      values="1 0 0 0 0 0 1 0 0 0 0 0 1 0 0 0 0 0 21 -7"
                      result="goo"
                    ></feColorMatrix>
                    <feBlend
                      in2="goo"
                      in="SourceGraphic"
                      result="mix"
                    ></feBlend>
                  </filter>
                </defs>
              </svg>
            </div>
          </div>
        </main>
      ) : (
        <Loading />
      )}
    </>
  );
}

export default Homepage;
