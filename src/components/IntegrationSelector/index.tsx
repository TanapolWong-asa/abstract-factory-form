import React, { FunctionComponent, useContext, useEffect, useState } from 'react'

import { IntegrationType } from '../../pages/EditPartner/interfaces'
import { IIntegrationsContext, IntegrationsContext } from '../../stores/intergrations'
import {
	ISelectedIntegrationContext,
	SelectedIntegrationContext,
} from '../../stores/selectedIntegration'

interface IntegrationSelectorProps {
	technology: string
}

const IntegrationSelector: FunctionComponent<IntegrationSelectorProps> = ({
	technology,
}: IntegrationSelectorProps) => {
	const { integrations } = useContext<IIntegrationsContext>(IntegrationsContext)
	const { setSelectedIntegration } = useContext<ISelectedIntegrationContext>(
		SelectedIntegrationContext,
	)
	const [filteredIntegrations, setFilteredIntegrations] = useState<IntegrationType[]>([])

	useEffect(() => {
		setFilteredIntegrations(
			integrations.filter((integration) => integration.technology === technology),
		)
	}, [technology, integrations])

	// FIXME Warning: Encountered two children with the same key, `integration6`. Keys should be unique so that components maintain their identity across updates. Non-unique keys may cause children to be duplicated and/or omitted — the behavior is unsupported and could change in a future version.
	// at select
	// at IntegrationSelector
	// at div
	// at App
	// Noted that the key is different from time to time (not only for id=6)
	// TODO: Something in InterfaceForm make a copy of existing integration and apply it back to the list
	return (
		<select
			onChange={(e) => {
				setSelectedIntegration(
					(prev) =>
						integrations.find(
							(integration) => integration.integrationId === e.target.value,
						) || prev,
				)
			}}
			defaultValue="default"
		>
			{filteredIntegrations.map((integration) => (
				<option
					key={`integration${integration.integrationId}`}
					value={integration.integrationId}
				>
					{integration.integrationName || 'Untitled Integration'}
				</option>
			))}
			<option value="default" hidden>
				Select {technology} integration...
			</option>
		</select>
	)
}

export default IntegrationSelector
