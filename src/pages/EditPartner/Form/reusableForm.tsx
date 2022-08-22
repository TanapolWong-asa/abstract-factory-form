import React, { useCallback, useContext, useEffect } from 'react'
import { useForm } from 'react-hook-form'

import { IIntegrationsContext, IntegrationsContext } from '../../../stores/intergrations'
import {
	ISelectedIntegrationContext,
	SelectedIntegrationContext,
} from '../../../stores/selectedIntegration'
import { IATIntegrationFormData, IntegrationType, IWMIntegrationFormData } from '../interfaces'
import { InputType, RenderFormItemByType } from '.'

// Add more form type here
export type FormType = IWMIntegrationFormData | IATIntegrationFormData

interface ReusableFormProps {
	saveDraft: (content: string) => void
	readDraft: () => string | null
	formList: any[]
	preprocessFormData: (selectedIntegration: IntegrationType) => FormType
}

const ReusableForm: React.FC<ReusableFormProps> = ({
	saveDraft,
	readDraft,
	formList,
	preprocessFormData,
}: ReusableFormProps) => {
	// TODO: Stop using context but pass as props?
	const { selectedIntegration, setSelectedIntegration } = useContext<ISelectedIntegrationContext>(
		SelectedIntegrationContext,
	)
	const { setIntegrations } = useContext<IIntegrationsContext>(IntegrationsContext)

	const { register, setValue, getValues, formState, trigger } = useForm<FormType>()

	const getKeyValue =
		<T extends object, U extends keyof T>(obj: T) =>
		(key: U) =>
			obj[key]

	const resetForm = useCallback(() => {
		const isDirty: boolean =
			(selectedIntegration &&
				(selectedIntegration.isDirty || selectedIntegration.hasError)) ||
			false
		if (isDirty === true) {
			trigger()
		} else {
			formState.errors = {}
			formState.isDirty = false
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [selectedIntegration])
	useEffect(() => resetForm(), [resetForm])

	// for this solution, preprocess... must me moved to upper level since processedFormData is processed differently
	// const preprocessIntegrationInfoFormData = (
	// 	selectedIntegration: IWMIntegrationData,
	// ): FormDataType => {
	// 	const draft = JSON.parse(readDraft() || '{}')
	// 	const allDirtyFields = {
	// 		...selectedIntegration.dirtyFields,
	// 		...(draft as any)['dirtyFields'],
	// 	}

	// 	const processedFormData: FormDataType = {
	// 		technology: selectedIntegration.technology,
	// 		integrationName:
	// 			(draft as any)['integrationName'] || selectedIntegration.integrationName,
	// 		isDirty: selectedIntegration.isDirty || false,
	// 		hasError: selectedIntegration.hasError || false,
	// 		dirtyFields: allDirtyFields,
	// 	}
	// 	saveDraft(JSON.stringify(processedFormData))

	// 	return processedFormData
	// }

	// set form data to be draft data (first time only)
	useEffect(() => {
		updateSelectedIntegration(preprocessFormData(selectedIntegration as IntegrationType))
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [])

	// update form fields on UI
	useEffect(() => {
		const integrationInfoFormData: FormType = preprocessFormData(
			selectedIntegration as IntegrationType,
		)
		const keys = Object.keys(integrationInfoFormData)
		formList.forEach((item: { formItemName: string; defaultValue: string }) => {
			keys.forEach((key: any) => {
				if (key === item.formItemName) {
					const value: string = getKeyValue(integrationInfoFormData)(key)
					const k = item.formItemName as keyof FormType as string
					setValue(k, value || item.defaultValue)
				}
			})
		})
		resetForm()
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [selectedIntegration, formList])

	// update selectedIntegration in context
	const updateSelectedIntegration = (integrationFormData: FormType) => {
		if (selectedIntegration === null) return

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
		const updatedWMIntegrationData: IntegrationType = {
			...(selectedIntegration as IntegrationType),
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
				updateSelectedIntegration(getValues() as FormType)
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
						dirtyFields={(selectedIntegration && selectedIntegration.dirtyFields) || {}}
					/>
				)
			})}
		</form>
	)
}

export default ReusableForm
