// eslint-disable-next-line @typescript-eslint/no-unused-vars
import React from 'react'

import { SelectedIntegrationContext } from '../../../../stores/selectedIntegration'
import { FormItem } from '../../Form/interfaces'
import { IIntegrationFormData, IntegrationDataType } from '../../interfaces'
import DraftableForm from '../DraftableForm'

interface IntegrationFormProps {
	setStage: React.Dispatch<React.SetStateAction<number>>
}
interface IntegrationFormStates {
	setStage: React.Dispatch<React.SetStateAction<number>>
}
abstract class IntegrationForm extends DraftableForm<IntegrationFormProps, IntegrationFormStates> {
	constructor(props: IntegrationFormProps) {
		super(props)
		this.state = {
			setStage: props.setStage,
		}
		this.preprocessIntegrationInfoFormData = this.preprocessIntegrationInfoFormData.bind(this)
		this.generateFormList = this.generateFormList.bind(this)
	}

	protected abstract preprocessIntegrationInfoFormData(
		selectedIntegration: IntegrationDataType | null,
	): IIntegrationFormData

	protected abstract generateFormList(): FormItem[]
}
IntegrationForm.contextType = SelectedIntegrationContext

export default IntegrationForm
