import React, { createContext, FunctionComponent } from 'react'

import { ISelectedIntegrationContext, SelectedIntegrationContext } from '../selectedIntegration'
import { ISelectedInterfaceContext, SelectedInterfaceContext } from '../selectedInterface'

export interface ISelectedIntegrationAndSelectedInterfaceContext {
	selectedIntegrationContext: ISelectedIntegrationContext | null
	selectedInterfaceContext: ISelectedInterfaceContext | null
}
export const SelectedIntegrationAndSelectedInterfaceContext =
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
					<SelectedIntegrationAndSelectedInterfaceContext.Provider
						value={{ selectedIntegrationContext, selectedInterfaceContext }}
					>
						{props.children}
					</SelectedIntegrationAndSelectedInterfaceContext.Provider>
				)}
			</SelectedInterfaceContext.Consumer>
		)}
	</SelectedIntegrationContext.Consumer>
)
