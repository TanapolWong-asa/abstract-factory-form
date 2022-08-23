// eslint-disable-next-line @typescript-eslint/no-unused-vars
import React from 'react'

import { ISelectedIntegrationContext } from '../../../../stores/selectedIntegration'
import { ISelectedInterfaceContext } from '../../../../stores/selectedInterface'
import { FormItem } from '../../Form/interfaces'
import { InterfaceFormType } from '../../Form/reusableForm'
import { InterfaceType } from '../../interfaces'
import DraftableForm, { DraftableFormProps, DraftableFormStates } from '../DraftableForm'

interface InterfaceFormProps extends DraftableFormProps {
	selectedIntegrationContext: ISelectedIntegrationContext
	selectedInterfaceContext: ISelectedInterfaceContext
}
interface InterfaceFormStates extends DraftableFormStates {
	selectedIntegrationContext: ISelectedIntegrationContext
	selectedInterfaceContext: ISelectedInterfaceContext
}
abstract class InterfaceForm extends DraftableForm<InterfaceFormProps, InterfaceFormStates> {
	protected currentStage = 2

	constructor(props: any) {
		super(props)
		this.preprocessInterfaceInfoFormData = this.preprocessInterfaceInfoFormData.bind(this)
		this.generateFormList = this.generateFormList.bind(this)
	}

	protected abstract preprocessInterfaceInfoFormData(
		selectedInterface: InterfaceType,
	): InterfaceFormType

	protected abstract generateFormList(): FormItem[]
}

export default InterfaceForm
