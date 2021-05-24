import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Sorteio } from 'src/app/models/sorteio';
import { environment } from 'src/environments/environment';

@Injectable({
    providedIn: 'root'
})
export class SlackService {

    constructor(
        private http: HttpClient
    ) { }

    notificaResultado(sorteio: Sorteio): Observable<any> {
        return this.http.post<any>(`${environment.urlBackEndApi}notificacao/`, sorteio);
    }
}
