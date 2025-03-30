import { lazy, Suspense } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
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
    <Router basename="/cramquest">
      <MainLayout>
        <Routes>
          {/* 🔥 FIXED: Redirect at the root level */}
          <Route path="/" element={<Navigate to="/home/check-in" replace />} />

          {/* 🔥 FIXED: Home is now a parent with an <Outlet /> inside */}
          <Route path="home" element={<Home />}>
            <Route path="check-in" element={<Suspense fallback={<Loading />}><CheckIn /></Suspense>} />
            <Route path="quests" element={<Suspense fallback={<Loading />}><Quests /></Suspense>} />
            <Route path="battle" element={<Suspense fallback={<Loading />}><Battle /></Suspense>} />
            <Route path="subjects" element={<Suspense fallback={<Loading />}><Subjects /></Suspense>} />
            <Route path="logs" element={<Suspense fallback={<Loading />}><SessionLogs /></Suspense>} />
          </Route>

          {/* About Route */}
          <Route
            path="about"
            element={
              <Suspense fallback={<Loading />}>
                <About />
              </Suspense>
            }
          />

          {/* 🔥 FIXED: Catch-all route for 404 */}
          <Route path="*" element={<Navigate to="/home/check-in" replace />} />
        </Routes>
      </MainLayout>
    </Router>
  );
};

export default AppRouter;
