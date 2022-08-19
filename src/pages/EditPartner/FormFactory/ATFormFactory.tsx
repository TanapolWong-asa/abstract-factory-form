/* eslint-disable class-methods-use-this */
import React from 'react'

import ATConnectionForm from './ConnectionForm/ATConnectionForm'
import ConnectionForm from './ConnectionForm/ConnectionForm'
import { FormFactory } from './FormFactory'
import ATIntegrationForm from './IntegrationForm/ATIntegrationForm'
import IntegrationForm from './IntegrationForm/IntegrationForm'
import ATInterfaceForm from './InterfaceForm/ATInterfaceForm'
import InterfaceForm from './InterfaceForm/InterfaceForm'

class ATFormFactory implements FormFactory {
	createIntegrationForm(): IntegrationForm {
		return (<ATIntegrationForm />) as unknown as IntegrationForm
	}

	createInterfaceForm(): InterfaceForm {
		return (<ATInterfaceForm />) as unknown as InterfaceForm
	}

	createConnectionForm(): ConnectionForm {
		return (<ATConnectionForm />) as unknown as ConnectionForm
	}
}

export default ATFormFactory
