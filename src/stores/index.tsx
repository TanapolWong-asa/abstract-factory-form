import React, { FunctionComponent, ReactNode } from 'react'

import { IntegrationsProvider } from './intergrations'
import { SelectedIntegrationProvider } from './selectedIntegration'

interface StoreProviderProps {
	children: ReactNode
}

export const StoreProvider: FunctionComponent<StoreProviderProps> = ({
	children,
}: StoreProviderProps) => (
	<IntegrationsProvider>
		<SelectedIntegrationProvider>{children}</SelectedIntegrationProvider>
	</IntegrationsProvider>
)
