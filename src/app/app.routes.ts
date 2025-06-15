import { Route, Router } from '@angular/router';
import { initialDataResolver } from 'app/app.resolvers';
import { LayoutComponent } from 'app/layout/layout.component';
import { AuthGuard } from './core/auth/guards/auth.guard';
import { NoAuthGuard } from './core/auth/guards/noAuth.guard';
import { inject } from '@angular/core';

// @formatter:on
/* eslint-disable max-len */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
export const appRoutes: Route[] = [




    // Auth routes for guests
    {
        path: 'login',
        canActivate: [NoAuthGuard],
        // canActivateChild: [NoAuthGuard],
        component: LayoutComponent,
        data: {
            layout: 'empty'
        },
        children: [
            {path: 'confirmation-required', loadChildren: () => import('app/modules/auth/confirmation-required/confirmation-required.routes')},
            {path: 'forgot-password', loadChildren: () => import('app/modules/auth/forgot-password/forgot-password.routes')},
            {path: 'reset-password', loadChildren: () => import('app/modules/auth/reset-password/reset-password.routes')},
            {path: 'sign-in', loadChildren: () => import('app/modules/auth/sign-in/sign-in.routes')},
            {path: 'sign-up', loadChildren: () => import('app/modules/auth/sign-up/sign-up.routes')},
            {path: '**', redirectTo: 'sign-in'},
        ]
    },
    {path: '', pathMatch:'full', redirectTo: 'login'},
    // {path: '', pathMatch : 'full', redirectTo: 'sign-in'},
    // Auth routes for authenticated users
    // {
    //     path: '',
    //     canActivate: [AuthGuard],
    //     canActivateChild: [AuthGuard],
    //     component: LayoutComponent,
    //     data: {
    //         layout: 'empty'
    //     },
    //     children: [
    //         {path: 'sign-out', loadChildren: () => import('app/modules/auth/sign-out/sign-out.routes')},
    //         {path: 'unlock-session', loadChildren: () => import('app/modules/auth/unlock-session/unlock-session.routes')}
    //     ]
    // },

    // Landing routes
    // {
    //     path: '',
    //     component: LayoutComponent,
    //     data: {
    //         layout: 'empty'
    //     },
    //     children: [
    //         {path: 'home', loadChildren: () => import('app/modules/landing/home/home.routes')},
    //     ]
    // },


    {path: 'app',
        canActivate: [AuthGuard],
        component: LayoutComponent,
        resolve: {
            initialData: initialDataResolver
        },

        children: [
            {path: '', loadChildren: () => import('app/modules/admin/inicio/inicio.routes')},
            {path: 'usuario', loadChildren: () => import('app/modules/admin/usuario/usuario.routes')},
        ]

    },


    // Admin routes
    {
        path: '',
        component: LayoutComponent,
        resolve: {
            initialData: initialDataResolver
        },

        children: [
            {path: 'usuarios', loadChildren: () => import('app/modules/admin/usuarios/usuarios.routes')},
            {path: 'agendas', loadChildren: () => import('app/modules/admin/agendas/agendas.routes')},
            {path: 'entidades', loadChildren: () => import('app/modules/admin/entidades/entidades.routes')},
            {path: 'citas', loadChildren: () => import('app/modules/admin/citas/citas.routes')},

        ]
    },




    // {path: '', redirectTo: 'sign-in'},
    {path: '**', pathMatch : 'full', redirectTo: 'login'},
];
