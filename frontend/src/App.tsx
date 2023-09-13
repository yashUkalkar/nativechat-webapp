// Packages
import { Suspense } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

// Routes
import { AuthRoutes } from "./pages/auth/routes";
import { ChatRoutes } from "./pages/chat/routes";

// Components
import { Background } from "./shared/components/Background";
import { Loader } from "./shared/components/Loader/Loader";
import { Custom404Page } from "./shared/components/Custom404Page";
import { ErrorComponent } from "./shared/components/ErrorComponent";

import { SocketConnectionHOC } from "./shared/components/SocketConnectionHOC";

// Utils
import { ProtectedRoutes } from "./shared/utils/ProtectedRoutes";

const App = () => {
  return (
    <BrowserRouter>
      <Suspense fallback={<Loader />}>
        <Background />

        <ErrorComponent />

        <SocketConnectionHOC>
          <Routes>
            <Route path="/" element={<Navigate to="/auth/signin" />} />

            <Route path="/auth/*" element={<AuthRoutes />} />

            <Route element={<ProtectedRoutes />}>
              <Route path="/chat/*" element={<ChatRoutes />} />
            </Route>

            {/* 404 page for not specified routes */}
            <Route path="*" element={<Custom404Page />} />
          </Routes>
        </SocketConnectionHOC>
      </Suspense>
    </BrowserRouter>
  );
};

export { App };
