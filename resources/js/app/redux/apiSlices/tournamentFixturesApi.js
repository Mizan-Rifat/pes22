import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import axios from 'axios';

const axiosBaseQuery =
  ({ baseUrl } = { baseUrl: '' }) =>
  async ({ url, method, data, params }) => {
    try {
      const result = await axios({ url: baseUrl + url, method, data, params });
      return { data: result.data };
    } catch (axiosError) {
      // return axiosError;
      console.log({ axiosError });
      let err = axiosError;
      return {
        error: {
          status: err.response?.status,
          data: err.response?.data || err.message
        }
      };
    }
  };

export const tournamentFixturesApi = createApi({
  baseQuery: axiosBaseQuery({ baseUrl: `${process.env.MIX_DOMAIN}/api/` }),
  reducerPath: 'tournamentFixtures',
  endpoints: build => ({
    getFixtures: build.query({
      query: tournamentId => ({
        url: `tournaments/${tournamentId}/fixtures`,
        method: 'get'
      }),
      transformResponse: response => response.data
      // keepUnusedDataFor: 0
    })
  })
});

export const { useGetFixturesQuery } = tournamentFixturesApi;
