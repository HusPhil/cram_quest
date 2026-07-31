import { lazy, Suspense, useEffect } from 'react';
import {
	BrowserRouter,
	Routes,
	Route,
	Navigate,
	useNavigate,
} from 'react-router-dom';
import Loading from './components/Loading';
import MainLayout from './layouts/MainLayout';
import SignOut from './pages/SignOut';
import HomeSkeleton from './components/Skeletons/HomeSkeleton';
import { setGlobalNavigate } from './lib/navigate';

//Route Protector
const RejectAuth = lazy(() => import('./layouts/RejectAuth'));
const RequireAuth = lazy(() => import('./layouts/RequireAuth'));

// Pages
const Authentication = lazy(() => import('./pages/Authentication'));
const Skins = lazy(() => import('./pages/Skins'));
const About = lazy(() => import('./pages/About'));
const Home = lazy(() => import('./pages/Home'));

// Tabs (children of Home)
const CheckIn = lazy(() => import('./features/CheckIn/CheckIn'));
const Subjects = lazy(() => import('./features/Subjects/Subjects'));

const NavigationSetter = () => {
	const navigate = useNavigate();

	useEffect(() => {
		setGlobalNavigate(navigate);
	}, [navigate]);

	return null;
};

const AppRouter = () => {
	return (
		<BrowserRouter>
			<NavigationSetter />
			<Suspense fallback={<Loading />}>
				<Routes>
					{/* Public auth route without layout */}
					<Route element={<RejectAuth />}>
						<Route path="/auth" element={<Authentication />} />
					</Route>

					{/* All routes under MainLayout */}
					<Route element={<MainLayout />}>
						{/* Redirect root to home */}
						<Route
							path="/"
							element={<Navigate to="/home" replace />}
						/>

						{/* Home with nested tabs */}
						<Route element={<RequireAuth />}>
							<Route
								path="/home"
								element={
									<Suspense fallback={<HomeSkeleton />}>
										<Home />
									</Suspense>
								}
							>
								<Route
									index
									element={<Navigate to="check-in" replace />}
								/>
								<Route path="check-in" element={<CheckIn />} />
								<Route path="subjects" element={<Subjects />} />
								<Route path="skins" element={<Skins />} />
								<Route path="about" element={<About />} />
								<Route path="signOut" element={<SignOut />} />
							</Route>
						</Route>

						{/* Catch-all redirect */}
						<Route
							path="*"
							element={<Navigate to="/home/check-in" replace />}
						/>
					</Route>
				</Routes>
			</Suspense>
		</BrowserRouter>
	);
};

export default AppRouter;
