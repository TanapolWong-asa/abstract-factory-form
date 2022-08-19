/* eslint-disable class-methods-use-this */
import React from 'react'

import { IIntegrationFormData } from '../../../../interfaces'
import IntegrationForm from './IntegrationForm'

class ATIntegrationForm extends IntegrationForm {
	componentDidMount(): void {
		throw new Error('Method not implemented.')
	}

	protected generateIntegrationDraftKey(): string {
		throw new Error('Method not implemented.')
	}

	protected preprocessIntegrationInfoFormData(): IIntegrationFormData {
		throw new Error('Method not implemented.')
	}

	render() {
		return <div>ATIntegrationForm</div>
	}
}

export default ATIntegrationForm
