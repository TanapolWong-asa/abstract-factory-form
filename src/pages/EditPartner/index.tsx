import React, { ReactNode, useCallback, useContext, useEffect, useState } from 'react'

import {
	ISelectedIntegrationContext,
	SelectedIntegrationContext,
} from '../../stores/selectedIntegration'
import ConnectionForm from './FormFactory/ConnectionForm/ConnectionForm'
import { FormFactory } from './FormFactory/FormFactory'
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

	const setFormByStage = useCallback(() => {
		switch (stage) {
			case 1:
				setForm(formFactory.createIntegrationForm())
				break
			case 2:
				setForm(formFactory.createInterfaceForm())
				break
			case 3:
				setForm(formFactory.createConnectionForm())
				break
			default:
				setForm(<div>NOT VALID STAGE</div>)
				break
		}
	}, [stage, formFactory])

	useEffect(() => {
		setFormByStage()
	}, [stage, formFactory, setFormByStage])

	useEffect(() => {
		setStage(1)
	}, [selectedIntegration?.integrationId])

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
