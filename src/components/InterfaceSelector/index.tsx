import React, { FunctionComponent, useContext, useEffect, useState } from 'react'

import { InterfaceType } from '../../pages/EditPartner/interfaces'
import {
	ISelectedIntegrationContext,
	SelectedIntegrationContext,
} from '../../stores/selectedIntegration'
import { ISelectedInterfaceContext, SelectedInterfaceContext } from '../../stores/selectedInterface'

interface InterfaceSelectorProps {
	technology: string
}

const InterfaceSelector: FunctionComponent<InterfaceSelectorProps> = ({
	technology,
}: InterfaceSelectorProps) => {
	const { selectedIntegration } = useContext<ISelectedIntegrationContext>(
		SelectedIntegrationContext,
	)
	const { setSelectedInterface } = useContext<ISelectedInterfaceContext>(SelectedInterfaceContext)
	const [filteredInterfaces, setFilteredInterfaces] = useState<InterfaceType[]>([])

	useEffect(() => {
		setFilteredInterfaces(selectedIntegration?.interfaces.interfaceList || [])
	}, [technology, selectedIntegration])

	// FIXME Warning: Encountered two children with the same key, `integration6`. Keys should be unique so that components maintain their identity across updates. Non-unique keys may cause children to be duplicated and/or omitted — the behavior is unsupported and could change in a future version.
	// at select
	// at IntegrationSelector
	// at div
	// at App
	// Noted that the key is different from time to time (not only for id=6)
	return (
		<select
			onChange={(e) => {
				setSelectedInterface(
					selectedIntegration?.interfaces.interfaceList.filter(
						(techInterface) => techInterface.interfaceId === e.target.value,
					)[0] || null,
				)
			}}
			defaultValue="default"
		>
			{filteredInterfaces.map((techInterface) => (
				<option
					key={`interface${techInterface.interfaceId}`}
					value={techInterface.interfaceId}
				>
					{techInterface.interfaceName || 'Untitled Interface'}
				</option>
			))}
			<option value="default" hidden>
				Select interface...
			</option>
		</select>
	)
}

export default InterfaceSelector
