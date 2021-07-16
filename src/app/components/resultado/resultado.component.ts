import { asNativeElements, Component, EventEmitter, Input, Output } from '@angular/core';
import { Participante } from 'src/app/models/participante';
import { Sorteio } from 'src/app/models/sorteio';
import { SlackService } from 'src/app/services/slack/slack.service';
import { SorteioService } from 'src/app/services/sorteio/sorteio.service';

@Component({
    selector: 'app-resultado',
    templateUrl: './resultado.component.html',
    styleUrls: ['./resultado.component.scss']
})
export class ResultadoComponent {
    @Input() facilitador!: Participante;
    @Input() secretario!: Participante;
    @Input() data!: Date;

    @Output() alterarParticipante: EventEmitter<string> = new EventEmitter<string>();
    @Output() sorteioSalvo: EventEmitter<Sorteio> = new EventEmitter<Sorteio>();

    salvando = false;

    constructor(
        private sorteioService: SorteioService,
        private slackService: SlackService
    ) { }

    alterar(tipo: string): void {
        this.alterarParticipante.emit(tipo);
    }

    salvar(): void {
        if (!this.salvando) {
            this.salvando = true;
            const sorteio = new Sorteio();
            sorteio.data = this.data;
            sorteio.facilitador = this.facilitador.id;
            sorteio.secretario = this.secretario.id;

            this.sorteioService.create(sorteio)
                .subscribe(response => {
                    this.notifica(response);
                    this.sorteioSalvo.emit(response);
                    this.salvando = false;
                });
        }
    }

    notifica(sorteio: Sorteio): void {
        this.slackService.notificaResultado(sorteio)
            .subscribe();
    }
}
