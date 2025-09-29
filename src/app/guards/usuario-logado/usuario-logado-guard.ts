import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const usuarioLogadoGuard: CanActivateFn = (route, state) => {
    const router = inject(Router);
    const user = localStorage.getItem('user');
    if (user) {
        return true;
    } else {
        return router.createUrlTree(['/login']);
    }
};
