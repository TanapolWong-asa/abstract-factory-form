import React, { createContext, FunctionComponent, SetStateAction, useState } from 'react'

import { InterfaceType } from '../pages/EditPartner/interfaces'

export interface ISelectedInterfaceContext {
	selectedInterface: InterfaceType | null
	setSelectedInterface: React.Dispatch<SetStateAction<InterfaceType | null>>
}
export const SelectedInterfaceContext = createContext<ISelectedInterfaceContext>({
	selectedInterface: null,
	setSelectedInterface: () => null,
})

interface SelectedInterfaceProviderProps {}

export const SelectedInterfaceProvider: FunctionComponent<SelectedInterfaceProviderProps> = (
	props: any,
) => {
	const [selectedInterface, setSelectedInterface] = useState<InterfaceType | null>(null)

	const value: ISelectedInterfaceContext = {
		selectedInterface,
		setSelectedInterface,
	}
	return (
		<SelectedInterfaceContext.Provider value={value}>
			{props.children}
		</SelectedInterfaceContext.Provider>
	)
}
