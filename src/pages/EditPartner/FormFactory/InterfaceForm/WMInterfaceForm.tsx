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
import { InterfaceType, IWMInterfaceData, IWMInterfaceFormData } from '../../interfaces'
import InterfaceForm from './InterfaceForm'

const WMInterfaceForm = () => {
	const selectedIntegrationContext = useContext<ISelectedIntegrationContext>(
		SelectedIntegrationContext,
	)
	const selectedInterfaceContext = useContext<ISelectedInterfaceContext>(SelectedInterfaceContext)

	// FIXME: Form not change according to selectedInterface (only change once)
	return (
		<WMInterfaceFormInner
			selectedIntegrationContext={selectedIntegrationContext}
			selectedInterfaceContext={selectedInterfaceContext}
		/>
	)
}

export default WMInterfaceForm

// on adding more props: https://stackoverflow.com/questions/36750387/react-adding-props-to-an-existing-component
class WMInterfaceFormInner extends InterfaceForm {
	constructor(props: any) {
		super(props)
		this.state = {
			selectedIntegrationContext: props.selectedIntegrationContext,
			selectedInterfaceContext: props.selectedInterfaceContext,
		}
	}

	public generateDraftKey(): string {
		const { partnerId, selectedIntegration } = this.state.otherStates
			?.selectedIntegrationContext as ISelectedIntegrationContext
		const { selectedInterface } = this.state.otherStates
			?.selectedInterfaceContext as ISelectedInterfaceContext
		return `${partnerId}-${selectedIntegration?.integrationId}-${selectedInterface?.interfaceId}-WMInterfaceDraft` // Recommended draft key pattern
	}

	protected preprocessInterfaceInfoFormData(selectedInterface: InterfaceType): InterfaceFormType {
		const selectedWMInterface = selectedInterface as IWMInterfaceData
		const draft = JSON.parse(this.readDraft() || '{}')
		const allDirtyFields = {
			...selectedWMInterface.dirtyFields,
			...(draft as any)['dirtyFields'],
		}

		const processedFormData: IWMInterfaceFormData = {
			businessTransactionType:
				(draft as any)['businessTransactionType'] ||
				selectedWMInterface.businessTransactionType,
			direction: (draft as any)['direction'] || selectedWMInterface.direction,
			interfaceName: (draft as any)['interfaceName'] || selectedWMInterface.interfaceName,
			isDirty: selectedWMInterface.isDirty || false,
			hasError: selectedWMInterface.hasError || false,
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
				label: 'Business Transaction Type',
				formItemName: 'businessTransactionType',
				defaultValue: '',
				required: true,
				disabled: false,
				regex: /./i,
				errorMessage: 'This is a required Field.',
			},
			{
				id: 3,
				inputType: 'text',
				label: 'Direction',
				formItemName: 'direction',
				defaultValue: '',
				required: true,
				disabled: false,
				regex: /./i,
				errorMessage: 'This is a required Field.',
			},
		]
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
