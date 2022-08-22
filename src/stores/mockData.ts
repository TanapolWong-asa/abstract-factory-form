import { IntegrationType } from '../pages/EditPartner/interfaces'

export const INTEGRATIONS: IntegrationType[] = [
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
