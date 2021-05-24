import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Sorteio } from 'src/app/models/sorteio';
import { QueryOptions } from 'src/app/utils/query-options';
import { environment } from 'src/environments/environment';

@Injectable({
    providedIn: 'root'
})
export class SorteioService {

    constructor(
        private http: HttpClient
    ) { }

    sorteiosDaSemana(queryOptions: QueryOptions): Observable<Sorteio[]> {
        return this.http.get<Sorteio[]>(`${environment.urlBackEndApi}api/sorteio/sorteios-da-semana/${queryOptions.toQueryString()}`);
    }

    create(body: Sorteio): Observable<Sorteio> {
        return this.http.post<Sorteio>(`${environment.urlBackEndApi}api/sorteio/`, body);
    }
}
