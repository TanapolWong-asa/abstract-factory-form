// eslint-disable-next-line @typescript-eslint/no-unused-vars
import React from 'react'

import { SelectedIntegrationContext } from '../../../../stores/selectedIntegration'
import { FormItem } from '../../Form/interfaces'
import { IIntegrationFormData, IntegrationType } from '../../interfaces'
import DraftableForm from '../DraftableForm'

interface IntegrationFormProps {}
interface IntegrationFormStates {}
abstract class IntegrationForm extends DraftableForm<IntegrationFormProps, IntegrationFormStates> {
	protected currentStage = 1 // might be useless

	constructor(props: any) {
		super(props)
		this.preprocessIntegrationInfoFormData = this.preprocessIntegrationInfoFormData.bind(this)
		this.generateFormList = this.generateFormList.bind(this)
	}

	protected abstract preprocessIntegrationInfoFormData(
		selectedIntegration: IntegrationType,
	): IIntegrationFormData

	protected abstract generateFormList(): FormItem[]
}
IntegrationForm.contextType = SelectedIntegrationContext

export default IntegrationForm
