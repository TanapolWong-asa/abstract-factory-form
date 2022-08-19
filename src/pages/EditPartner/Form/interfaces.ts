import { InputType, option } from '.'

export interface FormItem {
	// eslint-disable-next-line react/no-unused-prop-types
	id?: number
	inputType: InputType
	label: string
	options?: option[]
	className?: string
	formItemName?: string
	required: boolean
	disabled?: boolean
	regex: RegExp
	errorMessage: string
	maxLength?: number
	accept?: string
	defaultValue?: any
}
