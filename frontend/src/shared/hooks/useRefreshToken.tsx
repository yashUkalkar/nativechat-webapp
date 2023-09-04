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
    const response = await server.get<RefreshResponseType>(
      "/auth/refresh-token",
      {
        withCredentials: true,
      }
    );

    setAuth(auth.user, response.data.accessToken);

    return response.data.accessToken;
  };

  return refresh;
};

export { useRefreshToken };
