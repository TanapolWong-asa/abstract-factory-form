/* eslint-disable class-methods-use-this */
/* eslint-disable react-hooks/exhaustive-deps */
import React from 'react'

import { ISelectedIntegrationContext } from '../../../../stores/selectedIntegration'
import { FormItem } from '../../Form/interfaces'
import ReusableForm from '../../Form/reusableForm'
import { IntegrationType, IWMIntegrationData, IWMIntegrationFormData } from '../../interfaces'
import IntegrationForm from './IntegrationForm'

class WMIntegrationForm extends IntegrationForm {
	// Use this function to get formList
	//
	// You could argue that this function act more like a constant and you would be correct
	// But since each IntegrationForm may has different form list,There's no way we can enforce the subclass to generate a new list if we use variable
	protected generateFormList(): FormItem[] {
		return [
			{
				id: 1,
				inputType: 'text',
				label: 'Technology',
				formItemName: 'technology',
				defaultValue: 'WM',
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
		]
	}

	// This function will be use to generate draft key to use internally with saveDraft() and readDraft()
	//
	// in case we want to refactor the way specified above render() function...
	// this generateDraftKey will take 2 parameters: partnerId, integrationId
	// When we'd like to change the parameter list, every caller must be edit as well which will cause cascading change
	// While we stick to this no parameter way, we can use the context to get the data and the 'API' would still looks the same to caller
	public generateIntegrationDraftKey(): string {
		const { partnerId, selectedIntegration } = this.context as ISelectedIntegrationContext
		return `${partnerId}-${selectedIntegration?.integrationId}-WMIntegrationDraft` // Recommended draft key pattern
	}

	// This function will merge draft with fetched data (draft data get higher priority)
	protected preprocessIntegrationInfoFormData(
		selectedIntegration: IntegrationType,
	): IWMIntegrationFormData {
		const selectedWMIntegration = selectedIntegration as IWMIntegrationData
		const draft = JSON.parse(this.readDraft() || '{}')
		const allDirtyFields = {
			...selectedWMIntegration.dirtyFields,
			...(draft as any)['dirtyFields'],
		}

		const processedFormData: IWMIntegrationFormData = {
			technology: selectedWMIntegration.technology,
			integrationName:
				(draft as any)['integrationName'] || selectedWMIntegration.integrationName,
			isDirty: selectedWMIntegration.isDirty || false,
			hasError: selectedWMIntegration.hasError || false,
			dirtyFields: allDirtyFields,
		}
		this.saveDraft(JSON.stringify(processedFormData))

		return processedFormData
	}

	// At this point you might see that it will make more sense to return ReusableForm from XXFormFactory level and change this component to be a simple logic component (not extended from react)
	// The problem is if we do so, we won't be able to use context in this class and will make implementation of abstract method harder.
	// Also, we might need to re-design lots of function parameters+interfaces
	render() {
		return (
			<ReusableForm
				saveDraft={this.saveDraft}
				readDraft={this.readDraft}
				formList={this.generateFormList()}
				preprocessFormData={this.preprocessIntegrationInfoFormData}
			/>
		)
	}
}

export default WMIntegrationForm
