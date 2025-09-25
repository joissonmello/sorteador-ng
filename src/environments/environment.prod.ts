let urlBackEndApi = '';
let anoInicial = 0;
let titulo = '';

const domain = window.location.host;

const backend = 'https://sorteador-ng.vercel.app/';

if (domain === backend) {
    urlBackEndApi = 'https://web-production-88f594.up.railway.app/';
    anoInicial = 2021;
    titulo = 'Sorteador Zoom';
}

export const environment = {
    production: true,
    urlBackEndApi,
    anoInicial,
    titulo
};
