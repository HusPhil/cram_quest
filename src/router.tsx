import { ComponentType, useEffect } from 'react';
import {
	createBrowserRouter,
	createRoutesFromElements,
	Navigate,
	Outlet,
	Route,
	RouterProvider,
	useNavigate,
} from 'react-router-dom';
import Loading from './components/Loading';
import TopProgressBar from './components/TopProgressBar';
import MainLayout from './layouts/MainLayout';
import SignOut from './pages/SignOut';
import { setGlobalNavigate } from './lib/navigate';
import {
	checkInLoader,
	rejectAuthLoader,
	requireAuthLoader,
	skinsLoader,
	subjectsLoader,
} from './loaders';

const lazyRoute =
	(importer: () => Promise<{ default: ComponentType }>) =>
	async () => {
		const mod = await importer();
		return { Component: mod.default };
	};

const RejectAuth = lazyRoute(() => import('./layouts/RejectAuth'));
const RequireAuth = lazyRoute(() => import('./layouts/RequireAuth'));
const Authentication = lazyRoute(() => import('./pages/Authentication'));
const Skins = lazyRoute(() => import('./pages/Skins'));
const About = lazyRoute(() => import('./pages/About'));
const Home = lazyRoute(() => import('./pages/Home'));
const CheckIn = lazyRoute(() => import('./features/CheckIn/CheckIn'));
const Subjects = lazyRoute(() => import('./features/Subjects/Subjects'));

const NavigationSetter = () => {
	const navigate = useNavigate();

	useEffect(() => {
		setGlobalNavigate(navigate);
	}, [navigate]);

	return null;
};

const RootLayout = () => (
	<>
		<TopProgressBar />
		<NavigationSetter />
		<Outlet />
	</>
);

const router = createBrowserRouter(
	createRoutesFromElements(
		<Route element={<RootLayout />} hydrateFallbackElement={<Loading />}>
			{/* Public auth route */}
			<Route path="/auth" loader={rejectAuthLoader} lazy={RejectAuth}>
				<Route index lazy={Authentication} />
			</Route>

			{/* All routes under MainLayout */}
			<Route element={<MainLayout />}>
				{/* Redirect root to home */}
				<Route path="/" element={<Navigate to="/home" replace />} />

				{/* Protected routes */}
				<Route loader={requireAuthLoader} lazy={RequireAuth}>
					<Route path="/home" lazy={Home}>
						<Route index element={<Navigate to="check-in" replace />} />
						<Route path="check-in" loader={checkInLoader} lazy={CheckIn} />
						<Route path="subjects" loader={subjectsLoader} lazy={Subjects} />
						<Route path="skins" loader={skinsLoader} lazy={Skins} />
						<Route path="about" lazy={About} />
						<Route path="signOut" element={<SignOut />} />
					</Route>
				</Route>

				{/* Catch-all redirect */}
				<Route
					path="*"
					element={<Navigate to="/home/check-in" replace />}
				/>
			</Route>
		</Route>
	)
);

const AppRouter = () => <RouterProvider router={router} />;

export default AppRouter;
