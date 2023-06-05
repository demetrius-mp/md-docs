import type { BaseTranslation } from '../i18n-types';

const pt = {
	signUp: 'Cadastrar',
	signIn: 'Entrar',
	signOut: 'Sair',
	form: {
		submit: 'Enviar',
		name: 'Nome',
		email: 'Email',
		password: 'Senha',
		confirmPassword: 'Confirmar senha',
	},
	notification: {
		kind: {
			info: 'Info',
			success: 'Sucesso',
			warning: 'Aviso',
			error: 'Erro',
		},
	},
} satisfies BaseTranslation;

export default pt;
