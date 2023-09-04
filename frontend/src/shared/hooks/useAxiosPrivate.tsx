// Packages
import { useEffect } from "react";

// Store
import { useStore } from "../store";

// Hooks
import { useRefreshToken } from "./useRefreshToken";

// Services
import { serverPrivate } from "../services/api";

// Types
import { AxiosError, InternalAxiosRequestConfig } from "axios";

const useAxiosPrivate = () => {
  const auth = useStore((state) => state.auth);

  const refresh = useRefreshToken();

  useEffect(() => {
    const requestIntercept = serverPrivate.interceptors.request.use(
      (config) => {
        if (!config.headers["Authorization"]) {
          config.headers["Authorization"] = `Bearer ${auth.accessToken}`;
        }
        return config;
      },
      (err) => Promise.reject(err)
    );
    const responseIntercept = serverPrivate.interceptors.response.use(
      (response) => response,
      async (err: AxiosError) => {
        interface CustomRequestConfig extends InternalAxiosRequestConfig {
          sent?: boolean;
        }
        const prevRequest: CustomRequestConfig | undefined = err?.config;

        if (err?.response?.status == 403 && prevRequest && !prevRequest?.sent) {
          prevRequest.sent = true;
          const newAccessToken = await refresh();
          prevRequest.headers["Authorization"] = `Bearer ${newAccessToken}`;
          return serverPrivate(prevRequest);
        }

        return Promise.reject(err);
      }
    );

    return () => {
      serverPrivate.interceptors.request.eject(requestIntercept);
      serverPrivate.interceptors.response.eject(responseIntercept);
    };
  }, [auth, refresh]);

  return serverPrivate;
};

export { useAxiosPrivate };
