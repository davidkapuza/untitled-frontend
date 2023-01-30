// Or from '@reduxjs/toolkit/query' if not using the auto-generated hooks
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
      // Provides a list of `Posts` by `id`.
      // If any mutation is executed that `invalidate`s any of these tags, this query will re-run to be always up-to-date.
      // The `LIST` id is a "virtual id" we just made up to be able to invalidate this query specifically if a new `Posts` element was added.
      providesTags: (result) =>
        // is result available?
        result
          ? // successful query
            [
              ...result.map(({ id }) => ({ type: "Offers", id } as const)),
              { type: "Offers", id: "LIST" },
            ]
          : // an error occurred, but we still want to refetch this query when `{ type: 'Posts', id: 'LIST' }` is invalidated
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
      // Invalidates all Post-type queries providing the `LIST` id - after all, depending of the sort order,
      // that newly created post could show up in any lists.
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
      // Invalidates all queries that subscribe to this Post `id` only.
      // In this case, `getPost` will be re-run. `getPosts` *might*  rerun, if this id was under its results.
      invalidatesTags: (result, error, { id }) => [{ type: "Offers", id }],
    }),
    deleteOffer: build.mutation<{ success: boolean; id: number }, number>({
      query(id) {
        return {
          url: `post/${id}`,
          method: "DELETE",
        };
      },
      // Invalidates all queries that subscribe to this Post `id` only.
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
