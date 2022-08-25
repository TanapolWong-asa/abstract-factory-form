/* eslint-disable class-methods-use-this */
import React from 'react'

import {
	ISelectedIntegrationAndSelectedInterfaceContext,
	SelectedIntegrationAndSelectedInterfaceContext,
	SelectedIntegrationAndSelectedInterfaceProvider,
} from '../../../../stores/combinedStore/integrationAndInterface'
import { FormItem } from '../../Form/interfaces'
import { InterfaceFormType, ReusableInterfaceForm } from '../../Form/reusableForm'
import { IATInterfaceData, IATInterfaceFormData, InterfaceDataType } from '../../interfaces'
import InterfaceForm from './InterfaceForm'

const ATInterfaceForm = () => (
	<SelectedIntegrationAndSelectedInterfaceProvider>
		<ATInterfaceFormInner />
	</SelectedIntegrationAndSelectedInterfaceProvider>
)
class ATInterfaceFormInner extends InterfaceForm {
	protected preprocessInterfaceInfoFormData(
		selectedInterface: InterfaceDataType | null,
	): InterfaceFormType {
		if (selectedInterface === null) {
			return {
				jobType: '',
				notes: '',
				interfaceName: '',
				isDirty: false,
				hasError: true,
				dirtyFields: {},
			}
		}
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
				disabled: false,
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
		// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
		const { partnerId, selectedIntegration } = (
			this.context as ISelectedIntegrationAndSelectedInterfaceContext
		).selectedIntegrationContext!
		// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
		const { selectedInterface } = (
			this.context as ISelectedIntegrationAndSelectedInterfaceContext
		).selectedInterfaceContext!
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
		// In case of real AT interface form, we'll have connection form here as well.
	}
}
ATInterfaceFormInner.contextType = SelectedIntegrationAndSelectedInterfaceContext

export default ATInterfaceForm
