import {
	IATConnectionData,
	IntegrationDataType,
	IWMConnectionData,
} from '../pages/EditPartner/interfaces'

export const INTEGRATIONS: IntegrationDataType[] = [
	{
		integrationId: '1',
		integrationName: 'WEB 1',
		technology: 'WM',
		interfaces: {
			interfaceList: [
				{
					interfaceId: '1',
					interfaceName: 'WM inf 1',
					direction: 'In',
					businessTransactionType: 'wMType 1',
					connections: [],
				},
				{
					interfaceId: '2',
					interfaceName: 'WM inf 2',
					direction: 'Out',
					businessTransactionType: 'wMType 2',
					connections: [],
				},
			],
		},
	},
	{
		integrationId: '2',
		integrationName: 'WEB 2',
		technology: 'WM',
		interfaces: {
			interfaceList: [],
		},
	},
	{
		integrationId: '3',
		integrationName: 'WEB 3',
		technology: 'WM',
		interfaces: {
			interfaceList: [
				{
					interfaceId: '3',
					interfaceName: 'WM inf 3',
					direction: 'Out',
					businessTransactionType: 'wMType 1',
					connections: [],
				},
			],
		},
	},
	{
		integrationId: '4',
		integrationName: 'AT 1',
		technology: 'AT',
		businessLine: 'bus 1',
		interfaces: {
			interfaceList: [
				{
					interfaceId: '4',
					interfaceName: 'AT inf 1',
					notes: 'notesnotesnotesnotesnotesnotesnotesnotesnotesnotesnotesnotesnotesnotesnotesnotesnotesnotes123123123notesnotesnotesnotesnotesnotes123',
					jobType: 'ATType 1',
					connections: [],
				},
				{
					interfaceId: '5',
					interfaceName: 'AT inf 2',
					notes: 'notesnotesnotesnotesnotesnotesnotesnotesnotesnotesnotesnotesnotesnotesnotesnotesnotesnotes123123123notesnotesnotesnotesnotesnotes123',
					jobType: 'ATType 1',
					connections: [],
				},
				{
					interfaceId: '6',
					interfaceName: 'AT inf 3',
					notes: 'notesnotesnotesnotesnotesnotesnotesnotesnotesnotesnotesnotesnotesnotesnotesnotesnotesnotes123123123notesnotesnotesnotesnotesnotes123',
					jobType: 'ATType 2',
					connections: [],
				},
			],
		},
	},
	{
		integrationId: '5',
		integrationName: 'AT 2',
		technology: 'AT',
		businessLine: 'bus 2',
		interfaces: {
			interfaceList: [
				{
					interfaceId: '7',
					interfaceName: 'AT inf 4',
					notes: 'notesnotesnotesnotesnotesnotesnotesnotesnotesnotesnotesnotesnotesnotesnotesnotesnotesnotes123123123notesnotesnotesnotesnotesnotes123',
					jobType: 'ATType 2',
					connections: [],
				},
			],
		},
	},
	{
		integrationId: '6',
		integrationName: 'WEB 4',
		technology: 'WM',
		interfaces: {
			interfaceList: [],
		},
	},
]

export const WM_CONNECTIONS: IWMConnectionData[] = [
	{
		connectionId: 'wm1',
		connectionName: 'WM conn 1',
		transferMode: 'synchronous',
		contentType: 'json',

		sapServer: 'CRM61',
		databaseName: 'wm db 1',
	},
	{
		connectionId: 'wm2',
		connectionName: 'WM conn 2',
		transferMode: 'asynchronous',
		contentType: 'text',

		sapServer: 'CRM62',
		databaseName: 'wm db 1',
	},
	{
		connectionId: 'wm3',
		connectionName: 'WM conn 3',
		transferMode: 'asynchronous',
		contentType: 'pdf',

		sapServer: 'CRM61',
		databaseName: 'wm db 2',
	},
	{
		connectionId: 'wm4',
		connectionName: 'WM conn 4',
		transferMode: 'synchronous',
		contentType: 'text',

		sapServer: 'CRM61',
		databaseName: 'wm db 2',
	},
	{
		connectionId: 'wm5',
		connectionName: 'WM conn 5',
		transferMode: 'synchronous',
		contentType: 'json',

		sapServer: 'CRM61',
		databaseName: 'wm db 2',
	},
]
export const AT_CONNETIONS: IATConnectionData[] = [
	{
		connectionId: 'at1',
		connectionName: 'AT conn 1',
		transferMode: 'asynchronous',
		contentType: 'text',

		authenticationType: 'Password',
	},
	{
		connectionId: 'at2',
		connectionName: 'AT conn 2',
		transferMode: 'asynchronous',
		contentType: 'json',

		authenticationType: 'Bearer token',
	},
	{
		connectionId: 'at3',
		connectionName: 'AT conn 3',
		transferMode: 'synchronous',
		contentType: 'text',

		authenticationType: 'OAuth 2.0',
	},
	{
		connectionId: 'at4',
		connectionName: 'AT conn 4',
		transferMode: 'synchronous',
		contentType: 'json',

		authenticationType: 'Bearer token',
	},
]
