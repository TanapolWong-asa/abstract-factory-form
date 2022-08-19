// eslint-disable-next-line @typescript-eslint/no-unused-vars
import React from 'react'

import { SelectedIntegrationContext } from '../../../../stores/selectedIntegration'
import { FormItem } from '../../Form/interfaces'
import { IntegrationDataType } from '../../Form/reusableForm'
import { IIntegrationFormData } from '../../interfaces'
import DraftableForm from '../DraftableForm'

abstract class IntegrationForm extends DraftableForm {
	protected currentStage = 1 // might be useless

	constructor(props: any) {
		super(props)
		this.preprocessIntegrationInfoFormData = this.preprocessIntegrationInfoFormData.bind(this)
		this.generateFormList = this.generateFormList.bind(this)
	}

	protected abstract preprocessIntegrationInfoFormData(
		selectedIntegration: IntegrationDataType,
	): IIntegrationFormData

	protected abstract generateFormList(): FormItem[]
}
IntegrationForm.contextType = SelectedIntegrationContext

export default IntegrationForm
