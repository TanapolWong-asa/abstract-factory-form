// eslint-disable-next-line @typescript-eslint/no-unused-vars
import React from 'react'

import { FormItem } from '../../Form/interfaces'
import { InterfaceFormType } from '../../Form/reusableForm'
import { InterfaceType } from '../../interfaces'
import DraftableForm from '../DraftableForm'

abstract class InterfaceForm extends DraftableForm {
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
