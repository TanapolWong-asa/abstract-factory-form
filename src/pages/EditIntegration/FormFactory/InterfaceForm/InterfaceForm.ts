// eslint-disable-next-line @typescript-eslint/no-unused-vars
import React from 'react'

import { FormItem } from '../../Form/interfaces'
import { InterfaceFormType } from '../../Form/reusableForm'
import { InterfaceDataType } from '../../interfaces'
import DraftableForm, { DraftableFormProps, DraftableFormStates } from '../DraftableForm'

interface InterfaceFormProps extends DraftableFormProps {
	setStage: React.Dispatch<React.SetStateAction<number>>
}
interface InterfaceFormStates extends DraftableFormStates {
	setStage: React.Dispatch<React.SetStateAction<number>>
}
abstract class InterfaceForm extends DraftableForm<InterfaceFormProps, InterfaceFormStates> {
	constructor(props: InterfaceFormProps) {
		super(props)
		this.state = {
			setStage: props.setStage,
		}
		this.preprocessInterfaceInfoFormData = this.preprocessInterfaceInfoFormData.bind(this)
		this.generateFormList = this.generateFormList.bind(this)
	}

	protected abstract preprocessInterfaceInfoFormData(
		selectedInterface: InterfaceDataType | null,
	): InterfaceFormType

	protected abstract generateFormList(): FormItem[]
}

export default InterfaceForm
