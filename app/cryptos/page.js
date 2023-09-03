"use client";
import React, { useState, useEffect } from "react";
import Card from "../components/card";
import axios from "axios";
import millify from "millify";
import Loading from "../loading";
import Skelton from "../components/skeleton";
import CreateApiConfig from "../crypto_api/apicrypto";
function Cryptocurrencies() {
  const [cardata, setcarddata] = useState([]);
  const [isloading, setLoading] = useState(false);
  const [search, setSearch] = useState("");
  const [entertext, setEntertext] = useState("");
  const [issearching, setsearching] = useState(false);

  const entersearch = (event) => {
    if (event.key === "Enter") {
      setEntertext(search);
      setsearching(true);
    }
  };

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
        search: `${entertext}`,
      };
      const options = CreateApiConfig(endpoint, params);

      try {
        const info = await axios.request(options);
        setcarddata(info.data.data.coins);
        setLoading(true);
        setsearching(false);
      } catch (error) {
        // console.error(error);
      }
    };
    datafetch();
  }, [entertext]);
  useEffect(() => {
    if (setsearching) {
      const timer = setTimeout(() => {
        setsearching(false); // Hide skeleton after 2 seconds
      }, 500000);

      return () => clearTimeout(timer);
    }
  }, [setsearching]);
  const filteredData = cardata.filter((curElem) =>
    curElem.name.toLowerCase().includes(entertext.toLowerCase())
  );
  return (
    <>
      {isloading ? (
        <div className="h-full p-5">
          <div className="box flex justify-center">
            <input
              type="text"
              className="text-white p-3 input"
              name="txt"
              placeholder="Crypto name.."
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              onKeyDown={entersearch}
            />
          </div>
          {issearching ? (
            <Skelton />
          ) : (
            <div className="flex justify-around flex-wrap">
              {filteredData.length > 0 ? (
                filteredData.map((curElem, index) => (
                  <Card key={index} curElem={curElem} />
                ))
              ) : (
                <div className="text-5xl justify-center flex flex-col  items-center  bg-gradient-to-r from-red-500 via-blue-800 to-violet-800 text-transparent bg-clip-text animate-gradient font-semibold m-auto h-screen text-center">
                  <div>No results found</div>
                  <div>
                    <img
                      src="/405b6509-f2d5-4b23-ac91-d0b047a3ee39.jpg-output.png"
                      className="w-96 h-72"
                      alt="No results image"
                    />
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      ) : (
        <Loading />
      )}
    </>
  );
}

export default Cryptocurrencies;
