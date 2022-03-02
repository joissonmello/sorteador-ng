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

    create(body: Sorteio): Observable<Sorteio> {
        return this.http.post<Sorteio>(`${environment.urlBackEndApi}api/sorteio/`, body);
    }

    sorteiosDaSemana(queryOptions: QueryOptions): Observable<Sorteio[]> {
        return this.http.get<Sorteio[]>(`${environment.urlBackEndApi}api/sorteio/sorteios-da-semana/${queryOptions.toQueryString()}`);
    }

    ranking(queryOptions: QueryOptions): Observable<any[]> {
        return this.http.get<any[]>(`${environment.urlBackEndApi}api/sorteio/ranking/${queryOptions.toQueryString()}`);
    }
}
