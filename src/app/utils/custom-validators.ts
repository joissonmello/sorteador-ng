import { AbstractControl } from '@angular/forms';

export class CustomValidators {
    static cpf(control: AbstractControl): { [key: string]: boolean } | null {
        if (!control.value) {
            return;
        }

        const cpfAux: any = control.value.replace(/[^\d]+/g, '');

        if (cpfAux) {
            if (cpfAux.length === 11) {
                const arrCpfsInvalidos = ['00000000000', '11111111111', '22222222222', '33333333333',
                    '44444444444', '55555555555', '66666666666', '77777777777',
                    '88888888888', '99999999999'];

                if (arrCpfsInvalidos.includes(cpfAux)) {
                    return { cpf: true };
                }

                const v = [];

                v[0] = 1 * cpfAux[0] + 2 * cpfAux[1] + 3 * cpfAux[2];
                v[0] += 4 * cpfAux[3] + 5 * cpfAux[4] + 6 * cpfAux[5];
                v[0] += 7 * cpfAux[6] + 8 * cpfAux[7] + 9 * cpfAux[8];
                v[0] = v[0] % 11;
                v[0] = v[0] % 10;

                v[1] = 1 * cpfAux[1] + 2 * cpfAux[2] + 3 * cpfAux[3];
                v[1] += 4 * cpfAux[4] + 5 * cpfAux[5] + 6 * cpfAux[6];
                v[1] += 7 * cpfAux[7] + 8 * cpfAux[8] + 9 * v[0];
                v[1] = v[1] % 11;
                v[1] = v[1] % 10;

                if ((v[0] !== parseInt(cpfAux[9], 10)) || (v[1] !== parseInt(cpfAux[10], 10))) {
                    return { cpf: true };
                }
            } else {
                return { cpf: true };
            }
        }

        return null;
    }

    static cnpj(control: AbstractControl): { [key: string]: boolean } | null {
        if (!control.value) {
            return null;
        }

        const cnpjAux = control.value.replace(/[^\d]+/g, '');

        if (!cnpjAux) {
            return null;
        }

        if (cnpjAux.length !== 14) {
            return { cnpj: true };
        }

        if (cnpjAux === '00000000000000' ||
            cnpjAux === '11111111111111' ||
            cnpjAux === '22222222222222' ||
            cnpjAux === '33333333333333' ||
            cnpjAux === '44444444444444' ||
            cnpjAux === '55555555555555' ||
            cnpjAux === '66666666666666' ||
            cnpjAux === '77777777777777' ||
            cnpjAux === '88888888888888' ||
            cnpjAux === '99999999999999') {
            return { cnpj: true };
        }

        let tamanho = cnpjAux.length - 2;
        let numeros: any = cnpjAux.substring(0, tamanho);
        const digitos = cnpjAux.substring(tamanho);
        let soma = 0;
        let pos = tamanho - 7;
        for (let i = tamanho; i >= 1; i--) {
            soma += numeros.charAt(tamanho - i) * pos--;
            if (pos < 2) {
                pos = 9;
            }
        }

        let resultado = soma % 11 < 2 ? 0 : 11 - soma % 11;
        if (resultado !== parseInt(digitos.charAt(0), 10)) {
            return { cnpj: true };
        }

        tamanho = tamanho + 1;
        numeros = cnpjAux.substring(0, tamanho);
        soma = 0;
        pos = tamanho - 7;
        for (let i = tamanho; i >= 1; i--) {
            soma += numeros.charAt(tamanho - i) * pos--;
            if (pos < 2) {
                pos = 9;
            }
        }
        resultado = soma % 11 < 2 ? 0 : 11 - soma % 11;
        if (resultado !== parseInt(digitos.charAt(1), 10)) {
            return { cnpj: true };
        }

        return null;
    }

    static celular(control: AbstractControl): { [key: string]: boolean } | null {
        let celular: string = control.value;

        if (celular) {
            celular = celular.replace(/\D/g, '');
            if (celular.match(/(.)\1{8,}/g)) {
                return { celular: true };
            }

            if (celular.length < 10) {
                return { celular: true };
            }
        }

        return null;
    }
}
