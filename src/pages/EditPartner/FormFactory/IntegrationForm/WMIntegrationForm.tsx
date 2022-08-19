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
	render() {
		return <Form />
	}
}

export default WMIntegrationForm

interface FormProps {}
const Form: React.FC<FormProps> = () => {
	const { partnerId, selectedIntegration, setSelectedIntegration } =
		useContext<ISelectedIntegrationContext>(SelectedIntegrationContext)
	const { setIntegrations } = useContext<IIntegrationsContext>(IntegrationsContext)

	const generateIntegrationDraftKey = useCallback(
		() => `${partnerId}-${selectedIntegration.integrationId}-WMIntegrationDraft`,
		[partnerId, selectedIntegration],
	)
	const saveDraft = (content: string) =>
		localStorage.setItem(generateIntegrationDraftKey(), content)
	const readDraft = () => localStorage.getItem(generateIntegrationDraftKey())

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

		// console.log("process", selectedIntegration.integrationId);

		saveDraft(JSON.stringify(processedFormData))

		return processedFormData
	}

	// set form data to be draft data (first time only)
	useEffect(() => {
		updateSelectedIntegration(
			preprocessIntegrationInfoFormData(selectedIntegration as IWMIntegrationData),
		)
	}, [])

	// update form fields
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
		// console.log("update selectedInt", selectedIntegration.integrationId);
		saveDraft(JSON.stringify(integrationFormData))
		setSelectedIntegration(updatedWMIntegrationData)
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
