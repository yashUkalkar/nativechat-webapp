// Packages
import { Routes, Route } from "react-router-dom";

// Components
import { ChatPage } from "./components/ChatPage";

const ChatRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<ChatPage />} />
    </Routes>
  );
};

export { ChatRoutes };
