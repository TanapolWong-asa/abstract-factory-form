import React, { createContext, FunctionComponent, SetStateAction, useState } from 'react'

import { InterfaceDataType } from '../pages/EditIntegration/interfaces'

export interface IInterfacesContext {
	interfaces: InterfaceDataType[]
	setInterfaces: React.Dispatch<SetStateAction<InterfaceDataType[]>>
}
export const InterfacesContext = createContext<IInterfacesContext>({
	interfaces: [],
	setInterfaces: () => null,
})

interface InterfacesProviderProps {}

export const InterfacesProvider: FunctionComponent<InterfacesProviderProps> = (props: any) => {
	const [interfaces, setInterfaces] = useState<InterfaceDataType[]>([])

	const value: IInterfacesContext = {
		interfaces,
		setInterfaces,
	}
	return <InterfacesContext.Provider value={value}>{props.children}</InterfacesContext.Provider>
}
