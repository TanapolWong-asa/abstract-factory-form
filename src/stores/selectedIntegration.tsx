import React, { createContext, FunctionComponent, SetStateAction, useState } from 'react'

import { IntegrationType } from '../pages/EditPartner/interfaces'

export interface ISelectedIntegrationContext {
	partnerId: string
	setPartnerId: React.Dispatch<SetStateAction<string>>
	selectedIntegration: IntegrationType | null
	setSelectedIntegration: React.Dispatch<SetStateAction<IntegrationType | null>>
}
export const SelectedIntegrationContext = createContext<ISelectedIntegrationContext>({
	partnerId: '',
	setPartnerId: () => null,
	selectedIntegration: null,
	setSelectedIntegration: () => null,
})

interface SelectedIntegrationProviderProps {}

export const SelectedIntegrationProvider: FunctionComponent<SelectedIntegrationProviderProps> = (
	props: any,
) => {
	const [selectedIntegration, setSelectedIntegration] = useState<IntegrationType | null>(null)
	const [partnerId, setPartnerId] = useState<string>('')

	const value: ISelectedIntegrationContext = {
		partnerId,
		setPartnerId,
		selectedIntegration,
		setSelectedIntegration,
	}
	return (
		<SelectedIntegrationContext.Provider value={value}>
			{props.children}
		</SelectedIntegrationContext.Provider>
	)
}
