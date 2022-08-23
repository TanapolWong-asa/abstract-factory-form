/* eslint-disable class-methods-use-this */
import React from 'react'

import {
	ISelectedIntegrationAndSelectedInterfaceContext,
	IntegrationsAndInterfacesContext,
	SelectedIntegrationAndSelectedInterfaceProvider,
} from '../../../../stores/combinedStore/integrationAndInterface'
import { FormItem } from '../../Form/interfaces'
import { InterfaceFormType, ReusableInterfaceForm } from '../../Form/reusableForm'
import { InterfaceType, IWMInterfaceData, IWMInterfaceFormData } from '../../interfaces'
import InterfaceForm from './InterfaceForm'

const WMInterfaceForm = () => (
	<SelectedIntegrationAndSelectedInterfaceProvider>
		<WMInterfaceFormInner />
	</SelectedIntegrationAndSelectedInterfaceProvider>
)

export default WMInterfaceForm
// Since the class needed 2 context to function, we'll pass it from wrapper instead
class WMInterfaceFormInner extends InterfaceForm {
	constructor(props: any) {
		super(props)
		this.state = { ...props }
	}

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
	}
}
WMInterfaceFormInner.contextType = IntegrationsAndInterfacesContext
