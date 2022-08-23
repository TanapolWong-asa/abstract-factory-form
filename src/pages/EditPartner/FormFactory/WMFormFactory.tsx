/* eslint-disable class-methods-use-this */
import React from 'react'

import ConnectionForm from './ConnectionForm/ConnectionForm'
import WMConnectionForm from './ConnectionForm/WMConnectionForm'
import FormFactory from './FormFactory'
import IntegrationForm from './IntegrationForm/IntegrationForm'
import WMIntegrationForm from './IntegrationForm/WMIntegrationForm'
import InterfaceForm from './InterfaceForm/InterfaceForm'
import WMInterfaceForm from './InterfaceForm/WMInterfaceForm'

class WMFormFactory implements FormFactory {
	// must be render this way to trigger react's lifecycle method
	createIntegrationForm(): IntegrationForm {
		return (<WMIntegrationForm />) as unknown as IntegrationForm
	}

	createInterfaceForm(): InterfaceForm {
		return (<WMInterfaceForm />) as unknown as InterfaceForm
	}

	createConnectionForm(): ConnectionForm {
		return (<WMConnectionForm />) as unknown as ConnectionForm
	}
}

export default WMFormFactory
