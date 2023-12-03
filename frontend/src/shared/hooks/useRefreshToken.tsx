// Store
import { useStore } from "../store";

// Services
import { server } from "../services/api";

const useRefreshToken = () => {
  const auth = useStore((state) => state.auth);
  const setAuth = useStore((state) => state.setAuth);

  type RefreshResponseType = {
    accessToken: string;
  };
  const refresh = async () => {
    try {
      const response = await server.get<RefreshResponseType>("/auth/refresh", {
        withCredentials: true,
      });

      setAuth(auth.user, response.data.accessToken);

      return response.data.accessToken;
    } catch (err) {
      // TODO: Log user out if refresh token expired
      console.log(err);
    }
  };

  return refresh;
};

export { useRefreshToken };
