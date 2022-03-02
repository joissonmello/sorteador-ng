import { registerLocaleData } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import ptBr from '@angular/common/locales/pt';
import { LOCALE_ID, NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';

import { AppComponent } from './app.component';
import { ResultadoComponent } from './components/resultado/resultado.component';
import { SorteadosDaSemanaComponent } from './components/sorteados-da-semana/sorteados-da-semana.component';
import { RankingComponent } from './components/ranking/ranking.component';

registerLocaleData(ptBr);
@NgModule({
    declarations: [
        AppComponent,
        ResultadoComponent,
        SorteadosDaSemanaComponent,
        RankingComponent,
    ],
    imports: [
        BrowserModule,
        HttpClientModule,
        BsDatepickerModule.forRoot(),
        BrowserAnimationsModule,
        ReactiveFormsModule
    ],
    providers: [
        { provide: LOCALE_ID, useValue: 'pt' },
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }
