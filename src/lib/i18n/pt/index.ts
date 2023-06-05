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
	docs: 'Documentos',
	manageDocs: 'Gerencie seus documentos',
	settings: 'Configurações',
	manageSettings: 'Gerencie suas configurações',
} satisfies BaseTranslation;

export default pt;
