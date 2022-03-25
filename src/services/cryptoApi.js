import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const cryptoApiHeaders = {
  "x-rapidapi-host": "coinranking1.p.rapidapi.com",
  "x-rapidapi-key": "b29679b1ccmshcb85d1dffa21a8cp189220jsnee346a6aad5c",
};

const baseUrl = "https://coinranking1.p.rapidapi.com/";

// Define a service using a base URL and expected endpoints
export const cryptoApi = createApi({
  reducerPath: "cryptoApi",
  baseQuery: fetchBaseQuery({ baseUrl: baseUrl }),
  endpoints: (builder) => ({
    getCryptos: builder.query({
      query: (count) => {
        return {
          url: "/coins",
          headers: cryptoApiHeaders,
          params: {
            limit: count,
          },
        };
      },
    }),
    GetCryptoDetails: builder.query({
      query: (coinId) => {
        return {
          url: `/coin/${coinId}`,
          headers: cryptoApiHeaders
        };
      },
    }),
  }),
});


export const { useGetCryptosQuery, useGetCryptoDetailsQuery } = cryptoApi;
