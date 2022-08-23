import React, { createContext, FunctionComponent } from 'react'

import { ISelectedIntegrationContext, SelectedIntegrationContext } from '../selectedIntegration'
import { ISelectedInterfaceContext, SelectedInterfaceContext } from '../selectedInterface'

// CONTINUE: Combine this
export interface IIntegrationsAndInterfacesContext {
	selectedIntegrationContext: ISelectedIntegrationContext | null
	selectedInterfaceContext: ISelectedInterfaceContext | null
}
export const IntegrationsAndInterfacesContext = createContext<IIntegrationsAndInterfacesContext>({
	selectedIntegrationContext: null,
	selectedInterfaceContext: null,
})

interface IntegrationsAndInterfacesProviderProps {}

export const IntegrationsAndInterfacesProvider: FunctionComponent<
	IntegrationsAndInterfacesProviderProps
> = (props: any) => (
	<SelectedIntegrationContext.Consumer>
		{(selectedIntegrationContext) => (
			<SelectedInterfaceContext.Consumer>
				{(selectedInterfaceContext) => (
					<IntegrationsAndInterfacesContext.Provider
						value={{ selectedIntegrationContext, selectedInterfaceContext }}
					>
						{props.children}
					</IntegrationsAndInterfacesContext.Provider>
				)}
			</SelectedInterfaceContext.Consumer>
		)}
	</SelectedIntegrationContext.Consumer>
)
