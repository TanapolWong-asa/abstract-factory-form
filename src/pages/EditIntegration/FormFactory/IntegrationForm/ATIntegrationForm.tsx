/* eslint-disable class-methods-use-this */
import React from 'react'

import { ISelectedIntegrationContext } from '../../../../stores/selectedIntegration'
import { FormItem } from '../../Form/interfaces'
import { ReusableIntegrationForm } from '../../Form/reusableForm'
import { IATIntegrationData, IATIntegrationFormData, IntegrationDataType } from '../../interfaces'
import IntegrationForm from './IntegrationForm'

class ATIntegrationForm extends IntegrationForm {
	protected preprocessIntegrationInfoFormData(
		selectedIntegration: IntegrationDataType | null,
	): IATIntegrationFormData {
		if (selectedIntegration === null) {
			return {
				technology: '',
				integrationName: '',
				businessLine: '',
				isDirty: false,
				hasError: true,
				dirtyFields: {},
			}
		}
		const selectedATIntegration = selectedIntegration as IATIntegrationData
		const draft = JSON.parse(this.readDraft() || '{}')
		const allDirtyFields = {
			...selectedATIntegration.dirtyFields,
			...(draft as any)['dirtyFields'],
		}

		const processedFormData: IATIntegrationFormData = {
			technology: selectedATIntegration.technology,
			integrationName:
				(draft as any)['integrationName'] || selectedATIntegration.integrationName,
			businessLine: (draft as any)['businessLine'] || selectedATIntegration.businessLine,

			isDirty: selectedATIntegration.isDirty || false,
			hasError: selectedATIntegration.hasError || false,
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
				label: 'Technology',
				formItemName: 'technology',
				defaultValue: 'AT',
				required: true,
				disabled: true,
				regex: /./i,
				errorMessage: 'This is a required Field.',
			},
			{
				id: 2,
				inputType: 'text',
				label: 'Integration Name',
				formItemName: 'integrationName',
				defaultValue: '',
				required: true,
				disabled: false,
				regex: /./i,
				errorMessage: 'This is a required Field.',
			},
			{
				id: 3,
				inputType: 'text',
				label: 'Business Line',
				formItemName: 'businessLine',
				defaultValue: '',
				required: true,
				disabled: false,
				regex: /./i,
				errorMessage: 'This is a required Field.',
			},
		]
	}

	public generateDraftKey(): string {
		const { partnerId, selectedIntegration } = this.context as ISelectedIntegrationContext
		return `${partnerId}-${selectedIntegration?.integrationId}-ATIntegrationDraft` // Recommended draft key pattern
	}

	render() {
		return (
			<ReusableIntegrationForm
				saveDraft={this.saveDraft}
				readDraft={this.readDraft}
				formList={this.generateFormList()}
				preprocessIntegrationInfoFormData={this.preprocessIntegrationInfoFormData}
			/>
		)
	}
}

export default ATIntegrationForm
