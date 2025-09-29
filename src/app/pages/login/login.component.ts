import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/services/login/login.service';

@Component({
    selector: 'app-login',
    standalone: true,
    imports: [ReactiveFormsModule, CommonModule],
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss']
})
export class LoginComponent {
    formularioLogin: FormGroup;
    carregando = false;

    constructor(
        private construtor: FormBuilder,
        private router: Router,
        private loginService: LoginService
    ) {
        this.formularioLogin = this.construtor.group({
            username: ['', [Validators.required]],
            senha: ['', [Validators.required, Validators.minLength(6)]]
        });
    }

    get username() {
        return this.formularioLogin.get('username');
    }

    get senha() {
        return this.formularioLogin.get('senha');
    }

    realizarLogin(): void {
        if (this.formularioLogin.valid) {
            this.carregando = true;

            this.loginService.login(this.username!.value, this.senha!.value).subscribe({
                next: (response) => {
                    this.loginService.guardarSessao(response);
                    this.router.navigate(['/home']);
                },
                error: () => {
                    this.carregando = false;
                }
            });
        } else {
            this.marcarCamposComoTocados();
        }
    }

    private marcarCamposComoTocados(): void {
        Object.keys(this.formularioLogin.controls).forEach(campo => {
            this.formularioLogin.get(campo)?.markAsTouched();
        });
    }

    obterMensagemErro(nomeCampo: string): string {
        const campo = this.formularioLogin.get(nomeCampo);

        if (campo?.hasError('required')) {
            return `${nomeCampo === 'username' ? 'Usuário' : 'Senha'} é obrigatório`;
        }

        if (campo?.hasError('minlength')) {
            return 'Senha deve ter pelo menos 6 caracteres';
        }

        return '';
    }

    campoTemErro(nomeCampo: string): boolean {
        const campo = this.formularioLogin.get(nomeCampo);
        return !!(campo?.invalid && (campo?.dirty || campo?.touched));
    }
}
