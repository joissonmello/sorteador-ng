import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { AbstractControl, UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import * as _ from 'lodash';
import { defineLocale, ptBrLocale } from 'ngx-bootstrap/chronos';
import { BsLocaleService } from 'ngx-bootstrap/datepicker';
import { Participante } from 'src/app/models/participante';
import { Sorteio } from 'src/app/models/sorteio';
import { ParticipanteService } from 'src/app/services/participante/participante.service';
import { SorteioService } from 'src/app/services/sorteio/sorteio.service';
import { QueryOptions } from 'src/app/utils/query-options';
import { environment } from 'src/environments/environment';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
    standalone: false
})
export class AppComponent implements OnInit {
    participantes!: Participante[];
    form!: UntypedFormGroup;
    sorteando = false;
    mostraBotao = true;
    mostraSorteados = false;
    mostraRanking = false;

    facilitador!: Participante | undefined;
    secretario!: Participante | undefined;
    sorteiosDaSemana: Sorteio[] = [];
    titulo = environment.titulo;

    constructor(
        private participanteService: ParticipanteService,
        private sorteioService: SorteioService,
        private localeService: BsLocaleService,
        private formBuilder: UntypedFormBuilder,
        private changeDetectorRef: ChangeDetectorRef,
    ) {
        ptBrLocale.invalidDate = 'Data inválida';
        defineLocale('customlocale', ptBrLocale);
        this.localeService.use('customlocale');
    }

    ngOnInit(): void {
        this.getParticipantes();
        this.form = this.formBuilder.group({
            data: [null, [Validators.required]]
        });

        this.subscribeData();
    }

    get controls(): { [key: string]: AbstractControl } {
        return this.form.controls;
    }

    subscribeData(): void {
        this.controls.data.valueChanges
            .subscribe(value => {
                this.recuperaSorteiosDaSemana(value);
            });
    }

    recuperaSorteiosDaSemana(data: Date): void {
        let dataInicio = new Date(data.getTime());
        dataInicio = new Date(dataInicio.setDate(dataInicio.getDate() - dataInicio.getDay()));
        let dataFim = new Date(dataInicio.getTime());
        dataFim = new Date(dataFim.setDate(dataFim.getDate() + 7));
        const queryOptions = new QueryOptions();
        queryOptions.query = {
            data_inicio: dataInicio,
            data_fim: dataFim
        };
        this.sorteioService.sorteiosDaSemana(queryOptions)
            .subscribe(response => {
                this.sorteiosDaSemana = response;
                this.setaParticipantesElegiveis(response);
            });
    }

    setaParticipantesElegiveis(sorteios: Sorteio[]): void {
        this.participantes.forEach(p => {
            p.inelegivelFacilitador = false;
            p.inelegivelSecretario = false;
        });

        sorteios.forEach(s => {
            const facilitador = _.find(this.participantes, { id: s.facilitador });
            const secretario = _.find(this.participantes, { id: s.secretario });

            if (facilitador) {
                facilitador.inelegivelFacilitador = true;
            }

            if (secretario) {
                secretario.inelegivelSecretario = true;
            }
        });

        // this.participantes.forEach(p => {
        //     if (p.id === 1) {
        //         p.inelegivelFacilitador = true;
        //     }
        // })
    }

    setaProximoDia(data: Date): void {
        data.setDate(data.getDate() + 1);
        if ([0, 3, 6].includes(data.getDay())) {
            this.setaProximoDia(data);
            return;
        }
        this.controls.data.setValue(data);
        this.mostraBotao = false;
        this.changeDetectorRef.detectChanges();
        this.mostraBotao = true;
    }

    getParticipantes(): void {
        this.participanteService.list()
            .subscribe(response => {
                this.participantes = response;
                this.setaProximoDia(new Date());
            });
    }

    sortear(): void {
        if (this.form.valid && !this.sorteando) {
              this.sorteando = true;
              if (!this.facilitador) {
                  const numeroFacilitador = this.numeroAleatorio();
                  this.animaFacilitador(numeroFacilitador, 'f');
              }

              if (!this.secretario) {
                  const numeroSecretario = this.numeroAleatorio();
                  this.animaFacilitador(numeroSecretario, 's');
              }
        }
    }

    animaFacilitador(numero: number, tipo: 'f' | 's'): void {
        let participanteAtual = 0;
        let totalPercorrido = 0;

        const interval = setInterval(() => {
            if (participanteAtual + 1 > this.participantes.length) {
                participanteAtual = 0;
            }

            const participante = this.participantes[participanteAtual];
            const imgParticipante = document.getElementById(`${tipo}-${participante.id}`);
            (imgParticipante as HTMLElement).classList.add('active');
            participanteAtual++;
            totalPercorrido++;
            if (totalPercorrido <= numero) {
                this.removeAnimacao(imgParticipante);
            } else {
                if (tipo === 'f') {
                    this.facilitador = participante;
                } else {
                    this.secretario = participante;
                }

                if ((this.facilitador?.id === this.secretario?.id) ||
                    (tipo === 'f' && participante.inelegivelFacilitador) ||
                    (tipo === 's' && participante.inelegivelSecretario)) {
                    this.removeAnimacao(imgParticipante);
                } else {
                    this.sorteando = false;
                    clearInterval(interval);
                }
            }
        }, 50);
    }

    selecionaFacilitador(participante: Participante): void {
        if (!participante.inelegivelFacilitador && participante.id !== this.secretario?.id) {
            this.facilitador = participante;
        }
    }

    selecionaSecretario(participante: Participante): void {
        if (!participante.inelegivelSecretario && participante.id !== this.facilitador?.id) {
            this.secretario = participante;
        }
    }

    removeAnimacao(imgParticipante: HTMLElement | null): void {
        setTimeout(() => {
            (imgParticipante as HTMLElement).classList.remove('active');
        }, 50);
    }

    numeroAleatorio(): number {
        return Math.floor(Math.random() * (this.participantes.length * 5) + 30);
    }

    alterarParticipante(tipo: string): void {
        this.sorteando = true;
        if (tipo === 'f') {
            this.facilitador = undefined;
            const numeroFacilitador = this.numeroAleatorio();
            this.animaFacilitador(numeroFacilitador, 'f');
        } else {
            this.secretario = undefined;
            const numeroSecretario = this.numeroAleatorio();
            this.animaFacilitador(numeroSecretario, 's');
        }
    }

    sorteioSalvo(sorteio: Sorteio): void {
        const facilitador = _.find(this.participantes, { id: sorteio.facilitador });
        const secretario = _.find(this.participantes, { id: sorteio.secretario });

        if (facilitador) {
            facilitador.inelegivelFacilitador = true;
        }

        if (secretario) {
            secretario.inelegivelSecretario = true;
        }
        this.setaProximoDia(this.controls.data.value);
        this.facilitador = undefined;
        this.secretario = undefined;
        Array.from(document.getElementsByClassName('participante')).forEach(img => {
            img.classList.remove('active');
        });
    }
}
