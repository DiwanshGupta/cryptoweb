// apiConfig.js

const BASE_URL = "https://coinranking1.p.rapidapi.com";

const createApiConfig = (endpoint, params) => {
  return {
    method: "GET",
    url: `${BASE_URL}${endpoint}`,
    params,
    headers: {
      "X-RapidAPI-Key": "25478950bdmsh482c61c1c9806cap1a45f3jsne136d0fc1174",
      "X-RapidAPI-Host": "coinranking1.p.rapidapi.com",
    },
  };
};

export default createApiConfig;
