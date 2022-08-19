/* eslint-disable class-methods-use-this */
import React from 'react'

import { ISelectedIntegrationContext } from '../../../../stores/selectedIntegration'
import IntegrationForm from './IntegrationForm'

class ATIntegrationForm extends IntegrationForm {
	public generateIntegrationDraftKey(): string {
		const {
			partnerId,
			selectedIntegration: { integrationId },
		} = this.context as ISelectedIntegrationContext
		return `${partnerId}-${integrationId}-ATIntegrationDraft` // Recommended draft key pattern
	}

	render() {
		return <div>ATIntegrationForm</div>
	}
}

export default ATIntegrationForm
