import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Participante } from 'src/app/models/participante';
import { environment } from 'src/environments/environment';

@Injectable({
    providedIn: 'root'
})
export class ParticipanteService {

    constructor(
        private http: HttpClient
    ) { }

    list(): Observable<Participante[]> {
        return this.http.get<Participante[]>(`${environment.urlBackEndApi}api/participante/`);
    }
}
