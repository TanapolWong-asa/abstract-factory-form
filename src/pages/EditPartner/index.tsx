import React, { ReactNode, useEffect, useState } from 'react'

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

	useEffect(() => {
		setFormByStage()
	}, [stage, formFactory])

	const setFormByStage = () => {
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
	}

	return (
		<div>
			<>
				Edit Partner
				{form}
				<button
					type="button"
					onClick={() => {
						if (stage >= 3) {
							setStage(1)
						} else {
							setStage(stage + 1)
						}
					}}
				>
					Next Stage
				</button>
			</>
		</div>
	)
}

export default EditPartner
