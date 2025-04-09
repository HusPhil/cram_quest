import { lazy, Suspense } from "react";
import { HashRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Loading from "./components/Loading";
import MainLayout from "./layouts/MainLayout";

// Pages
const LoginRegisterPage = lazy(() => import("./pages/LoginRegister"));
const About = lazy(() => import("./pages/About"));
const Home = lazy(() => import("./pages/Home"));

// Tabs (children of Home)
const CheckIn = lazy(() => import("./features/Home/tabs/CheckIn"));
const Quests = lazy(() => import("./features/Home/tabs/Quests"));
const Battle = lazy(() => import("./features/Home/tabs/Battle"));
const Subjects = lazy(() => import("./features/Home/tabs/Subjects"));
const SessionLogs = lazy(() => import("./features/Home/tabs/SessionLogs"));

const AppRouter = () => {
  return (
    <Router>
      <Suspense fallback={<Loading />}>
        <Routes>
          {/* Public auth route without layout */}
          <Route path="/auth" element={<LoginRegisterPage />} />

          {/* All routes under MainLayout */}
          <Route element={<MainLayout />}>
            {/* Redirect root to home */}
            <Route path="/" element={<Navigate to="/home" replace />} />

            {/* Home with nested tabs */}
            <Route path="/home" element={<Home />}>
              <Route index element={<Navigate to="check-in" replace />} />
              <Route path="check-in" element={<CheckIn />} />
              <Route path="quests" element={<Quests />} />
              <Route path="battle" element={<Battle />} />
              <Route path="subjects" element={<Subjects />} />
              <Route path="logs" element={<SessionLogs />} />
            </Route>

            {/* About page */}
            <Route path="/about" element={<About />} />

            {/* Catch-all redirect */}
            <Route path="*" element={<Navigate to="/home/check-in" replace />} />
          </Route>
        </Routes>
      </Suspense>
    </Router>
  );
};

export default AppRouter;
