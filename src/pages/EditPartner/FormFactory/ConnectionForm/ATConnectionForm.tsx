/* eslint-disable class-methods-use-this */
import React from 'react'

import {
	ISelectedIntegrationAndSelectedInterfaceContext,
	SelectedIntegrationAndSelectedInterfaceContext,
	SelectedIntegrationAndSelectedInterfaceProvider,
} from '../../../../stores/combinedStore/integrationAndInterface'
import { AT_CONNETIONS } from '../../../../stores/mockData'
import { FormItem } from '../../Form/interfaces'
import ReusableConnectionsForm from '../../Form/reusableForm'
import ConnectionForm from './ConnectionForm'

const ATConnectionForm = () => (
	<SelectedIntegrationAndSelectedInterfaceProvider>
		<ATConnectionFormInner />
	</SelectedIntegrationAndSelectedInterfaceProvider>
)
class ATConnectionFormInner extends ConnectionForm {
	protected generateFormList(): FormItem[] {
		return [
			{
				id: 1,
				inputType: 'multipleselect',
				label: 'Connections',
				formItemName: 'connections',
				defaultValue: '',
				options: AT_CONNETIONS.map((atConnection) => ({
					label: atConnection.connectionName,
					value: atConnection.connectionId,
				})),
				required: true,
				disabled: false,
				regex: /./i,
				errorMessage: 'This is a required Field.',
			},
		]
	}

	public generateDraftKey(): string {
		// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
		const { partnerId, selectedIntegration } = (
			this.context as ISelectedIntegrationAndSelectedInterfaceContext
		).selectedIntegrationContext!
		// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
		const { selectedInterface } = (
			this.context as ISelectedIntegrationAndSelectedInterfaceContext
		).selectedInterfaceContext!
		return `${partnerId}-${selectedIntegration?.integrationId}-${selectedInterface?.interfaceId}-ATConnectionDraft` // Recommended draft key pattern
	}

	render() {
		return (
			<ReusableConnectionsForm
				saveDraft={this.saveDraft}
				readDraft={this.readDraft}
				formList={this.generateFormList()}
			/>
		)
	}
}
ATConnectionFormInner.contextType = SelectedIntegrationAndSelectedInterfaceContext

export default ATConnectionForm
