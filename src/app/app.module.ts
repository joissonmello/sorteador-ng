import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';

import { AppComponent } from './app.component';
import { ResultadoComponent } from './components/resultado/resultado.component';

@NgModule({
    declarations: [
        AppComponent,
        ResultadoComponent,
    ],
    imports: [
        BrowserModule,
        HttpClientModule,
        BsDatepickerModule.forRoot(),
        BrowserAnimationsModule,
        ReactiveFormsModule
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule { }
