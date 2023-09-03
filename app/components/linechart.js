import React, { useEffect, useState } from "react";
import CreateApiConfig from "../crypto_api/apicrypto";
import axios from "axios";
import Chart from "chart.js/auto";
import { Line } from "react-chartjs-2";
function Linechart({ id, time }) {
  const [charts, setCharts] = useState([]);

  const coinprice = [];
  const coinTime = [];

  useEffect(() => {
    const datafetch = async () => {
      const endpoint = `/coin/${id}/history`;
      const params = {
        referenceCurrencyUuid: "yhjMzLPhuIDl",
        timePeriod: `${time}`,
      };
      const options = CreateApiConfig(endpoint, params);

      try {
        const info = await axios.request(options);
        setCharts(info.data.data.history);

        // console.log(info.data.data.history);
      } catch (error) {
        console.error(error);
      }
    };
    datafetch();
  }, [id, time]);

  for (let i = charts.length - 1; i >= 0; i--) {
    coinprice.push(charts[i].price);
    const timestamp = new Date(charts[i].timestamp * 1000);
    const formattedDate = `${timestamp.toLocaleString("default", {
      month: "short",
    })} ${timestamp.getDate()}, ${timestamp.getFullYear()}`; // Format as "Month Day, Year"
    coinTime.push(formattedDate);
  }
  // console.log(coinTime, "hello", coinprice);
  const data = {
    labels: coinTime,
    datasets: [
      {
        label: "price in usd",
        data: coinprice,
        fill: false,
        backgroundcolor: "#36A2EB",
        bordercolor: "36A2EB",
      },
    ],
  };
  const options = {
    scales: {
      y: [
        {
          beginAtZero: true, // Starts the scale at zero
          // Maximum value on the y-axis
        },
      ],
    },
  };

  return (
    <div className="text-white">
      <Line data={data} options={options} /> {/* Use the Line component */}{" "}
    </div>
  );
}

export default Linechart;
