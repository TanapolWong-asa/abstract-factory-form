import React, { createContext, FunctionComponent, SetStateAction, useState } from 'react'

export interface IConnectionsContext {
	connections: ConnectionType[]
	setConnections: React.Dispatch<SetStateAction<ConnectionType[]>>
}
export const ConnectionsContext = createContext<IConnectionsContext>({
	connections: [],
	setConnections: () => null,
})

interface ConnectionsProviderProps {}

export const ConnectionsProvider: FunctionComponent<ConnectionsProviderProps> = (props: any) => {
	const [connections, setConnections] = useState<ConnectionType[]>([])

	const value: IConnectionsContext = {
		connections,
		setConnections,
	}
	return <ConnectionsContext.Provider value={value}>{props.children}</ConnectionsContext.Provider>
}
