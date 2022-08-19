import React from 'react'

import {
	ISelectedIntegrationContext,
	SelectedIntegrationContext,
} from '../../../../stores/selectedIntegration'

interface IntegrationFormProps {}

interface IntegrationFormState {}

abstract class IntegrationForm extends React.Component<IntegrationFormProps, IntegrationFormState> {
	// eslint-disable-next-line react/static-property-placement
	static contextType: React.Context<ISelectedIntegrationContext> = SelectedIntegrationContext

	protected currentStage = 1

	constructor(props: IntegrationFormProps) {
		super(props)
		this.saveDraft = this.saveDraft.bind(this)
		this.readDraft = this.readDraft.bind(this)
		this.generateIntegrationDraftKey = this.generateIntegrationDraftKey.bind(this)
	}

	protected saveDraft(content: string): void {
		localStorage.setItem(this.generateIntegrationDraftKey(), content)
	}

	protected readDraft(): string | null {
		return localStorage.getItem(this.generateIntegrationDraftKey())
	}

	protected abstract generateIntegrationDraftKey(): string
}

export default IntegrationForm
