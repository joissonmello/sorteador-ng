import { registerLocaleData } from '@angular/common';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import ptBr from '@angular/common/locales/pt';
import { LOCALE_ID, NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { routes } from 'src/app/app.routes';
import { authInterceptor } from 'src/app/interceptors/auth-interceptor';
import { HomeComponent } from 'src/app/pages/home/home.component';

import { AppComponent } from './app.component';
import { RankingComponent } from './components/ranking/ranking.component';
import { ResultadoComponent } from './components/resultado/resultado.component';
import { SorteadosDaSemanaComponent } from './components/sorteados-da-semana/sorteados-da-semana.component';

registerLocaleData(ptBr);
@NgModule({
    declarations: [
        AppComponent,
        ResultadoComponent,
        SorteadosDaSemanaComponent,
        RankingComponent,
        HomeComponent
    ],
    bootstrap: [AppComponent],
    imports: [
        BrowserModule,
        RouterModule.forRoot(routes),
        BsDatepickerModule.forRoot(),
        BrowserAnimationsModule,
        ReactiveFormsModule
    ],
    providers: [
        { provide: LOCALE_ID, useValue: 'pt' },
        provideHttpClient(withInterceptors([authInterceptor])),
    ],
})
export class AppModule { }
