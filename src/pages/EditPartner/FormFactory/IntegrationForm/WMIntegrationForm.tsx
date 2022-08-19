/* eslint-disable react-hooks/exhaustive-deps */
import React, { useCallback, useContext, useEffect } from 'react'
import { useForm } from 'react-hook-form'

import { IWMIntegrationData, IWMIntegrationFormData } from '../../../../interfaces'
import { IIntegrationsContext, IntegrationsContext } from '../../../../stores/intergrations'
import {
	ISelectedIntegrationContext,
	SelectedIntegrationContext,
} from '../../../../stores/selectedIntegration'
import { InputType, RenderFormItemByType } from '../../Form'
import IntegrationForm from './IntegrationForm'

class WMIntegrationForm extends IntegrationForm {
	public generateIntegrationDraftKey(): string {
		const {
			partnerId,
			selectedIntegration: { integrationId },
		} = this.context as ISelectedIntegrationContext
		return `${partnerId}-${integrationId}-WMIntegrationDraft` // Recommended draft key pattern
	}

	render() {
		return <Form saveDraft={this.saveDraft} readDraft={this.readDraft} />
	}
}

export default WMIntegrationForm

interface FormProps {
	saveDraft: (content: string) => void
	readDraft: () => string | null
}
const Form: React.FC<FormProps> = ({ saveDraft, readDraft }) => {
	const { selectedIntegration, setSelectedIntegration } = useContext<ISelectedIntegrationContext>(
		SelectedIntegrationContext,
	)
	const { setIntegrations } = useContext<IIntegrationsContext>(IntegrationsContext)

	const { register, setValue, getValues, formState, trigger } = useForm<IWMIntegrationFormData>()
	const formList = [
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
	const getKeyValue =
		<T extends object, U extends keyof T>(obj: T) =>
		(key: U) =>
			obj[key]

	const resetForm = useCallback(() => {
		const isDirty = selectedIntegration.isDirty || selectedIntegration.hasError
		if (isDirty === true) {
			trigger()
		} else {
			formState.errors = {}
			formState.isDirty = false
		}
	}, [selectedIntegration])
	useEffect(() => resetForm(), [resetForm])

	// 'merge' draft data and form data together (drafted data have higher priority)
	const preprocessIntegrationInfoFormData = (
		selectedIntegration: IWMIntegrationData,
	): IWMIntegrationFormData => {
		const draft = JSON.parse(readDraft() || '{}')
		const allDirtyFields = {
			...selectedIntegration.dirtyFields,
			...(draft as any)['dirtyFields'],
		}

		const processedFormData: IWMIntegrationFormData = {
			technology: selectedIntegration.technology,
			integrationName:
				(draft as any)['integrationName'] || selectedIntegration.integrationName,
			isDirty: selectedIntegration.isDirty || false,
			hasError: selectedIntegration.hasError || false,
			dirtyFields: allDirtyFields,
		}
		saveDraft(JSON.stringify(processedFormData))

		return processedFormData
	}

	// set form data to be draft data (first time only)
	useEffect(() => {
		updateSelectedIntegration(
			preprocessIntegrationInfoFormData(selectedIntegration as IWMIntegrationData),
		)
	}, [])

	// update form fields on UI
	useEffect(() => {
		const integrationInfoFormData: IWMIntegrationFormData = preprocessIntegrationInfoFormData(
			selectedIntegration as IWMIntegrationData,
		)
		const keys = Object.keys(integrationInfoFormData)
		formList.forEach((item: { formItemName: string; defaultValue: string }) => {
			keys.forEach((key: any) => {
				if (key === item.formItemName) {
					const value: string = getKeyValue(integrationInfoFormData)(key)
					const k = item.formItemName as keyof IWMIntegrationFormData
					setValue(k, value || item.defaultValue)
				}
			})
		})
		resetForm()
	}, [selectedIntegration])

	// update selectedIntegration in context
	const updateSelectedIntegration = (integrationFormData: IWMIntegrationFormData) => {
		const draft = JSON.parse(readDraft() || '{}')
		const allDirtyFields = {
			...(integrationFormData.dirtyFields || {}),
			...(draft as any)['dirtyFields'],
		}

		const hasError = Object.keys(formState.errors).length !== 0
		const newErrorFields = Object.keys(formState.errors) || []
		const newDirtyFields = {
			...selectedIntegration.dirtyFields,
			...formState.dirtyFields,
			...allDirtyFields,
		}
		const updatedWMIntegrationData: IWMIntegrationData = {
			...(selectedIntegration as IWMIntegrationData),
			integrationName: integrationFormData.integrationName,
			isDirty: true,
			hasError,
			dirtyFields: newDirtyFields,
			errorFields: newErrorFields,
		}
		saveDraft(JSON.stringify(integrationFormData))

		// Need to update these 2 separately since selectedIntegration store copy of the integration from integrations list
		// save new data to selected integration
		setSelectedIntegration(updatedWMIntegrationData)
		// save new data to integration list (for dropdown selector UI)
		setIntegrations((integrations) =>
			integrations.map((integration) => {
				if (integration.integrationId === selectedIntegration.integrationId) {
					return updatedWMIntegrationData
				}
				return integration
			}),
		)
	}

	return (
		<form
			onChange={() => {
				trigger()
				updateSelectedIntegration(getValues())
			}}
		>
			{formList.map((formItem: any) => {
				const inputType = formItem.inputType as InputType
				return (
					<RenderFormItemByType
						register={register}
						formItemName={formItem.formItemName}
						key={formItem.id}
						className="mb-2"
						inputType={inputType}
						options={formItem.options}
						label={formItem.label}
						formState={formState}
						required={formItem.required}
						regex={formItem.regex}
						disabled={formItem.disabled}
						errorMessage={formItem.errorMessage}
						dirtyFields={selectedIntegration.dirtyFields}
					/>
				)
			})}
		</form>
	)
}
