import * as React from 'react'

interface DraftableFormProps {}

interface DraftableFormState {}

abstract class DraftableForm extends React.Component<DraftableFormProps, DraftableFormState> {
	constructor(props: DraftableFormProps) {
		super(props)
		this.saveDraft = this.saveDraft.bind(this)
		this.readDraft = this.readDraft.bind(this)
		this.generateIntegrationDraftKey = this.generateIntegrationDraftKey.bind(this)
	}

	public saveDraft(content: string): void {
		localStorage.setItem(this.generateIntegrationDraftKey(), content)
	}

	public readDraft(): string | null {
		return localStorage.getItem(this.generateIntegrationDraftKey())
	}

	public abstract generateIntegrationDraftKey(): string
}

export default DraftableForm
