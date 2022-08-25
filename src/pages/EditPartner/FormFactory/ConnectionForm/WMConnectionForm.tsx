/* eslint-disable class-methods-use-this */
import React from 'react'

import {
	ISelectedIntegrationAndSelectedInterfaceContext,
	SelectedIntegrationAndSelectedInterfaceContext,
	SelectedIntegrationAndSelectedInterfaceProvider,
} from '../../../../stores/combinedStore/integrationAndInterface'
import { WM_CONNECTIONS } from '../../../../stores/mockData'
import { FormItem } from '../../Form/interfaces'
import ReusableConnectionsForm from '../../Form/reusableForm'
import ConnectionForm from './ConnectionForm'

const WMConnectionForm = () => (
	<SelectedIntegrationAndSelectedInterfaceProvider>
		<WMConnectionFormInner />
	</SelectedIntegrationAndSelectedInterfaceProvider>
)
class WMConnectionFormInner extends ConnectionForm {
	protected generateFormList(): FormItem[] {
		return [
			{
				id: 1,
				inputType: 'multipleselect',
				label: 'Connections',
				formItemName: 'connections',
				defaultValue: '',
				options: WM_CONNECTIONS.map((wmConnection) => ({
					label: wmConnection.connectionName,
					value: wmConnection.connectionId,
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
		return `${partnerId}-${selectedIntegration?.integrationId}-${selectedInterface?.interfaceId}-WMConnectionDraft` // Recommended draft key pattern
	}

	// FIXME: onChange make form stage go back to interface stage
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
WMConnectionFormInner.contextType = SelectedIntegrationAndSelectedInterfaceContext

export default WMConnectionForm
