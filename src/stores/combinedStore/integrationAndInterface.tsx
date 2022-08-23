import React, { createContext, FunctionComponent } from 'react'

import { ISelectedIntegrationContext, SelectedIntegrationContext } from '../selectedIntegration'
import { ISelectedInterfaceContext, SelectedInterfaceContext } from '../selectedInterface'

export interface ISelectedIntegrationAndSelectedInterfaceContext {
	selectedIntegrationContext: ISelectedIntegrationContext | null
	selectedInterfaceContext: ISelectedInterfaceContext | null
}
export const IntegrationsAndInterfacesContext =
	createContext<ISelectedIntegrationAndSelectedInterfaceContext>({
		selectedIntegrationContext: null,
		selectedInterfaceContext: null,
	})

interface SelectedIntegrationAndSelectedInterfaceProviderProps {}

export const SelectedIntegrationAndSelectedInterfaceProvider: FunctionComponent<
	SelectedIntegrationAndSelectedInterfaceProviderProps
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
