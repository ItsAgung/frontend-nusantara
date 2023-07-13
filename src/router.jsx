import { createBrowserRouter } from 'react-router-dom';
import Login from './pages/Login';
import Profile from './pages/Profile';
import Register from './pages/Register';
import ProtectedLayout from './components/ProtectedLayout';
import GuestLayout from './components/GuestLayout';
//import view posts index
import PostIndex from './pages/posts/index.jsx';

//import view post create
import PostCreate from './pages/posts/create.jsx';

//import view post edit
import PostEdit from './pages/posts/edit';

const router = createBrowserRouter([
	{
		path: '/',
		element: <GuestLayout />,
		children: [
			{
				path: '/',
				element: <Login />,
			},
			{
				path: '/register',
				element: <Register />,
			},
		],
	},
	{
		path: '/',
		element: <ProtectedLayout />,
		children: [
			{
				path: '/posts',
				element:<PostIndex />,
			},
			{
				path: '/posts/create',
				element: <PostCreate />,
			},
			{
				path: '/posts/edit/:id',
				element: <PostEdit />,
			},
			{
				path: '/home',
				element: <Profile />,
			},
		],
	},
]);

export default router;