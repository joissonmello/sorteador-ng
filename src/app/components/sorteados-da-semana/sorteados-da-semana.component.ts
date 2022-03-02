import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Participante } from 'src/app/models/participante';
import { Sorteio } from 'src/app/models/sorteio';

@Component({
    selector: 'app-sorteados-da-semana',
    templateUrl: './sorteados-da-semana.component.html',
    styleUrls: ['./sorteados-da-semana.component.scss']
})
export class SorteadosDaSemanaComponent implements OnInit {
    @Output() fecharEvent = new EventEmitter();

    @Input() participantes!: Participante[];
    @Input() sorteiosDaSemana!: Sorteio[];
    sorteiosDaSemanaCopy!: Sorteio[];

    ngOnInit(): void {
        this.mapeiaParticipantes();
        console.log(this.sorteiosDaSemana);
    }

    mapeiaParticipantes(): void {
        this.sorteiosDaSemanaCopy = JSON.parse(JSON.stringify(this.sorteiosDaSemana));
        this.sorteiosDaSemanaCopy = this.sorteiosDaSemanaCopy.map(s => {
            s.facilitador = this.getParcipantePorId(s.facilitador);
            s.secretario = this.getParcipantePorId(s.secretario);
            return s;
        });
    }

    getParcipantePorId(id: number): Participante {
        return this.participantes.find(p => p.id === id) as Participante;
    }
}
