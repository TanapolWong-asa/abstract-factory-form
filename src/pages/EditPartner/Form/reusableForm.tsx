import React, { useCallback, useContext, useEffect } from 'react'
import { useForm } from 'react-hook-form'

import { IIntegrationsContext, IntegrationsContext } from '../../../stores/intergrations'
import {
	ISelectedIntegrationContext,
	SelectedIntegrationContext,
} from '../../../stores/selectedIntegration'
import {
	ISelectedInterfaceContext,
	SelectedInterfaceContext,
} from '../../../stores/selectedInterface'
import {
	IATIntegrationFormData,
	IATInterfaceFormData,
	IntegrationType,
	InterfaceType,
	IWMIntegrationFormData,
	IWMInterfaceFormData,
} from '../interfaces'
import { InputType, RenderFormItemByType } from '.'

// Add more form type here
export type IntegrationFormType = IWMIntegrationFormData | IATIntegrationFormData
export type InterfaceFormType = IWMInterfaceFormData | IATInterfaceFormData

interface ReusableIntegrationFormProps {
	saveDraft: (content: string) => void
	readDraft: () => string | null
	formList: any[]
	preprocessIntegrationInfoFormData: (
		selectedIntegration: IntegrationType | null,
	) => IntegrationFormType
}

export const ReusableIntegrationForm: React.FC<ReusableIntegrationFormProps> = ({
	saveDraft,
	readDraft,
	formList,
	preprocessIntegrationInfoFormData,
}: ReusableIntegrationFormProps) => {
	const { selectedIntegration, setSelectedIntegration } = useContext<ISelectedIntegrationContext>(
		SelectedIntegrationContext,
	)
	const { setIntegrations } = useContext<IIntegrationsContext>(IntegrationsContext)

	const { register, setValue, getValues, formState, trigger } = useForm<IntegrationFormType>()

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

	// set form data to be draft data (first time only)
	useEffect(() => {
		updateSelectedIntegration(preprocessIntegrationInfoFormData(selectedIntegration))
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [])

	// update form fields on UI
	useEffect(() => {
		const integrationInfoFormData: IntegrationFormType =
			preprocessIntegrationInfoFormData(selectedIntegration)
		const keys = Object.keys(integrationInfoFormData)
		formList.forEach((item: { formItemName: string; defaultValue: string }) => {
			keys.forEach((key: any) => {
				if (key === item.formItemName) {
					const value: string = getKeyValue(integrationInfoFormData)(key)
					const k = item.formItemName as keyof IntegrationFormType as string
					setValue(k, value || item.defaultValue)
				}
			})
		})
		resetForm()
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [selectedIntegration, formList])

	// update selectedIntegration in context
	const updateSelectedIntegration = (integrationFormData: IntegrationFormType) => {
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
		const updatedIntegrationData: IntegrationType = {
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
		setSelectedIntegration(updatedIntegrationData)
		// save new data to integration list (for dropdown selector UI)
		setIntegrations((integrations) =>
			integrations.map((integration) => {
				if (integration.integrationId === selectedIntegration.integrationId) {
					return updatedIntegrationData
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
						dirtyFields={(selectedIntegration && selectedIntegration.dirtyFields) || {}}
					/>
				)
			})}
		</form>
	)
}

interface ReusableInterfaceFormProps {
	saveDraft: (content: string) => void
	readDraft: () => string | null
	formList: any[]
	preprocessInterfaceInfoFormData: (selectedInterface: InterfaceType | null) => InterfaceFormType
}

export const ReusableInterfaceForm: React.FunctionComponent<ReusableInterfaceFormProps> = ({
	saveDraft,
	readDraft,
	formList,
	preprocessInterfaceInfoFormData,
}: ReusableInterfaceFormProps) => {
	const { selectedIntegration, setSelectedIntegration } = useContext<ISelectedIntegrationContext>(
		SelectedIntegrationContext,
	)
	const { setIntegrations } = useContext<IIntegrationsContext>(IntegrationsContext)
	const { selectedInterface, setSelectedInterface } =
		useContext<ISelectedInterfaceContext>(SelectedInterfaceContext)

	const { register, setValue, getValues, formState, trigger } = useForm<InterfaceFormType>()

	const getKeyValue =
		<T extends object, U extends keyof T>(obj: T) =>
		(key: U) =>
			obj[key]

	const resetForm = useCallback(() => {
		const isDirty: boolean =
			(selectedInterface && (selectedInterface.isDirty || selectedInterface.hasError)) ||
			false
		if (isDirty === true) {
			trigger()
		} else {
			formState.errors = {}
			formState.isDirty = false
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [selectedIntegration, selectedInterface])
	useEffect(() => resetForm(), [resetForm])

	// set form data to be draft data (first time only)
	useEffect(() => {
		updateSelectedInterface(preprocessInterfaceInfoFormData(selectedInterface))
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [])

	// update form fields on UI
	useEffect(() => {
		const interfaceInfoFormData = preprocessInterfaceInfoFormData(selectedInterface)
		const keys = Object.keys(interfaceInfoFormData)
		formList.forEach((item: { formItemName: string; defaultValue: string }) => {
			keys.forEach((key: any) => {
				if (key === item.formItemName) {
					const value: string = getKeyValue(interfaceInfoFormData)(key)
					const k = item.formItemName as keyof InterfaceFormType as string
					setValue(k, value || item.defaultValue)
				}
			})
		})
		resetForm()
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [selectedIntegration, selectedInterface, formList])

	const updateSelectedInterface = (interfaceFormData: InterfaceFormType) => {
		if (selectedInterface === null || selectedIntegration === null) return

		const draft = JSON.parse(readDraft() || '{}')
		const allDirtyFields = {
			...(interfaceFormData.dirtyFields || {}),
			...(draft as any)['dirtyFields'],
		}

		const hasError = Object.keys(formState.errors).length !== 0
		const newErrorFields = Object.keys(formState.errors) || []
		const newDirtyFields = {
			...selectedInterface.dirtyFields,
			...formState.dirtyFields,
			...allDirtyFields,
		}
		const updatedInterfaceData: InterfaceType = {
			...(selectedInterface as InterfaceType),
			interfaceName: interfaceFormData.interfaceName,
			isDirty: true,
			hasError,
			dirtyFields: newDirtyFields,
			errorFields: newErrorFields,
		}
		saveDraft(JSON.stringify(interfaceFormData))

		const updatedIntegrationData: IntegrationType = {
			// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
			...selectedIntegration,
			interfaces: {
				// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
				interfaceList: selectedIntegration!.interfaces.interfaceList.map(
					(techInterface) => {
						if (techInterface.interfaceId === selectedInterface.interfaceId) {
							return updatedInterfaceData
						}
						return techInterface
					},
				),
			},
		}

		// Need to update these 2 separately since selectedIntegration store copy of the integration from integrations list
		// save new data to selected integration
		setSelectedInterface(updatedInterfaceData)
		setSelectedIntegration(updatedIntegrationData)
		// save new data to integration list (for dropdown selector UI)
		setIntegrations((integrations) =>
			integrations.map((integration) => {
				if (integration.integrationId === selectedIntegration?.integrationId) {
					return updatedIntegrationData
				}
				return integration
			}),
		)
	}

	return (
		<form
			onChange={() => {
				trigger()
				updateSelectedInterface(getValues() as InterfaceFormType)
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
