import React, { createContext, FunctionComponent, SetStateAction, useState } from 'react'

import { InterfaceType } from '../pages/EditPartner/interfaces'

export interface ISelectedInterfaceContext {
	selectedIntegration: InterfaceType | null
	setSelectedIntegration: React.Dispatch<SetStateAction<InterfaceType | null>>
}
export const SelectedInterfaceContext = createContext<ISelectedInterfaceContext>({
	selectedIntegration: null,
	setSelectedIntegration: () => null,
})

interface SelectedInterfaceProviderProps {}

export const SelectedInterfaceProvider: FunctionComponent<SelectedInterfaceProviderProps> = (
	props: any,
) => {
	const [selectedInterface, setSelectedInterface] = useState<InterfaceType | null>(null)

	const value: ISelectedInterfaceContext = {
		selectedIntegration: selectedInterface,
		setSelectedIntegration: setSelectedInterface,
	}
	return (
		<SelectedInterfaceContext.Provider value={value}>
			{props.children}
		</SelectedInterfaceContext.Provider>
	)
}
