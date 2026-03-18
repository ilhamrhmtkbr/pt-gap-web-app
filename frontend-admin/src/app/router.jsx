import {createBrowserRouter, Navigate} from 'react-router'
import LoginPage from '@/pages/auth/LoginPage'
import NotFoundPage from '@/pages/NotFoundPage'
import Guest from '@/middleware/Guest'
import Member from '@/middleware/Member'

import SalesPage from '@/pages/sales/SalesPage'
import UsersPage from '@/pages/users/UsersPage'
import UsersEditPage from '@/pages/users/UsersEditPage'
import InventoriesPage from '@/pages/inventories/InventoriesPage'
import InventoriesAddPage from '@/pages/inventories/InventoriesAddPage'
import InventoriesEditPage from '@/pages/inventories/InventoriesEditPage'
import RequisitionsPage from '@/pages/purchases/RequisitionsPage'
import SuppliersPage from '@/pages/purchases/SuppliersPage'
import SupplierAddPage from '@/pages/purchases/SupplierAddPage'
import SupplierEditPage from '@/pages/purchases/SupplierEditPage'
import RequisitionAddPage from "@/pages/purchases/RequisitionAddPage.jsx";
import RequisitionEditPage from "@/pages/purchases/RequisitionEditPage.jsx";

const router = createBrowserRouter([
    {
        path: '/',
        element: <Navigate to={'/users'}/>
    },
    {
        element: <Guest/>,
        children: [
            {path: '/login', element: <LoginPage/>},
        ]
    },
    {
        element: <Member/>,
        children: [
            {path: '/sales', element: <SalesPage/>},
            {path: '/users', element: <UsersPage/>},
            {path: '/users/edit/:id', element: <UsersEditPage/>},
            {path: '/inventories', element: <InventoriesPage/>},
            {path: '/inventories/add', element: <InventoriesAddPage/>},
            {path: '/inventories/edit/:id', element: <InventoriesEditPage/>},
            {path: '/purchases/requisition', element: <RequisitionsPage/>},
            {path: '/purchases/requisition/add', element: <RequisitionAddPage/>},
            {path: '/purchases/requisition/edit/:id', element: <RequisitionEditPage/>},
            {path: '/purchases/suppliers', element: <SuppliersPage/>},
            {path: '/purchases/suppliers/add', element: <SupplierAddPage/>},
            {path: '/purchases/suppliers/edit/:id', element: <SupplierEditPage/>},
        ]
    },
    {path: '*', element: <NotFoundPage/>},
], {
    basename: import.meta.env.VITE_APP_FRONTEND_ADMIN_BASENAME
})

export default router
