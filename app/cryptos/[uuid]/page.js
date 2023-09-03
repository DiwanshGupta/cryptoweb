"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import millify from "millify";
import Link from "next/link";
import AOS from "aos";
import "aos/dist/aos.css";
import Loading from "@/app/loading";
import { AiOutlineDollarCircle, AiOutlineArrowsAlt } from "react-icons/ai";
import { Ri24HoursFill } from "react-icons/ri";
import { SiCoinmarketcap } from "react-icons/si";
import { FaHashtag } from "react-icons/fa";
import { BsCurrencyDollar } from "react-icons/bs";
import CreateApiConfig from "@/app/crypto_api/apicrypto";
import HTMLReactParser from "html-react-parser";
import Linechart from "@/app/components/linechart";
function Contentdata({ params }) {
  const [coindata, setcoindata] = useState([]);
  const [isloading, setLoading] = useState(false);
  const [selectedTime, setSelectedTime] = useState("");
  useEffect(() => {
    AOS.init();
  }, []);
  const id = params.uuid;
  const timeOptions = ["0", "3h", "24h", "7d", "30d", "3m", "1y", "3y", "5y"];
  const handleTimeChange = (e) => {
    // Update selectedTime when the user selects a new option
    setSelectedTime(e.target.value);
  };
  useEffect(() => {
    const datafetch = async () => {
      const endpoint = `/coin/${id}`;
      const params = {
        referenceCurrencyUuid: "yhjMzLPhuIDl",
        timePeriod: "24h",
      };
      const options = CreateApiConfig(endpoint, params);

      try {
        const info = await axios.request(options);
        setcoindata(info.data.data.coin);
      
        setLoading(true);
      } catch (error) {
        console.error(error);
      }
    };
    datafetch();
  }, [id]);
  return (
    <>
      {" "}
      {isloading ? (
        <div className="h-full p-5 text-white">
          {" "}
          <div className="flex justify-center  relative  font-bold  items-center sm:text-5xl text-3xl  bg-gradient-to-r from-red-500 via-pink-500 to-blue-500 text-transparent bg-clip-text animate-gradient">
            {coindata.name}-({coindata.symbol})
          </div>
          <div className="text-gray-800 justify-center flex ">
            {coindata.name} in US Dollars
          </div>
          <div>
            <select
              className="w-14 border-none appearance-none outline-none  py-1 px-2 bg-blue-400 rounded-md text-gray-900"
              value={selectedTime} // Set the value of the select element to selectedTime
              onChange={handleTimeChange}
            >
              {timeOptions.map((date) => (
                <option key={date} value={date}>
                  {date}
                </option>
              ))}
            </select>
          </div>
          <Linechart id={id} time={selectedTime} />
          <div className="flex justify-center flex-col m-auto items-center">
            <div className="text-2xl font-semibold  bg-gradient-to-r from-yellow-600 via-green-600 to-orange-500 text-transparent bg-clip-text animate-gradient">
              Over view state of {coindata.name}
            </div>
            <div className="relative w-80 text-slate-300 sm:w-96 overflow-x-auto shadow-md rounded-lg">
              <table className="w-full text-base tablebg ">
                <tbody>
                  <tr className="">
                    <th className="px-6 py-4">
                      <FaHashtag />
                    </th>
                    <th className="px-6 py-4 font-bold">Rank</th>
                    <td className="px-6 py-4">
                      <span className="flex font-bold items-center">
                        <BsCurrencyDollar className="mr-1" /> {coindata.rank}
                      </span>
                    </td>
                  </tr>
                  <tr className="font-bold ">
                    <th className="px-6 py-4">
                      <AiOutlineDollarCircle />
                    </th>
                    <th className="px-6 py-4">Price to USD</th>
                    <td className="px-6 py-4">
                      <span className="flex font-bold items-center">
                        <BsCurrencyDollar className="mr-1" />{" "}
                        {millify(coindata.price)}
                      </span>
                    </td>
                  </tr>
                  <tr className="">
                    <th className="px-6 py-4">
                      <Ri24HoursFill />
                    </th>
                    <th className="px-6 py-4">24hVolume </th>
                    <td className="px-6 py-4">
                      <span className="flex font-bold items-center">
                        <BsCurrencyDollar className="mr-1" />{" "}
                        {millify(coindata["24hVolume"])}
                      </span>
                    </td>
                  </tr>{" "}
                  <tr className="">
                    {" "}
                    <th className="px-6 py-4">
                      <SiCoinmarketcap />
                    </th>
                    <th className="px-6 py-4">Market Cap</th>
                    <th className="px-6 py-4">
                      <span className="flex font-bold items-center">
                        <BsCurrencyDollar className="mr-1" />{" "}
                        {millify(coindata.marketCap)}
                      </span>
                    </th>
                  </tr>
                  <tr className="">
                    <th className="px-6 py-4">
                      <AiOutlineArrowsAlt />
                    </th>
                    <th className="px-6 py-4">Average</th>
                    <td className="px-6 py-4">
                      {" "}
                      {coindata.allTimeHigh ? (
                        <span className="flex font-bold items-center">
                          <BsCurrencyDollar className="mr-1" />{" "}
                          {millify(coindata.allTimeHigh.price)}
                        </span>
                      ) : (
                        "N/A"
                      )}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div className="text-3xl m-5 font-semibold flex items-center bg-gradient-to-r from-yellow-600 via-green-600 to-orange-500 text-transparent bg-clip-text animate-gradient">
              Other states of {coindata.name}
            </div>
            <div className="relativew-80 text-slate-300  sm:w-96 overflow-x-auto shadow-md rounded-lg">
              <table className="w-full text-base table2bg">
                <tbody>
                  <tr className="font-semibold ">
                    <th className="px-6 py-4">
                      <AiOutlineDollarCircle />
                    </th>
                    <th className="px-6 py-4">No. of Markets</th>
                    <td className="px-6 py-4">
                      <span className="flex font-bold items-center">
                        <BsCurrencyDollar className="mr-1" />{" "}
                        {millify(coindata.numberOfMarkets)}
                      </span>
                    </td>
                  </tr>
                  <tr className="">
                    <th className="px-6 py-4">
                      <Ri24HoursFill />
                    </th>
                    <th className="px-6 py-4">No. of Exchange </th>
                    <td className="px-6 py-4">
                      <span className="flex font-bold items-center">
                        <BsCurrencyDollar className="mr-1" />{" "}
                        {millify(coindata.numberOfExchanges)}
                      </span>
                    </td>
                  </tr>{" "}
                  <tr className="">
                    {" "}
                    <th className="px-6 py-4">
                      <SiCoinmarketcap />
                    </th>
                    <th className="px-6 py-4">Total Supply</th>
                    <th className="px-6 py-4">
                      {coindata.supply ? (
                        <span className="flex font-bold items-center">
                          <BsCurrencyDollar className="mr-1" />{" "}
                          {millify(coindata.supply.total)}
                        </span>
                      ) : (
                        "N/A"
                      )}
                    </th>
                  </tr>
                  <tr className="">
                    <th className="px-6 py-4">
                      <AiOutlineArrowsAlt />
                    </th>
                    <th className="px-6 py-4">Circulating Supply</th>
                    <td className="px-6 py-4">
                      {" "}
                      {coindata.supply ? (
                        <span className="flex font-bold items-center">
                          <BsCurrencyDollar className="mr-1" />{" "}
                          {millify(coindata.supply.circulating)}
                        </span>
                      ) : (
                        "N/A"
                      )}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div className="flex flex-col">
              <div
                data-aos="fade-up"
                data-aos-anchor-placement="center-bottom"
                className="text-3xl font-semibold bg-gradient-to-r from-yellow-600 via-green-600 to-orange-500 text-transparent bg-clip-text animate-gradient"
              >
                {" "}
                What is {coindata.name}?
              </div>
              <div className="text-xl text-gray-600">
                {coindata.description && HTMLReactParser(coindata.description)}
              </div>
            </div>
            <div
              className="relative w-80 bg-gradient-to-r from-gray-400  to-blue-400  text-slate-600 sm:w-96 shadow-2xl overflow-x-auto  rounded-lg"
              data-aos="fade-up"
              data-aos-anchor-placement="center-bottom"
            >
              <table className="w-full text-base">
                {" "}
                <tbody>
                  {coindata.links &&
                    coindata.links.map((link) => (
                      <tr key={link.type} className="border-b">
                        <th className="px-6 py-4  font-bold">{link.type}</th>
                        <th className="px-6 py-4">
                          <Link href={link.url}>{link.name}</Link>
                        </th>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      ) : (
        <Loading />
      )}
    </>
  );
}

export default Contentdata;
