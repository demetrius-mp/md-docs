import type { BaseTranslation } from '../i18n-types';

const pt = {
	signUp: 'Sign up',
	signIn: 'Sign in',
	signOut: 'Sign out',
	form: {
		submit: 'Submit',
		name: 'Name',
		email: 'Email',
		password: 'Password',
		confirmPassword: 'Confirm password',
		search: 'Search',
	},
	notification: {
		kind: {
			info: 'Info',
			success: 'Success',
			warning: 'Warning',
			error: 'Error',
		},
	},
	docs: 'Documents',
	manageDocs: 'Manage your documents',
	settings: 'Settings',
	manageSettings: 'Manage your settings',
	newDoc: 'New document',
	emptyDocs: "You don't have any documents yet",
	noDocsFound: 'No documents found',
	clickHereToCreateADoc: 'Click here to create a document',
	docDefaultTitle: 'New document',
	docDefaultDescription: 'Document description',
	docLayout: {
		layout: 'Layout',
		edit: 'Edit',
		hybrid: 'Hybrid',
		render: 'Rendered',
	},
	docActions: {
		actions: 'Actions',
		share: 'Share',
		delete: 'Delete',
		confirmDelete: 'Are you sure you want to delete this document?',
	},
	docShare: {
		shareDocument: 'Share document',
		onlyViewLink: 'Link for <>viewing<>:',
	},
} satisfies BaseTranslation;

export default pt;
