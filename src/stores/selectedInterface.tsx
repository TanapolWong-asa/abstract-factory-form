import React, { createContext, FunctionComponent, SetStateAction, useState } from 'react'

import { InterfaceDataType } from '../pages/EditIntegration/interfaces'

export interface ISelectedInterfaceContext {
	selectedInterface: InterfaceDataType | null
	setSelectedInterface: React.Dispatch<SetStateAction<InterfaceDataType | null>>
}
export const SelectedInterfaceContext = createContext<ISelectedInterfaceContext>({
	selectedInterface: null,
	setSelectedInterface: () => null,
})

interface SelectedInterfaceProviderProps {}

export const SelectedInterfaceProvider: FunctionComponent<SelectedInterfaceProviderProps> = (
	props: any,
) => {
	const [selectedInterface, setSelectedInterface] = useState<InterfaceDataType | null>(null)

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
