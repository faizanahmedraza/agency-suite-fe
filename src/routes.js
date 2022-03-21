import React, { Suspense, Fragment, lazy } from 'react';
import { Switch, Redirect, Route } from 'react-router-dom';

import RegisterLayout from 'src/layouts/Register Layout'
import MainLayout from 'src/layouts/Main Layout'
import DashboardLayout from 'src/layouts/Dashboard Layout'

import LoadingScreen from 'src/components/Loaders/loading';
// import AuthGuard from './components/Guards/AuthGuard';
// import GuestGuard from './components/Guards/GuestGuard';



export const renderRoutes = (routes = []) => (
    <Suspense fallback={<LoadingScreen />}>
        <Switch>
            {routes.map((route, i) => {
                const Guard = route.guard || Fragment;
                const Layout = route.layout || Fragment;
                const Component = route.component;

                return (
                    <Route
                        key={i}
                        path={route.path}
                        exact={route.exact}
                        render={props => (
                            <Guard>
                                <Layout>
                                    {route.routes ? (
                                        renderRoutes(route.routes)
                                    ) : (
                                        <Component {...props} />
                                    )}
                                </Layout>
                            </Guard>
                        )}
                    />
                );
            })}
        </Switch>
    </Suspense>
);

const routes = [
    {
        exact: true,
        path: '/404',
        component: lazy(() => import('src/views/errors/NotFoundView'))
    },
    {
        exact: true,
        // guard: GuestGuard,
        path: '/login',
        component: lazy(() => import('src/views/Login/login'))
    },
    {
        exact: true,
        // guard: GuestGuard,
        layout: RegisterLayout,
        path: '/register',
        component: lazy(() => import('src/views/Register/register'))
    },
    {
        exact: true,
        // guard: GuestGuard,
        layout: MainLayout,
        path: '/',
        component: lazy(() => import('src/views/Home/home'))
    },
    // Dashboard
    {
        exact: true,
        // guard: GuestGuard,
        layout: DashboardLayout,
        path: '/dashboard',
        component: lazy(() => import('src/views/Dashboard/dashboard'))
    },
    // Dashboard Services
    {
        exact: true,
        // guard: GuestGuard,
        layout: DashboardLayout,
        path: '/dashboard/services',
        component: lazy(() => import('src/views/Dashboard/Services/services'))
    },
    {
        exact: true,
        // guard: GuestGuard,
        layout: DashboardLayout,
        path: '/dashboard/services/create',
        component: lazy(() => import('src/views/Dashboard/Services/Create Service/createService'))
    },
    // {
    //     exact: true,
    //     guard: AuthGuard,
    //     path: '/',
    //     component: lazy(() => import('src/views/Home/home'))
    // },


    {
        path: '*',
        // layout: AdminLayout,
        routes: [

            {
                component: () => <Redirect to="/404" />
            }
        ]
    }






];
export default routes;
