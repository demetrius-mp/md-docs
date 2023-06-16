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
	docDefaultTitle: 'Novo documento',
	docDefaultDescription: 'Descrição do documento',
	docLayout: {
		layout: 'Layout',
		edit: 'Edição',
		hybrid: 'Híbrido',
		render: 'Renderizado',
	},
	docActions: {
		actions: 'Ações',
		share: 'Compartilhar',
		createCopy: 'Criar cópia',
		delete: 'Excluir',
		confirmDelete: 'Tem certeza que deseja excluir este documento?',
	},
	docShare: {
		shareDocument: 'Compartilhar documento',
		onlyViewLink: 'Link para <>visualização<>:',
	},
	mustBeAuthenticatedToAccessPage: 'Você precisa estar autenticado para acessar esta página',
	welcome: 'Bem-vindo, <>{0:string}<>!',
} satisfies BaseTranslation;

export default pt;
