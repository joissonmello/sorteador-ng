let urlBackEndApi = '';
let anoInicial = 0;
let titulo = '';

const domain = window.location.host;

const credilab = 'sorteador-credilab-ng.herokuapp.com';
const proagrolab = 'sorteador-proagrolab-ng.herokuapp.com';

if (domain === credilab) {
    urlBackEndApi = 'https://sorteador-credilab-py.herokuapp.com/';
    anoInicial = 2021;
    titulo = 'Sorteador Credilab';
} else if (domain === proagrolab) {
    urlBackEndApi = 'https://sorteador-proagrolab-py.herokuapp.com/';
    anoInicial = 2022;
    titulo = 'Sorteador Proagrolab';
}

export const environment = {
    production: true,
    urlBackEndApi,
    anoInicial
};
