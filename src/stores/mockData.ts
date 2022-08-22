import { IATIntegrationData, IWMIntegrationData } from '../pages/EditPartner/interfaces'

export const INTEGRATIONS: (IWMIntegrationData | IATIntegrationData)[] = [
	{
		integrationId: '1',
		integrationName: 'WEB 1',
		technology: 'WM',
		interfaces: {
			interfaceList: [],
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
			interfaceList: [],
		},
	},
	{
		integrationId: '4',
		integrationName: 'AT 1',
		technology: 'AT',
		businessLine: 'bus 1',
		interfaces: {
			interfaceList: [],
		},
	},
	{
		integrationId: '5',
		integrationName: 'AT 2',
		technology: 'AT',
		businessLine: 'bus 2',
		interfaces: {
			interfaceList: [],
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
