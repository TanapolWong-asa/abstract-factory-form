import React, { createContext, FunctionComponent, SetStateAction, useState } from 'react'

export interface ISelectedConnectionContext {
	selectedConnection: ConnectionType | null
	setSelectedConnection: React.Dispatch<SetStateAction<ConnectionType | null>>
}
export const ConnectionsContext = createContext<ISelectedConnectionContext>({
	selectedConnection: null,
	setSelectedConnection: () => null,
})

interface SelectedConnectionProviderProps {}

export const SelectedConnectionProvider: FunctionComponent<SelectedConnectionProviderProps> = (
	props: any,
) => {
	const [selectedConnection, setSelectedConnection] = useState<ConnectionType | null>(null)

	const value: ISelectedConnectionContext = {
		selectedConnection,
		setSelectedConnection,
	}
	return <ConnectionsContext.Provider value={value}>{props.children}</ConnectionsContext.Provider>
}
