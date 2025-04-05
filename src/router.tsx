import { lazy, Suspense } from "react";
import { HashRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Loading from "./components/Loading";
import MainLayout from "./layouts/MainLayout";
import About from "./pages/About";
import Home from "./pages/Home"; // Keep Home outside of Suspense

const CheckIn = lazy(() => import("./features/Home/tabs/CheckIn.tsx"));
const Quests = lazy(() => import("./features/Home/tabs/Quests"));
const Battle = lazy(() => import("./features/Home/tabs/Battle"));
const Subjects = lazy(() => import("./features/Home/tabs/Subjects"));
const SessionLogs = lazy(() => import("./features/Home/tabs/SessionLogs"));

const AppRouter = () => {
  return (
    <Router>
      <MainLayout>
        <Routes>
          {/* Redirect root to home */}
          <Route path="/" element={<Navigate to="/home" replace />} />

          {/* Home page as a parent route */}
          <Route path="home" element={<Home />}>
            <Route index element={<Navigate to="check-in" replace />} />
            <Route path="subjects" element={<Suspense fallback={<Loading />}><Subjects /></Suspense>} />
            <Route path="quests" element={<Suspense fallback={<Loading />}><Quests /></Suspense>} />
            <Route path="battle" element={<Suspense fallback={<Loading />}><Battle /></Suspense>} />
            <Route path="check-in" element={<Suspense fallback={<Loading />}><CheckIn /></Suspense>} />
            <Route path="logs" element={<Suspense fallback={<Loading />}><SessionLogs /></Suspense>} />
          </Route>

          {/* About page */}
          <Route
            path="about"
            element={
              <Suspense fallback={<Loading />}>
                <About />
              </Suspense>
            }
          />

          {/* Catch-all route for 404 */}
          <Route path="*" element={<Navigate to="/home/check-in" replace />} />
        </Routes>
      </MainLayout>
    </Router>
  );
};

export default AppRouter;
