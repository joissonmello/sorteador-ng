import { Routes } from '@angular/router';
import { usuarioLogadoGuard } from 'src/app/guards/usuario-logado/usuario-logado-guard';
import { HomeComponent } from 'src/app/pages/home/home.component';

export const routes: Routes = [
    {
        path: 'login',
        loadComponent: () => import('./pages/login/login.component').then(m => m.LoginComponent)
    },
    {
        path: 'home',
        component: HomeComponent,
        canActivate: [usuarioLogadoGuard]
    },
    {
        path: '**',
        redirectTo: 'home'
    }
];
