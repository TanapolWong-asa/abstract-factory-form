import React, { createContext, FunctionComponent, SetStateAction, useState } from 'react'

import { ConnectionDataType } from '../pages/EditIntegration/interfaces'

export interface IConnectionsContext {
	connections: ConnectionDataType[]
	setConnections: React.Dispatch<SetStateAction<ConnectionDataType[]>>
}
export const ConnectionsContext = createContext<IConnectionsContext>({
	connections: [],
	setConnections: () => null,
})

interface ConnectionsProviderProps {}

export const ConnectionsProvider: FunctionComponent<ConnectionsProviderProps> = (props: any) => {
	const [connections, setConnections] = useState<ConnectionDataType[]>([])

	const value: IConnectionsContext = {
		connections,
		setConnections,
	}
	return <ConnectionsContext.Provider value={value}>{props.children}</ConnectionsContext.Provider>
}
