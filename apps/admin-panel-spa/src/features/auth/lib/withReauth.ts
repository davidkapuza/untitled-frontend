import { fetchBaseQuery } from "@reduxjs/toolkit/query";
import type {
  BaseQueryFn,
  FetchArgs,
  FetchBaseQueryError,
} from "@reduxjs/toolkit/query";
import { Mutex } from "async-mutex";
import { logout } from "../../../entities/User/model/userSlice";
import { setToken } from "../model/authSlice";

const BASE_URL = process.env.REACT_APP_SERVER_ENDPOINT;

const mutex = new Mutex();
const baseQuery = fetchBaseQuery({
  baseUrl: `${BASE_URL}/api/auth/`,
  credentials: "include",
});
export const baseQueryWithReauth: BaseQueryFn<
  string | FetchArgs,
  unknown,
  FetchBaseQueryError
> = async (args, api, extraOptions) => {
  await mutex.waitForUnlock();
  let result = await baseQuery(args, api, extraOptions);
  if (result.error && result.error.status === 401) {
    if (!mutex.isLocked()) {
      const release = await mutex.acquire();
      try {
        const { data } = await baseQuery("/refreshToken", api, extraOptions);
        if (data) {
          api.dispatch(setToken(data as string));
          result = await baseQuery(args, api, extraOptions);
        } else {
          api.dispatch(logout());
        }
      } finally {
        release();
      }
    } else {
      await mutex.waitForUnlock();
      result = await baseQuery(args, api, extraOptions);
    }
  }
  return result;
};
