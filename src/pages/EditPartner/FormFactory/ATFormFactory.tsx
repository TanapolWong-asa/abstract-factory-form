/* eslint-disable class-methods-use-this */
import React from 'react'

import { IntegrationType } from '../../../interfaces'
import ATConnectionForm from './ConnectionForm/ATConnectionForm'
import ConnectionForm from './ConnectionForm/ConnectionForm'
import { FormFactory } from './FormFactory'
import ATIntegrationForm from './IntegrationForm/ATIntegrationForm'
import IntegrationForm from './IntegrationForm/IntegrationForm'
import ATInterfaceForm from './InterfaceForm/ATInterfaceForm'
import InterfaceForm from './InterfaceForm/InterfaceForm'

class ATFormFactory implements FormFactory {
	// eslint-disable-next-line @typescript-eslint/ban-types
	props: Object = {}

	constructor({
		partnerId,
		setPartnerId,
		selectedIntegration,
		setSelectedIntegration,
	}: {
		partnerId: string
		setPartnerId: React.Dispatch<React.SetStateAction<string>>
		selectedIntegration: any
		setSelectedIntegration: React.Dispatch<React.SetStateAction<IntegrationType>>
	}) {
		this.props = {
			partnerId,
			setPartnerId,
			selectedIntegration,
			setSelectedIntegration,
		}
	}

	createIntegrationForm(): IntegrationForm {
		return new ATIntegrationForm({
			partnerId: (this.props as any)['partnerId'],
			setPartnerId: (this.props as any)['setPartnerId'],
			selectedIntegration: (this.props as any)['selectedIntegration'],
			setSelectedIntegration: (this.props as any)['setSelectedIntegration'],
		})
	}

	createInterfaceForm(): InterfaceForm {
		return new ATInterfaceForm({})
	}

	createConnectionForm(): ConnectionForm {
		return new ATConnectionForm({})
	}
}

export default ATFormFactory
