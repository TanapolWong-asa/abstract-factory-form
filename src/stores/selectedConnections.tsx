import React, { createContext, FunctionComponent, SetStateAction, useState } from 'react'

import { ConnectionDataType } from '../pages/EditPartner/interfaces'

export interface ISelectedConnectionsContext {
	selectedConnections: ConnectionDataType[]
	setSelectedConnections: React.Dispatch<SetStateAction<ConnectionDataType[]>>
}
export const SelectedConnectionsContext = createContext<ISelectedConnectionsContext>({
	selectedConnections: [],
	setSelectedConnections: () => null,
})

interface SelectedConnectionProviderProps {}

export const SelectedConnectionProvider: FunctionComponent<SelectedConnectionProviderProps> = (
	props: any,
) => {
	const [selectedConnections, setSelectedConnections] = useState<ConnectionDataType[]>([])

	const value: ISelectedConnectionsContext = {
		selectedConnections,
		setSelectedConnections,
	}
	return (
		<SelectedConnectionsContext.Provider value={value}>
			{props.children}
		</SelectedConnectionsContext.Provider>
	)
}
