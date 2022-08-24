import React, { createContext, FunctionComponent, SetStateAction, useState } from 'react'

export interface ISelectedConnectionsContext {
	selectedConnections: ConnectionType[]
	setSelectedConnections: React.Dispatch<SetStateAction<ConnectionType[]>>
}
export const SelectedConnectionsContext = createContext<ISelectedConnectionsContext>({
	selectedConnections: [],
	setSelectedConnections: () => null,
})

interface SelectedConnectionProviderProps {}

export const SelectedConnectionProvider: FunctionComponent<SelectedConnectionProviderProps> = (
	props: any,
) => {
	const [selectedConnections, setSelectedConnections] = useState<ConnectionType[]>([])

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
