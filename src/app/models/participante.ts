export class Participante {
    id!: number;
    nome!: string;
    avatar!: string;
    'nome_slack'!: string;
    ativo!: boolean;
    inelegivelFacilitador?: boolean;
    inelegivelSecretario?: boolean;
}
