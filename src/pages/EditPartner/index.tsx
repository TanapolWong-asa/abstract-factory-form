import React, { ReactNode, useEffect, useState } from 'react'

import { FormFactory } from './FormFactory/FormFactory'

interface EditPartnerProps {
	formFactory: FormFactory
}

const EditPartner: React.FC<EditPartnerProps> = ({ formFactory }: EditPartnerProps) => {
	const [stage, setStage] = useState<number>(1)
	const [form, setForm] = useState<ReactNode>(null)

	useEffect(() => {
		setFormByStage()
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [stage, formFactory])

	const setFormByStage = () => {
		if (stage === 1) setForm(formFactory.createIntegrationForm().render())
		else if (stage === 2) setForm(formFactory.createInterfaceForm().render())
		else if (stage === 3) setForm(formFactory.createConnectionForm().render())
		else setForm(<div>NOT VALID STAGE</div>)
	}

	return (
		<div>
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
		</div>
	)
}

export default EditPartner
