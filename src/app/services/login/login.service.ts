import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

import { Token } from '../../models/token/token';

@Injectable({
    providedIn: 'root'
})
export class LoginService {
    constructor(private http: HttpClient) { }
    loginUsuario = '';

    login(username: string, password: string) {
        return this.http.post<Token>(`${environment.urlBackEndApi}api/token/`, {
            username: username,
            password: password
        });
    }

    guardarSessao(auth: Token): void {
        window.localStorage.setItem('user', JSON.stringify(auth));
    }

    removerSessao(): void {
        window.localStorage.removeItem('user');
    }
}
