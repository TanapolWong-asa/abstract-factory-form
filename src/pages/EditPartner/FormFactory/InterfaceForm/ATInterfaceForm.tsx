/* eslint-disable class-methods-use-this */
import React, { useContext } from 'react'

import {
	ISelectedIntegrationContext,
	SelectedIntegrationContext,
} from '../../../../stores/selectedIntegration'
import {
	ISelectedInterfaceContext,
	SelectedInterfaceContext,
} from '../../../../stores/selectedInterface'
import { FormItem } from '../../Form/interfaces'
import { InterfaceFormType, ReusableInterfaceForm } from '../../Form/reusableForm'
import { IATInterfaceData, IATInterfaceFormData, InterfaceType } from '../../interfaces'
import InterfaceForm from './InterfaceForm'

const ATInterfaceForm = () => {
	const selectedIntegrationContext = useContext<ISelectedIntegrationContext>(
		SelectedIntegrationContext,
	)
	const selectedInterfaceContext = useContext<ISelectedInterfaceContext>(SelectedInterfaceContext)

	return (
		<ATInterfaceFormInner
			selectedIntegrationContext={selectedIntegrationContext}
			selectedInterfaceContext={selectedInterfaceContext}
		/>
	)
}
class ATInterfaceFormInner extends InterfaceForm {
	constructor(props: any) {
		super(props)
		this.state = {
			selectedIntegrationContext: props.selectedIntegrationContext,
			selectedInterfaceContext: props.selectedInterfaceContext,
		}
	}

	protected preprocessInterfaceInfoFormData(selectedInterface: InterfaceType): InterfaceFormType {
		const selectedATInterface = selectedInterface as IATInterfaceData
		const draft = JSON.parse(this.readDraft() || '{}')
		const allDirtyFields = {
			...selectedATInterface.dirtyFields,
			...(draft as any)['dirtyFields'],
		}

		const processedFormData: IATInterfaceFormData = {
			jobType: (draft as any)['jobType'] || selectedATInterface.jobType,
			notes: (draft as any)['notes'] || selectedATInterface.notes,
			interfaceName: (draft as any)['interfaceName'] || selectedATInterface.interfaceName,
			isDirty: selectedATInterface.isDirty || false,
			hasError: selectedATInterface.hasError || false,
			dirtyFields: allDirtyFields,
		}
		this.saveDraft(JSON.stringify(processedFormData))

		return processedFormData
	}

	protected generateFormList(): FormItem[] {
		return [
			{
				id: 1,
				inputType: 'text',
				label: 'Interface Name',
				formItemName: 'interfaceName',
				defaultValue: '',
				required: true,
				disabled: true,
				regex: /./i,
				errorMessage: 'This is a required Field.',
			},
			{
				id: 2,
				inputType: 'text',
				label: 'Job type',
				formItemName: 'jobType',
				defaultValue: '',
				required: true,
				disabled: false,
				regex: /./i,
				errorMessage: 'This is a required Field.',
			},
			{
				id: 3,
				inputType: 'textarea',
				label: 'Monitoring Note',
				formItemName: 'notes',
				defaultValue: '',
				required: true,
				disabled: false,
				regex: /./i,
				errorMessage: 'This is a required Field.',
			},
		]
	}

	public generateDraftKey(): string {
		const { partnerId, selectedIntegration } = this.state
			.selectedIntegrationContext as ISelectedIntegrationContext
		const { selectedInterface } = this.state
			.selectedInterfaceContext as ISelectedInterfaceContext
		return `${partnerId}-${selectedIntegration?.integrationId}-${selectedInterface?.interfaceId}-ATInterfaceDraft` // Recommended draft key pattern
	}

	render() {
		return (
			<ReusableInterfaceForm
				saveDraft={this.saveDraft}
				readDraft={this.readDraft}
				formList={this.generateFormList()}
				preprocessInterfaceInfoFormData={this.preprocessInterfaceInfoFormData}
			/>
		)
	}
}

export default ATInterfaceForm
