import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { setUser } from "../../../entities/User/model/userSlice";
import { GenericResponse, LoginResponse } from "../../../tmptypes";
import {
  LoginFormSchemaType,
  RegistrationFormSchemaType,
} from "../lib/validations";

const BASE_URL = process.env.REACT_APP_SERVER_ENDPOINT;

export const authApi = createApi({
  reducerPath: "authApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${BASE_URL}/api/users/`,
  }),
  endpoints: (builder) => ({
    registerUser: builder.mutation<
      GenericResponse,
      Omit<RegistrationFormSchemaType, "confirmPassword">
    >({
      query(data) {
        return {
          url: "registration",
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: data,
        };
      },
    }),
    loginUser: builder.mutation<LoginResponse, LoginFormSchemaType>({
      query(data) {
        return {
          url: "login",
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: data,
        };
      },
      async onQueryStarted(args, { dispatch, queryFulfilled }) {
        try {
          const {
            data: { accessToken, user },
          } = await queryFulfilled;

          dispatch(setUser({ accessToken, ...user }));
        } catch (error) {}
      },
    }),
    activateAccount: builder.mutation<
      GenericResponse,
      { email: string; hex: string }
    >({
      query({ email, hex }) {
        const url = new URL("");
        url.searchParams.set("email", email);
        url.searchParams.set("hex", hex);

        return {
          url: `activate?${url.search}`,
          method: "GET",
        };
      },
    }),
    logoutUser: builder.mutation<void, void>({
      query() {
        return {
          url: "logout",
        };
      },
    }),
  }),
});

export const {
  useLoginUserMutation,
  useRegisterUserMutation,
  useLogoutUserMutation,
  useActivateAccountMutation,
} = authApi;
