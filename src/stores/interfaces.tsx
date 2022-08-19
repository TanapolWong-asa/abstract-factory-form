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
	const [integrations, setIntegrations] = useState<InterfaceType[]>([]) // TODO: Change interfaces according to selectedIntegration

	const value: IInterfacesContext = {
		interfaces: integrations,
		setInterfaces: setIntegrations,
	}
	return <InterfacesContext.Provider value={value}>{props.children}</InterfacesContext.Provider>
}
