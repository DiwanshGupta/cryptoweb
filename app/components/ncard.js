import React from "react";
import Link from "next/link";
import moment from "moment/moment";
function Ncard({ curElem }) {
  const { name, image, url, description, provider, datePublished } = curElem;
  const formattedDate = moment(datePublished).startOf("ss").fromNow();
  return (
    <>
      <div className="m-3">
        <div className="w-72 h-64 p-1 rounded-md opacity-80 hover:shadow-2xl hover:opacity-60 bg-white ">
          <Link target="_blank" href={url}>
            <div className="flex p-1  justify-between">
              <div className="h1 font-semibold w-40 ">
                {" "}
                {`${name.length > 30 ? name.substring(0, 60) + "..." : name}`}
              </div>
              <div className="">
                <img
                  src={image?.thumbnail?.contentUrl}
                  alt="image"
                  className="rounded-full  w-24"
                />{" "}
              </div>
            </div>
            <p className="para p-2  text-green-800">
              {`${
                description.length > 100
                  ? description.substring(0, 80) + "..."
                  : description
              }`}
            </p>
            <div className="flex m-1 justify-between">
              <div className="flex  justify-between">
                <div className=" mx-2">{provider[0].name}</div>
              </div>
              <div className="text-sm font-bold"> {formattedDate}</div>
            </div>
          </Link>
        </div>
      </div>
    </>
  );
}

export default Ncard;
