// Packages
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

// Store
import { useStore } from "../../../shared/store";

// Socket
import { socketInstance } from "../../../shared/services/socket";

const ChatPage = () => {
  const showError = useStore((state) => state.showError);
  const removeError = useStore((state) => state.removeError);

  const auth = useStore((state) => state.auth);
  const clearAuth = useStore((state) => state.clearAuth);

  const navigate = useNavigate();

  //* Connect to websocket server
  useEffect(() => {
    socketInstance.auth = {
      token: auth.accessToken,
    };
    socketInstance.connect();

    socketInstance.on("connect", () => console.log("Connected to socket!"));
    socketInstance.on("connect_error", () => {
      removeError();
      showError("Unable to connect to server!");

      setTimeout(() => {
        removeError();
        clearAuth();
        navigate("/");
      }, 5000);
    });

    return () => {
      socketInstance.disconnect();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return <a href="/auth/signin">Go to signin</a>;
};

export { ChatPage };
