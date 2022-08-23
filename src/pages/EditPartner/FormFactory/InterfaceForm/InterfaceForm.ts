// eslint-disable-next-line @typescript-eslint/no-unused-vars
import React from 'react'

import { FormItem } from '../../Form/interfaces'
import { InterfaceFormType } from '../../Form/reusableForm'
import { InterfaceType } from '../../interfaces'
import DraftableForm, { DraftableFormProps, DraftableFormStates } from '../DraftableForm'

interface InterfaceFormProps extends DraftableFormProps {}
interface InterfaceFormStates extends DraftableFormStates {}
abstract class InterfaceForm extends DraftableForm<InterfaceFormProps, InterfaceFormStates> {
	protected currentStage = 2

	constructor(props: InterfaceFormProps) {
		super(props)
		this.preprocessInterfaceInfoFormData = this.preprocessInterfaceInfoFormData.bind(this)
		this.generateFormList = this.generateFormList.bind(this)
	}

	protected abstract preprocessInterfaceInfoFormData(
		selectedInterface: InterfaceType | null,
	): InterfaceFormType

	protected abstract generateFormList(): FormItem[]
}

export default InterfaceForm
