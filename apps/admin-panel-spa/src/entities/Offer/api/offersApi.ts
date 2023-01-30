import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

type Offer = {
  id: string;
  email: string;
  username: string;
  budget: number;
  company: string;
  phone: string;
  productDescription: string;
  productName: string;
};

type OffersResponse = Offer[];

const BASE_URL = process.env.REACT_APP_SERVER_ENDPOINT;

export const offersApi = createApi({
  reducerPath: "offersApi",
  baseQuery: fetchBaseQuery({ baseUrl: `${BASE_URL}/api/users/` }),
  tagTypes: ["Offers"],
  endpoints: (build) => ({
    getOffers: build.query<OffersResponse, void>({
      query: () => "offers",
      providesTags: (result) =>
        result
          ? 
            [
              ...result.map(({ id }) => ({ type: "Offers", id } as const)),
              { type: "Offers", id: "LIST" },
            ]
          : 
            [{ type: "Offers", id: "LIST" }],
    }),
    addOffer: build.mutation<Offer, Partial<Offer>>({
      query(body) {
        return {
          url: `offers/send`,
          method: "POST",
          body,
        };
      },
      invalidatesTags: [{ type: "Offers", id: "LIST" }],
    }),
    getOfferById: build.query<Offer, number>({
      query: (id) => `post/${id}`,
      providesTags: (result, error, id) => [{ type: "Offers", id }],
    }),
    updateOffer: build.mutation<Offer, Partial<Offer>>({
      query(data) {
        const { id, ...body } = data;
        return {
          url: `post/${id}`,
          method: "PUT",
          body,
        };
      },
      invalidatesTags: (result, error, { id }) => [{ type: "Offers", id }],
    }),
    deleteOffer: build.mutation<{ success: boolean; id: number }, number>({
      query(id) {
        return {
          url: `post/${id}`,
          method: "DELETE",
        };
      },
      invalidatesTags: (result, error, id) => [{ type: "Offers", id }],
    }),
  }),
});

export const {
  useGetOffersQuery,
  useAddOfferMutation,
  useGetOfferByIdQuery,
  useUpdateOfferMutation,
  useDeleteOfferMutation,
} = offersApi;
