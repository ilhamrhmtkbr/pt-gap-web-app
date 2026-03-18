import {createBrowserRouter, Navigate} from 'react-router'

import HomePage from "../pages/guest/HomePage.jsx";
import LoginPage from "../pages/auth/LoginPage.jsx";
import ProfilePage from "../pages/member/ProfilePage.jsx";
import NotFoundPage from "../pages/NotFoundPage.jsx";
import CartsPage from "../pages/member/CartsPage.jsx";
import TransactionsPage from "../pages/member/TransactionsPage.jsx";
import RegisterPage from "../pages/auth/RegisterPage.jsx";
import Guest from "../middleware/Guest.jsx";
import Member from "../middleware/Member.jsx";
import ProductDetailPage from "../pages/guest/ProductDetailPage.jsx";

const router = createBrowserRouter([
    {
        path: '/',
        element: <HomePage/>,
    },
    {
        path: '/products/:id',
        element: <ProductDetailPage/>
    },
    {
        path: '/products',
        element: <Navigate to={'/'}/>
    },
    {
        element: <Guest/>,
        children: [
            {
                path: '/login',
                element: <LoginPage/>
            },
            {
                path: '/register',
                element: <RegisterPage/>
            }
        ]
    },
    {
        element: <Member/>,
        children: [
            {
                path: '/profile',
                element: <ProfilePage/>
            },
            {
                path: '/carts',
                element: <CartsPage/>
            },
            {
                path: '/transactions',
                element: <TransactionsPage/>
            }
        ]
    },
    {
        path: '*',
        element: <NotFoundPage/>,
    },
], {
    basename: import.meta.env.VITE_APP_FRONTEND_PUBLIC_BASENAME
})

export default router
