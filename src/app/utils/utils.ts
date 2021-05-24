import { HttpErrorResponse } from '@angular/common/http';
import { FormGroup } from '@angular/forms';

export abstract class Utils {
    static estadoParaUF(estado: string): string {
        const estados = {
            acre: 'AC',
            alagoas: 'AL',
            amapa: 'AP',
            amazonas: 'AM',
            bahia: 'BA',
            ceara: 'CE',
            'distrito federal': 'DF',
            'espirito santo': 'ES',
            goias: 'GO',
            maranhao: 'MA',
            'mato grosso': 'MT',
            'mato grosso do sul': 'MS',
            'minas gerais': 'MG',
            para: 'PA',
            paraiba: 'PB',
            parana: 'PR',
            pernambuco: 'PE',
            piaui: 'PI',
            'rio de janeiro': 'RJ',
            'rio grande do norte': 'RN',
            'rio grande do sul': 'RS',
            rondonia: 'RO',
            roraima: 'RR',
            'santa catarina': 'SC',
            'sao paulo': 'SP',
            sergipe: 'SE',
            tocantins: 'TO',
        };

        return estados[Utils.removeAcentos(estado.toLowerCase())];
    }

    static ufParaEstado(estado: string): string {
        const estados = {
            AC: 'Acre',
            AL: 'Alagoas',
            AP: 'Amapá',
            AM: 'Amazonas',
            BA: 'Bahia',
            CE: 'Ceará',
            DF: 'Distrito Federal',
            ES: 'Espírito Santo',
            GO: 'Goiás',
            MA: 'Maranhão',
            MT: 'Mato Grosso',
            MS: 'Mato Grosso do Sul',
            MG: 'Minas Gerais',
            PA: 'Pará',
            PB: 'Paraíba',
            PR: 'Paraná',
            PE: 'Pernambuco',
            PI: 'Piauí',
            RJ: 'Rio de Janeiro',
            RN: 'Rio Grande do Norte',
            RS: 'Rio Grande do Sul',
            RO: 'Rondônia',
            RR: 'Roraima',
            SC: 'Santa Catarina',
            SP: 'São Paulo',
            SE: 'Sergipe',
            TO: 'Tocantins',
        };

        return estados[estado.toUpperCase()];
    }

    static removeAcentos(str: string): string {
        return str.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
    }

    static errosPorForm(form: FormGroup, error: HttpErrorResponse): string[] {
        const campos = [];
        Object.keys(error.error).forEach(campo => {
            if (Object.keys(form.controls).includes(campo)) {
                campos.push(campo);
            }
        });

        return campos;
    }
}
