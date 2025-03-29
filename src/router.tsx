import { lazy, Suspense } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate} from "react-router-dom";
import Loading from "./components/Loading";
import MainLayout from "./layouts/MainLayout";
import About from "./pages/About";


// Lazy load Home page
// const HomeLayout = lazy(() => import('./layouts/HomeLayout'));
const Home = lazy(() => import("./pages/Home"));
const CheckIn = lazy(() => import("./features/Home/tabs/CheckIn"));
const Quests = lazy(() => import("./features/Home/tabs/Quests"));
const Battle = lazy(() => import("./features/Home/tabs/Battle"));
const Subjects = lazy(() => import("./features/Home/tabs/Subjects"));
const SessionLogs = lazy(() => import("./features/Home/tabs/SessionLogs"));

const AppRouter = () => {
  return (
    <Router>
        <MainLayout>
            <Routes>
                {/* Home route wrapped in MainLayout */}
                <Route path="home" element={<Home />}>
                    <Route index element={<Navigate to="check-in" replace />} />
                    <Route path="check-in" element={<Suspense fallback={<Loading />}><CheckIn /></Suspense>} />
                    <Route path="quests" element={<Suspense fallback={<Loading />}><Quests /></Suspense>} />
                    <Route path="battle" element={<Suspense fallback={<Loading />}><Battle /></Suspense>} />
                    <Route path="subjects" element={<Suspense fallback={<Loading />}><Subjects /></Suspense>} />
                    <Route path="logs" element={<Suspense fallback={<Loading />}><SessionLogs /></Suspense>} />
                </Route>
                {/* About route */}
                <Route
                path="/about"
                element={
                    <Suspense fallback={<Loading />}>
                        <About />
                    </Suspense>
                }
                />
            </Routes>
        </MainLayout>
    </Router>
  );
};

export default AppRouter;
