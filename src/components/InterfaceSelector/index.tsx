import React, { FunctionComponent, useContext, useEffect, useState } from 'react'

import { InterfaceDataType } from '../../pages/EditIntegration/interfaces'
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
	const [filteredInterfaces, setFilteredInterfaces] = useState<InterfaceDataType[]>([])

	useEffect(() => {
		setFilteredInterfaces(selectedIntegration?.interfaces.interfaceList || [])
	}, [technology, selectedIntegration])

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
