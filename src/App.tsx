import './App.css'

import React, { useContext, useEffect, useState } from 'react'

import { IntegrationSelector, InterfaceSelector, TechnologySelector } from './components'
import { EditPartner } from './pages'
import ATFormFactory from './pages/EditPartner/FormFactory/ATFormFactory'
import FormFactory from './pages/EditPartner/FormFactory/FormFactory'
import WMFormFactory from './pages/EditPartner/FormFactory/WMFormFactory'
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
	const { selectedIntegration, setSelectedIntegration } = useContext<ISelectedIntegrationContext>(
		SelectedIntegrationContext,
	)
	const { setSelectedInterface } = useContext<ISelectedInterfaceContext>(SelectedInterfaceContext)

	useEffect(() => {
		if (technology === Technology.WM) {
			setFormFactory(new WMFormFactory())
		} else if (technology === Technology.AT) {
			setFormFactory(new ATFormFactory())
		}
		setSelectedIntegration(null)
		setSelectedInterface(null)
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
			{formFactory && <EditPartner formFactory={formFactory} />}
		</div>
	)
}

export default App
