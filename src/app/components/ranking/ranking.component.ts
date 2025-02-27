import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { UntypedFormControl } from '@angular/forms';
import { SorteioService } from 'src/app/services/sorteio/sorteio.service';
import { QueryOptions } from 'src/app/utils/query-options';
import { environment } from 'src/environments/environment';

@Component({
    selector: 'app-ranking',
    templateUrl: './ranking.component.html',
    styleUrls: ['./ranking.component.scss'],
    standalone: false
})
export class RankingComponent implements OnInit {
    @Output() fecharEvent = new EventEmitter();

    carregando = true;
    anoInicial = environment.anoInicial;
    anosSelecionaveis: number[] = [];
    anoControl = new UntypedFormControl(new Date().getFullYear());
    sorteios: any;

    constructor(
        private sorteioService: SorteioService,
    ) { }

    ngOnInit(): void {
        this.montaAnos();
    }

    montaAnos(): void {
        for (let i = this.anoInicial; i <= new Date().getFullYear(); i++) {
            this.anosSelecionaveis.push(i);
        }

        this.getRanking();
        this.anoControl.valueChanges.subscribe(() => this.getRanking());
    }

    getRanking(): void {
        const queryOptions = new QueryOptions();
        queryOptions.query = {
            ano: this.anoControl.value,
        };
        this.sorteioService.ranking(queryOptions)
            .subscribe(response => {
                this.carregando = false;
                this.sorteios = response;
            });
    }
}
