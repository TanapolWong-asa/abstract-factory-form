import './App.css'

import React, { useContext, useEffect, useState } from 'react'

import { IntegrationSelector, InterfaceSelector, TechnologySelector } from './components'
import { EditIntegration } from './pages'
import ATFormFactory from './pages/EditIntegration/FormFactory/ATFormFactory'
import FormFactory from './pages/EditIntegration/FormFactory/FormFactory'
import WMFormFactory from './pages/EditIntegration/FormFactory/WMFormFactory'
import { ConnectionsContext, IConnectionsContext } from './stores/connections'
import { AT_CONNETIONS, WM_CONNECTIONS } from './stores/mockData'
import {
	ISelectedConnectionsContext,
	SelectedConnectionsContext,
} from './stores/selectedConnections'
import {
	ISelectedIntegrationContext,
	SelectedIntegrationContext,
} from './stores/selectedIntegration'
import { ISelectedInterfaceContext, SelectedInterfaceContext } from './stores/selectedInterface'

export enum Technology {
	WM = 'WM',
	AT = 'AT',
}

const App = () => {
	const [technology, setTechnology] = useState<string>('')
	const [formFactory, setFormFactory] = useState<FormFactory>()
	const [stage, setStage] = useState<number>(1)

	const { selectedIntegration, setSelectedIntegration } = useContext<ISelectedIntegrationContext>(
		SelectedIntegrationContext,
	)
	const { setSelectedInterface } = useContext<ISelectedInterfaceContext>(SelectedInterfaceContext)
	const { setSelectedConnections } = useContext<ISelectedConnectionsContext>(
		SelectedConnectionsContext,
	)
	const { setConnections } = useContext<IConnectionsContext>(ConnectionsContext)

	useEffect(() => {
		if (technology === Technology.WM) {
			setConnections(WM_CONNECTIONS) // connection type must be switch according to technology
			setFormFactory(new WMFormFactory(setStage))
		} else if (technology === Technology.AT) {
			setConnections(AT_CONNETIONS)
			setFormFactory(new ATFormFactory(setStage))
		}
		setSelectedIntegration(null)
		setSelectedInterface(null)
		setSelectedConnections([])
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [technology])

	return (
		<div className="App">
			<TechnologySelector
				technologies={Object.keys(Technology)}
				setTechnology={setTechnology}
			/>
			{technology !== '' && <IntegrationSelector technology={technology} />}
			{selectedIntegration && <InterfaceSelector technology={technology} />}
			{formFactory && (
				<EditIntegration formFactory={formFactory} stage={stage} setStage={setStage} />
			)}
		</div>
	)
}

export default App
