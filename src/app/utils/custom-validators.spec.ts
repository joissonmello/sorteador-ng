import { UntypedFormControl, UntypedFormGroup } from '@angular/forms';
import { CustomValidators } from 'src/app/utils/custom-validators';

describe('Custom Validators', () => {
    let form: UntypedFormGroup;

    beforeEach(() => {
        form = new UntypedFormGroup({
            campo: new UntypedFormControl('')
        });
    });

    describe('Testes de validação de CPF', () => {
        beforeEach(() => {
            form.controls.campo.setValidators([CustomValidators.cpf]);
            form.controls.campo.updateValueAndValidity();
        });

        it('890.494.380-91 deve ser um CPF válido', () => {
            form.controls.campo.setValue('890.494.380-91');
            expect(form.controls.campo.valid).toBeTruthy();
        });

        it('890.494.380-92 deve ser um CPF inválido', () => {
            form.controls.campo.setValue('890.494.380-92');
            expect(form.controls.campo.invalid).toBeTruthy();
        });

        it('89049438091 deve ser um CPF válido', () => {
            form.controls.campo.setValue('89049438091');
            expect(form.controls.campo.valid).toBeTruthy();
        });

        it('89049438092 deve ser um CPF inválido', () => {
            form.controls.campo.setValue('89049438092');
            expect(form.controls.campo.invalid).toBeTruthy();
        });

        it('00000000000 deve ser um CPF inválido', () => {
            form.controls.campo.setValue('00000000000');
            expect(form.controls.campo.invalid).toBeTruthy();
        });
    });

    describe('Testes de validação de CNPJ', () => {
        beforeEach(() => {
            form.controls.campo.setValidators([CustomValidators.cnpj]);
            form.controls.campo.updateValueAndValidity();
        });

        it('67.801.097/0001-02 deve ser um CNPJ válido', () => {
            form.controls.campo.setValue('67.801.097/0001-02');
            expect(form.controls.campo.valid).toBeTruthy();
        });

        it('67.801.097/0001-03 deve ser um CNPJ inválido', () => {
            form.controls.campo.setValue('67.801.097/0001-03');
            expect(form.controls.campo.invalid).toBeTruthy();
        });

        it('67801097000102 deve ser um CNPJ válido', () => {
            form.controls.campo.setValue('67801097000102');
            expect(form.controls.campo.valid).toBeTruthy();
        });

        it('67801097000103 deve ser um CNPJ inválido', () => {
            form.controls.campo.setValue('67801097000103');
            expect(form.controls.campo.invalid).toBeTruthy();
        });

        it('00000000000000 deve ser um CNPJ inválido', () => {
            form.controls.campo.setValue('00000000000000');
            expect(form.controls.campo.invalid).toBeTruthy();
        });
    });

    describe('Testes de validação de telefone', () => {
        beforeEach(() => {
            form.controls.campo.setValidators([CustomValidators.celular]);
            form.controls.campo.updateValueAndValidity();
        });

        it('(46) 99911-2227 deve ser um celular válido', () => {
            form.controls.campo.setValue('(46) 99911-2227');
            expect(form.controls.campo.valid).toBeTruthy();
        });

        it('46999112227 deve ser um celular válido', () => {
            form.controls.campo.setValue('46999112227');
            expect(form.controls.campo.valid).toBeTruthy();
        });

        it('469991122 deve ser um celular inválido', () => {
            form.controls.campo.setValue('469991122');
            expect(form.controls.campo.invalid).toBeTruthy();
        });

        it('0000000000 deve ser um celular inválido', () => {
            form.controls.campo.setValue('0000000000');
            expect(form.controls.campo.invalid).toBeTruthy();
        });

        it('(46) 00000-0000 deve ser um celular inválido', () => {
            form.controls.campo.setValue('(46) 00000-0000');
            expect(form.controls.campo.invalid).toBeTruthy();
        });
    });
});
