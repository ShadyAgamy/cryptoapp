import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const newsApiHeaders = {
  "x-bingapis-sdk": "true",
  "x-rapidapi-host": "bing-news-search1.p.rapidapi.com",
  "x-rapidapi-key": "b29679b1ccmshcb85d1dffa21a8cp189220jsnee346a6aad5c",
};

const baseUrl = "https://bing-news-search1.p.rapidapi.com";

// Define a service using a base URL and expected endpoints
export const cryptoNewsApi = createApi({
  reducerPath: "cryptoNewsApi",
  baseQuery: fetchBaseQuery({ baseUrl }),
  endpoints: (builder) => ({
    getNews: builder.query({
      query: ( {count, newsCategory} ) => {
        return {
          url: `/news/search`,
          headers: newsApiHeaders,
          params: {
            q: newsCategory,
            freshness: "Day",
            textFormat: "Raw",
            safeSearch: "Off",
            count: count
          },
        };
      },
    }),
  }),
});

export const { useGetNewsQuery } = cryptoNewsApi;
