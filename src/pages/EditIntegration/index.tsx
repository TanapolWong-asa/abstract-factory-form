import React, { ReactNode, useContext, useEffect, useState } from 'react'

import {
	ISelectedConnectionsContext,
	SelectedConnectionsContext,
} from '../../stores/selectedConnections'
import {
	ISelectedIntegrationContext,
	SelectedIntegrationContext,
} from '../../stores/selectedIntegration'
import { ISelectedInterfaceContext, SelectedInterfaceContext } from '../../stores/selectedInterface'
import ConnectionForm from './FormFactory/ConnectionForm/ConnectionForm'
import FormFactory from './FormFactory/FormFactory'
import IntegrationForm from './FormFactory/IntegrationForm/IntegrationForm'
import InterfaceForm from './FormFactory/InterfaceForm/InterfaceForm'

interface EditPartnerProps {
	formFactory: FormFactory
	stage: number
	setStage: React.Dispatch<React.SetStateAction<number>>
}

const EditIntegration: React.FC<EditPartnerProps> = ({
	formFactory,
	stage,
	setStage,
}: EditPartnerProps) => {
	const [form, setForm] = useState<IntegrationForm | InterfaceForm | ConnectionForm | ReactNode>(
		null,
	)
	const { selectedIntegration } = useContext<ISelectedIntegrationContext>(
		SelectedIntegrationContext,
	)
	const { selectedInterface, setSelectedInterface } =
		useContext<ISelectedInterfaceContext>(SelectedInterfaceContext)
	const { setSelectedConnections } = useContext<ISelectedConnectionsContext>(
		SelectedConnectionsContext,
	)

	useEffect(() => {
		switch (stage) {
			case 1:
				if (!selectedIntegration) setForm(<div>Select an integration</div>)
				else setForm(formFactory.createIntegrationForm())
				break
			case 2:
				if (!selectedInterface) setForm(<div>Select an interface</div>)
				else setForm(formFactory.createInterfaceForm())
				break
			case 3:
				setForm(formFactory.createConnectionForm())
				break
			default:
				setForm(<div>NOT VALID STAGE</div>)
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [stage, formFactory, selectedIntegration?.integrationId, selectedInterface?.interfaceId])

	useEffect(() => {
		setStage(1)
		setSelectedInterface(null)
		setSelectedConnections([])
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [selectedIntegration?.integrationId, formFactory])
	useEffect(() => {
		if (selectedInterface) {
			setStage(2)
			setSelectedConnections([])
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [selectedInterface?.interfaceId, formFactory])

	const NextButton = () => (
		<button
			type="button"
			onClick={() => {
				if (stage === 2 && selectedInterface === null) return

				setStage(stage + 1)
			}}
		>
			Next Stage
		</button>
	)

	const BackButton = () => (
		<button
			type="button"
			onClick={() => {
				setStage(stage - 1)
			}}
		>
			Prev Stage
		</button>
	)

	const SubmitButton = () => (
		<button
			type="button"
			onClick={() => {
				// eslint-disable-next-line no-alert
				alert(JSON.stringify(selectedIntegration))
			}}
		>
			Submit
		</button>
	)

	return (
		<div>
			<>
				Edit Partner
				{form}
				{stage > 1 && <BackButton />}
				{stage < 3 && <NextButton />}
				{stage === 3 && <SubmitButton />}
				<CurrentFormData />
			</>
		</div>
	)
}

export default EditIntegration

const CurrentFormData = () => {
	const { selectedIntegration } = useContext<ISelectedIntegrationContext>(
		SelectedIntegrationContext,
	)
	const { selectedInterface } = useContext<ISelectedInterfaceContext>(SelectedInterfaceContext)
	const { selectedConnections } = useContext<ISelectedConnectionsContext>(
		SelectedConnectionsContext,
	)

	return (
		<div>
			<p>{JSON.stringify(selectedIntegration)}</p>
			<p>{JSON.stringify(selectedInterface)}</p>
			<p>{JSON.stringify(selectedConnections)}</p>
		</div>
	)
}
