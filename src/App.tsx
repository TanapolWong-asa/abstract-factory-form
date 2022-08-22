import './App.css'

import React, { useContext, useEffect, useState } from 'react'

import { IntegrationSelector, InterfaceSelector, TechnologySelector } from './components'
import { EditPartner } from './pages'
import { ATFormFactory, FormFactory, WMFormFactory } from './pages/EditPartner/FormFactory'
import {
	ISelectedIntegrationContext,
	SelectedIntegrationContext,
} from './stores/selectedIntegration'

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

	useEffect(() => {
		if (technology === Technology.WM) {
			setFormFactory(new WMFormFactory())
		} else if (technology === Technology.AT) {
			setFormFactory(new ATFormFactory())
		}
		setSelectedIntegration(null)
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
			{formFactory && selectedIntegration ? (
				<EditPartner formFactory={formFactory} />
			) : (
				<div>Select your integration from dropdown</div>
			)}
		</div>
	)
}

export default App
