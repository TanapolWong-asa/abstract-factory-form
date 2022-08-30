/* eslint-disable class-methods-use-this */
import React from 'react'

import {
	ISelectedIntegrationAndSelectedInterfaceContext,
	SelectedIntegrationAndSelectedInterfaceContext,
	SelectedIntegrationAndSelectedInterfaceProvider,
} from '../../../../stores/combinedStore/integrationAndInterface'
import { FormItem } from '../../Form/interfaces'
import { InterfaceFormType, ReusableInterfaceForm } from '../../Form/reusableForm'
import { InterfaceDataType, IWMInterfaceData, IWMInterfaceFormData } from '../../interfaces'
import InterfaceForm from './InterfaceForm'

const WMInterfaceForm = ({
	setStage,
}: {
	setStage: React.Dispatch<React.SetStateAction<number>>
}) => (
	<SelectedIntegrationAndSelectedInterfaceProvider>
		<WMInterfaceFormInner setStage={setStage} />
	</SelectedIntegrationAndSelectedInterfaceProvider>
)

export default WMInterfaceForm
// Since the class needed 2 context to function, we'll pass it from wrapper instead
class WMInterfaceFormInner extends InterfaceForm {
	public generateDraftKey(): string {
		// The context will only be null just when createContext is called, later it will always selectedIntegration and selectedInterface context
		// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
		const { partnerId, selectedIntegration } = (
			this.context as ISelectedIntegrationAndSelectedInterfaceContext
		).selectedIntegrationContext!
		// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
		const { selectedInterface } = (
			this.context as ISelectedIntegrationAndSelectedInterfaceContext
		).selectedInterfaceContext!
		return `${partnerId}-${selectedIntegration?.integrationId}-${selectedInterface?.interfaceId}-WMInterfaceDraft` // Recommended draft key pattern
	}

	protected preprocessInterfaceInfoFormData(
		selectedInterface: InterfaceDataType | null,
	): InterfaceFormType {
		if (selectedInterface === null) {
			return {
				businessTransactionType: '',
				direction: '',
				interfaceName: '',
				isDirty: false,
				hasError: true,
				dirtyFields: {},
			}
		}

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
				disabled: false,
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
		// In case of real wM interface form, we'll have connection and transaction form down here as well (transaction form will also affect connection form since connection is within transaction list)
	}
}
WMInterfaceFormInner.contextType = SelectedIntegrationAndSelectedInterfaceContext
