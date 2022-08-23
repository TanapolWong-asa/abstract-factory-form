import React, { ReactNode, useContext, useEffect, useState } from 'react'

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
}

const EditPartner: React.FC<EditPartnerProps> = ({ formFactory }: EditPartnerProps) => {
	const [stage, setStage] = useState<number>(1)
	const [form, setForm] = useState<IntegrationForm | InterfaceForm | ConnectionForm | ReactNode>(
		null,
	)
	const { selectedIntegration } = useContext<ISelectedIntegrationContext>(
		SelectedIntegrationContext,
	)
	const { selectedInterface } = useContext<ISelectedInterfaceContext>(SelectedInterfaceContext)

	// FIXME: Cause error when render some form when data is null (to reproduce: select tech -> select int -> select inf -> select tech)
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
	}, [selectedIntegration])
	useEffect(() => {
		if (selectedInterface) setStage(2)
	}, [selectedInterface])

	const NextButton = () => (
		<button
			type="button"
			onClick={() => {
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

	return (
		<div>
			<>
				Edit Partner
				{form}
				{stage > 1 ? <BackButton /> : null}
				{stage < 3 ? <NextButton /> : null}
			</>
		</div>
	)
}

export default EditPartner
