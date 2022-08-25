import React, { createContext, FunctionComponent, SetStateAction, useState } from 'react'

import { IntegrationDataType } from '../pages/EditPartner/interfaces'
import { INTEGRATIONS } from './mockData'

export interface IIntegrationsContext {
	integrations: IntegrationDataType[]
	setIntegrations: React.Dispatch<SetStateAction<IntegrationDataType[]>>
}
export const IntegrationsContext = createContext<IIntegrationsContext>({
	integrations: [],
	setIntegrations: () => null,
})

interface IntegrationsProviderProps {}

export const IntegrationsProvider: FunctionComponent<IntegrationsProviderProps> = (props: any) => {
	const [integrations, setIntegrations] = useState<IntegrationDataType[]>(INTEGRATIONS)

	const value: IIntegrationsContext = {
		integrations,
		setIntegrations,
	}
	return (
		<IntegrationsContext.Provider value={value}>{props.children}</IntegrationsContext.Provider>
	)
}
