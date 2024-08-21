import { MainPage } from './pages/main-page/main-page';
import { CountryPage } from './pages/country-page/country-page';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

export function App() {
    const router = createBrowserRouter([
        {
            path: '/',
            element: <MainPage />,
        },
        {
            path: '/country/:tag',
            element: <CountryPage />,
        },
    ]);

    return <RouterProvider router={router} />;
}
