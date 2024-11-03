import { createBrowserRouter } from 'react-router-dom';
import App from '../App.jsx'
import ErrorPage from '../pages/ErrorPage';
import HomePage from '../pages/Home/index.jsx';
import DetailMovie from '../pages/Detail';
import WatchMovie from '../pages/WatchMovie';
import NewMovie from '../pages/NewMovie';

export const router = createBrowserRouter([
    {
        path: '/',
        element: <App />,
        //errorElement: <ErrorPage />,
        children: [
            {
                path:'/',
                element: <HomePage/>
            },
            {
                path: '/detail-movie/:slug',
                element: <DetailMovie/>
            },
            {
                path: '/watch-movie/:slug',
                element: <WatchMovie/>
            },
            {
                path: '/new-movie',
                element: <NewMovie/>
            }
        ]
    }
]);