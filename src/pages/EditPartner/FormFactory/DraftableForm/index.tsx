import React from 'react'

export interface DraftableFormProps {}

export interface DraftableFormStates {}

abstract class DraftableForm<
	P extends DraftableFormProps,
	S extends DraftableFormStates,
> extends React.Component<P, S> {
	constructor(props: P) {
		super(props)
		this.saveDraft = this.saveDraft.bind(this)
		this.readDraft = this.readDraft.bind(this)
		this.generateDraftKey = this.generateDraftKey.bind(this)
	}

	public saveDraft(content: string): void {
		localStorage.setItem(this.generateDraftKey(), content)
	}

	public readDraft(): string | null {
		return localStorage.getItem(this.generateDraftKey())
	}

	public abstract generateDraftKey(): string
}

export default DraftableForm
