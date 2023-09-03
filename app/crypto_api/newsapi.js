import axios from "axios";

const URL = "https://bing-news-search1.p.rapidapi.com/news/search";

const Newsapi = (params) => {
  return {
    method: "GET",
    url: `${URL}`,
    params,
    headers: {
      "X-BingApis-SDK": "true",
      "X-RapidAPI-Key": "25478950bdmsh482c61c1c9806cap1a45f3jsne136d0fc1174",
      "X-RapidAPI-Host": "bing-news-search1.p.rapidapi.com",
    },
  };
};

export default Newsapi;
