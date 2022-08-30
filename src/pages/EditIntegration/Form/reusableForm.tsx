import React, { useCallback, useContext, useEffect } from 'react'
import { useForm } from 'react-hook-form'

import { ConnectionsContext, IConnectionsContext } from '../../../stores/connections'
import { IIntegrationsContext, IntegrationsContext } from '../../../stores/intergrations'
import {
	ISelectedConnectionsContext,
	SelectedConnectionsContext,
} from '../../../stores/selectedConnections'
import {
	ISelectedIntegrationContext,
	SelectedIntegrationContext,
} from '../../../stores/selectedIntegration'
import {
	ISelectedInterfaceContext,
	SelectedInterfaceContext,
} from '../../../stores/selectedInterface'
import {
	IATConnectionFormData,
	IATIntegrationFormData,
	IATInterfaceFormData,
	IntegrationDataType,
	InterfaceDataType,
	IWMConnectionFormData,
	IWMIntegrationFormData,
	IWMInterfaceFormData,
} from '../interfaces'
import { InputType, RenderFormItemByType } from '.'
import { FormItem } from './interfaces'

// Add more form type here
export type IntegrationFormType = IWMIntegrationFormData | IATIntegrationFormData
export type InterfaceFormType = IWMInterfaceFormData | IATInterfaceFormData
export type ConnectionFormType = IWMConnectionFormData | IATConnectionFormData

interface ReusableIntegrationFormProps {
	saveDraft: (content: string) => void
	readDraft: () => string | null
	formList: FormItem[]
	preprocessIntegrationInfoFormData: (
		selectedIntegration: IntegrationDataType | null,
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
		formList.forEach((item: FormItem) => {
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
		const updatedIntegrationData: IntegrationDataType = {
			...(selectedIntegration as IntegrationDataType),
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
	formList: FormItem[]
	preprocessInterfaceInfoFormData: (
		selectedInterface: InterfaceDataType | null,
	) => InterfaceFormType
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
		formList.forEach((item: FormItem) => {
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
		const updatedInterfaceData: InterfaceDataType = {
			...(selectedInterface as InterfaceDataType),
			interfaceName: interfaceFormData.interfaceName,
			isDirty: true,
			hasError,
			dirtyFields: newDirtyFields,
			errorFields: newErrorFields,
		}
		saveDraft(JSON.stringify(interfaceFormData))

		const updatedIntegrationData: IntegrationDataType = {
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

// This form is not input-to-the-field kind of form, it's a select-multiple-item form which could be handle by using 'multipleselect'
// XXX: Since connections will be save as a list, some of the methods will be implemented in different way
interface ReusableConnectionsFormProps {
	saveDraft: (content: string) => void
	readDraft: () => string | null
	formList: FormItem[]
}

const ReusableConnectionsForm: React.FunctionComponent<ReusableConnectionsFormProps> = ({
	saveDraft,
	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	readDraft,
	formList,
}: ReusableConnectionsFormProps) => {
	const { register, getValues, formState, trigger } = useForm<ConnectionFormType>()
	const { setIntegrations } = useContext<IIntegrationsContext>(IntegrationsContext)
	const { selectedIntegration, setSelectedIntegration } = useContext<ISelectedIntegrationContext>(
		SelectedIntegrationContext,
	)
	const { selectedInterface, setSelectedInterface } =
		useContext<ISelectedInterfaceContext>(SelectedInterfaceContext)
	const { connections } = useContext<IConnectionsContext>(ConnectionsContext)
	const { selectedConnections, setSelectedConnections } = useContext<ISelectedConnectionsContext>(
		SelectedConnectionsContext,
	)

	const resetForm = useCallback(() => {
		const isDirty: boolean =
			selectedConnections.find((connection) => connection.isDirty || connection.hasError) !==
				null || false
		if (isDirty === true) {
			trigger()
		} else {
			formState.errors = {}
			formState.isDirty = false
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [selectedConnections])
	useEffect(() => resetForm(), [resetForm, selectedConnections, formList])

	// set form data to be draft data (first time only)
	useEffect(() => {
		// updateSelectedConnections(preprocessConnectionsForm(selectedConnections))
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [])

	const updateSelectedConnections = (selectedConnectionsId: string[]) => {
		if (selectedInterface === null || selectedIntegration === null) return

		const updatedSelectedConnections = selectedConnectionsId.map(
			(connectionId) =>
				// TODO: Fix null assertion? (can it be guaranteed that selectedConnections will always be in the connections list?)
				// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
				connections.find((connection) => connection.connectionId === connectionId)!,
		)
		setSelectedConnections(updatedSelectedConnections)
		saveDraft(JSON.stringify(updatedSelectedConnections))

		const updatedSelectedInterface: InterfaceDataType = {
			...selectedInterface,
			connections: updatedSelectedConnections,
		}
		setSelectedInterface(updatedSelectedInterface)

		const updatedSelectedIntegration: IntegrationDataType = {
			// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
			...selectedIntegration,
			interfaces: {
				// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
				interfaceList: selectedIntegration!.interfaces.interfaceList.map(
					(techInterface) => {
						if (techInterface.interfaceId === updatedSelectedInterface.interfaceId) {
							return updatedSelectedInterface
						}
						return techInterface
					},
				),
			},
		}
		setSelectedIntegration(updatedSelectedIntegration)
		setIntegrations((integrations) =>
			integrations.map((integration) => {
				if (integration.integrationId === selectedIntegration?.integrationId) {
					return updatedSelectedIntegration
				}
				return integration
			}),
		)
	}
	return (
		<form
			onChange={() => {
				trigger()
				console.log(getValues())
				updateSelectedConnections((getValues() as any)['connections'])
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
						dirtyFields={
							{} // (selectedIntegration && selectedIntegration.dirtyFields) || {}
						}
					/>
				)
			})}
		</form>
	)
}

export default ReusableConnectionsForm
