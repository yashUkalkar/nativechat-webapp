// Packages
import { useEffect } from "react";

// Store
import { useStore } from "../store";

// Services
import { socketInstance } from "../services/socket";

const SocketConnectionHOC = ({ children }: { children: React.ReactNode }) => {
  const auth = useStore((state) => state.auth);

  const showError = useStore((state) => state.showError);
  const removeError = useStore((state) => state.removeError);

  useEffect(() => {
    if (auth.user && auth.accessToken && !socketInstance.connected) {
      socketInstance.auth = {
        token: auth.accessToken,
      };
      socketInstance.connect();

      socketInstance.on("connect", () => {
        console.log(`Connected with socket ID : ${socketInstance.id}`);
        removeError();
      });

      socketInstance.on("connect_error", () => {
        showError(
          "Unable to connect to messaging server. Trying to reconnect!"
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
