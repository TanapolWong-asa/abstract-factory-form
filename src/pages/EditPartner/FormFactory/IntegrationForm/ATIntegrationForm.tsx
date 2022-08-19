/* eslint-disable class-methods-use-this */
import React from 'react'

import { IATIntegrationFormData } from '../../../../interfaces'
import { ISelectedIntegrationContext } from '../../../../stores/selectedIntegration'
import ReusableForm, { IntegrationDataType } from '../../Form/reusableForm'
import IntegrationForm from './IntegrationForm'

class ATIntegrationForm extends IntegrationForm {
	public generateIntegrationDraftKey(): string {
		const { partnerId, selectedIntegration } = this.context as ISelectedIntegrationContext
		return `${partnerId}-${selectedIntegration?.integrationId}-ATIntegrationDraft` // Recommended draft key pattern
	}

	render() {
		return (
			<ReusableForm
				saveDraft={this.saveDraft}
				readDraft={this.readDraft}
				formList={[
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
				]}
				preprocessFormData={(
					selectedIntegration: IntegrationDataType,
				): IATIntegrationFormData => {
					const draft = JSON.parse(this.readDraft() || '{}')
					const allDirtyFields = {
						...selectedIntegration.dirtyFields,
						...(draft as any)['dirtyFields'],
					}

					const processedFormData: IATIntegrationFormData = {
						technology: selectedIntegration.technology,
						integrationName:
							(draft as any)['integrationName'] ||
							selectedIntegration.integrationName,
						isDirty: selectedIntegration.isDirty || false,
						hasError: selectedIntegration.hasError || false,
						dirtyFields: allDirtyFields,
					}
					this.saveDraft(JSON.stringify(processedFormData))

					return processedFormData
				}}
			/>
		)
	}
}

export default ATIntegrationForm
