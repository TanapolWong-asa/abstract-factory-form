import React, { createContext, FunctionComponent, SetStateAction, useState } from 'react'

import { InterfaceType } from '../pages/EditPartner/interfaces'

export interface IInterfacesContext {
	interfaces: InterfaceType[]
	setInterfaces: React.Dispatch<SetStateAction<InterfaceType[]>>
}
export const InterfacesContext = createContext<IInterfacesContext>({
	interfaces: [],
	setInterfaces: () => null,
})

interface InterfacesProviderProps {}

export const InterfacesProvider: FunctionComponent<InterfacesProviderProps> = (props: any) => {
	const [interfaces, setInterfaces] = useState<InterfaceType[]>([])

	const value: IInterfacesContext = {
		interfaces,
		setInterfaces,
	}
	return <InterfacesContext.Provider value={value}>{props.children}</InterfacesContext.Provider>
}
