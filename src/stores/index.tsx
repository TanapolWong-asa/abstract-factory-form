import React, { FunctionComponent, ReactNode } from 'react'

import { ConnectionsProvider } from './connections'
import { InterfacesProvider } from './interfaces'
import { IntegrationsProvider } from './intergrations'
import { SelectedConnectionProvider } from './selectedConnections'
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
				<SelectedInterfaceProvider>
					<ConnectionsProvider>
						<SelectedConnectionProvider>{children}</SelectedConnectionProvider>
					</ConnectionsProvider>
				</SelectedInterfaceProvider>
			</InterfacesProvider>
		</SelectedIntegrationProvider>
	</IntegrationsProvider>
)
