"use client";
import React, { useState } from "react";
import { useEffect } from "react";
import Ncard from "../components/ncard";
import Skelton from "../components/skeleton";
import Loading from "../loading";
import axios from "axios";
import Newsapi from "../crypto_api/newsapi";
function News() {
  const [objdata, setobjdata] = useState([]);
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
      const params = {
        q: `${entertext}`,
        freshness: "Day",
        textFormat: "Raw",
        safeSearch: "Off",
      };

      const options = Newsapi(params);

      try {
        const info = await axios.request(options);
        setobjdata(info.data.value);
        setLoading(true);
        setsearching(false);
        console.log(info.data.value);
      } catch (error) {
        console.error(error);
      }
    };
    datafetch();
  }, [entertext]);
  const filteredData = objdata.filter((curElem) =>
    curElem.name.toLowerCase().includes(entertext.toLowerCase())
  );
  useEffect(() => {
    if (setsearching) {
      const timer = setTimeout(() => {
        setsearching(false); // Hide skeleton after 2 seconds
      }, 500000);

      return () => clearTimeout(timer);
    }
  }, [setsearching]);

  return (
    <>
      {" "}
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
            <div className="flex justify-around  h-auto flex-wrap">
              {filteredData.length > 0 ? (
                filteredData.map((value, index) => (
                  <Ncard key={index} curElem={value} />
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

export default News;

// {
//   <div className="h-full flex justify-around flex-wrap">
//     {objdata.map((value, index) => (
//       <Ncard key={index} curElem={value} />
//     ))}{" "}
//   </div>;
// }
