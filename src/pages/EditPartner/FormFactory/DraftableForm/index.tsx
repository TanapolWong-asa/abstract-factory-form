import * as React from 'react'

// HACK: This is messy as hell, refactor this later
interface DraftableFormProps {
	// eslint-disable-next-line react/no-unused-prop-types
	otherProps?: Record<string, unknown> // If you want a type meaning "any object", you probably want `Record<string, unknown>` instead.
}

interface DraftableFormState {
	otherStates?: Record<string, unknown>
}

abstract class DraftableForm extends React.Component<DraftableFormProps, DraftableFormState> {
	constructor(props: DraftableFormProps) {
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
