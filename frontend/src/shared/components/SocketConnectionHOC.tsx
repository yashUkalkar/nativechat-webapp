// Packages
import { useEffect } from "react";

// Store
import { useStore } from "../store";

// Services
import { socketInstance } from "../services/socket";

const SocketConnectionHOC = ({ children }: { children: React.ReactNode }) => {
  const auth = useStore((state) => state.auth);

  const showError = useStore((state) => state.showError);

  useEffect(() => {
    if (auth.user && auth.accessToken && !socketInstance.connected) {
      socketInstance.auth = {
        token: auth.accessToken,
      };
      socketInstance.connect();

      socketInstance.on("connect", () =>
        console.log(`Connected with socket ID : ${socketInstance.id}`)
      );

      socketInstance.on("connect_error", () => {
        // TODO: Implement error handling to refresh access token and reconnect if token expiration is the issue of connect error
        showError(
          "Message server not responding! Try signing out and sign in again"
        );
      });
    }

    return () => {
      socketInstance.disconnect();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [auth]);

  return <>{children}</>;
};

export { SocketConnectionHOC };
