import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { EMPTY, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
    const router = inject(Router);

    // Recuperar token
    const token = getTokenFromStorage();

    // Preparar requisição com ou sem token
    const authReq = token
        ? req.clone({
            setHeaders: {
                Authorization: `Bearer ${token}`
            }
        })
        : req;

    return next(authReq).pipe(
        catchError((erro: HttpErrorResponse) => {
            // Tratar diferentes tipos de erro de autenticação
            if (erro.status === 401) {
                tratarErroAutenticacao();
                return EMPTY; // Para o fluxo silenciosamente
            }
            // Para outros erros, re-lançar
            return throwError(() => erro);
        })
    );

    function tratarErroAutenticacao(): void {
        // Limpar dados do usuário
        limparDadosUsuario();

        // Verificar se já não está na página de login para evitar loop
        if (router.url !== '/login') {
            router.navigate(['/login'], {
                queryParams: { returnUrl: router.url } // Salvar URL para retornar após login
            });
        }
    }
};

function getTokenFromStorage(): string | null {
    try {
        const userData = localStorage.getItem('user');
        if (!userData) return null;

        const userObject = JSON.parse(userData);
        return userObject?.access || null;
    } catch {
        return null;
    }
}

function limparDadosUsuario(): void {
    try {
        localStorage.removeItem('user');
    } catch (erro) {
        console.error('Erro ao limpar dados do usuário:', erro);
    }
}
