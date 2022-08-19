import React, { FunctionComponent, ReactNode } from 'react'

import { InterfacesProvider } from './interfaces'
import { IntegrationsProvider } from './intergrations'
import { SelectedIntegrationProvider } from './selectedIntegration'
import { SelectedInterfaceProvider } from './selectedInterface'

interface StoreProviderProps {
	children: ReactNode
}

export const StoreProvider: FunctionComponent<StoreProviderProps> = ({
	children,
}: StoreProviderProps) => (
	<IntegrationsProvider>
		<SelectedIntegrationProvider>
			<InterfacesProvider>
				<SelectedInterfaceProvider>{children}</SelectedInterfaceProvider>
			</InterfacesProvider>
		</SelectedIntegrationProvider>
	</IntegrationsProvider>
)
