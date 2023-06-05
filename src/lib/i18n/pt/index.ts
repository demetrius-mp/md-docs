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
		search: 'Buscar',
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
	newDoc: 'Novo documento',
	emptyDocs: 'Você ainda não tem nenhum documento',
	noDocsFound: 'Nenhum documento encontrado',
	clickHereToCreateADoc: 'Clique aqui para criar um documento',
} satisfies BaseTranslation;

export default pt;
