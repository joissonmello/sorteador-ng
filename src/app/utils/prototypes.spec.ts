import { Prototypes } from './prototypes';

describe('Prototypes', () => {
    Prototypes.init();

    describe('Teste de função de string para data', () => {
        it('Data 01/01/2000 em string, deve retornar uma data', () => {
            const data = '01/01/2000';
            expect(data.toDate()).toBeInstanceOf(Date);
        });

        it('Data 01/01/2000 em string, deve retornar uma data com o ano 2000', () => {
            const data = '01/01/2000';
            expect(data.toDate().getFullYear()).toBe(2000);
        });

        it('Data 01/01/2000 em string, deve retornar uma data com o mês 0', () => {
            const data = '01/01/2000';
            expect(data.toDate().getMonth()).toBe(0);
        });

        it('Data 01/01/2000 em string, deve retornar uma data com o dia 1', () => {
            const data = '01/01/2000';
            expect(data.toDate().getDate()).toBe(1);
        });
    });
});
