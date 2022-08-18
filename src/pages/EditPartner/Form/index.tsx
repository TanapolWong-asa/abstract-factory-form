/* eslint-disable no-case-declarations */
/* eslint-disable no-unused-expressions */
/* eslint-disable no-nested-ternary */
/* eslint-disable import/no-cycle */
import React, { useEffect, useState } from 'react'
import { Control } from 'react-hook-form'

export type InputType = 'text' | 'select' | 'checkbox' | 'textarea' | 'file' | 'multiplefiles'
type option = {
	label: string
	value: string
	disabled?: boolean
}

export function convertStringToDate(s: string | null | Date) {
	if (!s || s === undefined) return null
	if (typeof s === 'string') {
		return new Date(s)
	}
	if (typeof Date === typeof s) {
		return s
	}
	return null
}
interface RenderFormItemByTypeProps {
	id?: number
	inputType: InputType
	label: string
	options?: option[]
	className?: string
	formItemName?: string
	register: any // (Ref: any, RegisterOptions?: any) => void
	control?: Control<any>
	callback?: any
	formState: any
	required: boolean
	disabled?: boolean
	regex: RegExp
	errorMessage: string
	// isDirty: boolean
	dirtyFields: any
	children?: any
	maxLength?: number
	accept?: string
}

export const RenderFormItemByType: React.FC<RenderFormItemByTypeProps> = ({
	inputType,
	label,
	className,
	options,
	formItemName,
	register,
	control,
	callback,
	formState,
	required,
	disabled,
	regex,
	errorMessage,
	dirtyFields,
	children,
	maxLength,
	accept,
}) => {
	const { errors } = formState
	const hasError = formItemName && errors[formItemName]
	let dirtyFieldsList: string[] = []
	if (dirtyFields) {
		dirtyFieldsList = Object.keys(dirtyFields)
	}
	const isDirty = formItemName && dirtyFieldsList.indexOf(formItemName) !== -1
	const [borderColor, setBorderColor] = useState('border-gray-300')
	const [focusColor, setFocusColor] = useState('border-blue-300')
	const inputStyle = { color: disabled ? 'hsl(0,0%,60%)' : 'hsl(0,0%,20%)' }

	useEffect(() => {
		if (hasError) {
			setBorderColor(`border-red-300`)
			setFocusColor(`border-red-500`)
		} else if (isDirty) {
			setBorderColor(`border-blue-300`)
			setFocusColor(`border-blue-500`)
		} else {
			setBorderColor(`border-gray-300`)
			setFocusColor(`border-blue-500`)
		}
	}, [hasError, isDirty])

	switch (inputType) {
		case 'text':
			return (
				<div className={className}>
					<div className="flex">
						<span
							className="font-semibold text-left px-4 w-1/4"
							style={{ whiteSpace: 'pre-line' }}
						>
							{label}
							{required && <span className="text-red-500 text-xs"> * </span>}:
						</span>
						<div className="w-full">
							<input
								className={`appearance-none block w-full p-2  border ${borderColor} rounded py-2 px-4 leading-tight focus:outline-none focus:bg-white focus:${focusColor}`}
								name={formItemName}
								type="text"
								placeholder=""
								ref={register({
									required,
									pattern: {
										value: regex,
										message: errorMessage,
									},
								})}
								disabled={disabled}
								style={inputStyle}
								maxLength={maxLength}
							/>
							{/* {formItemName && errors[formItemName] && <p className="text-red-500 text-xs italic">This is a required field.</p>} */}
							{formItemName &&
								errors[formItemName] &&
								errors[formItemName].type === 'required' && (
									<p className="text-red-500 text-xs italic">
										This is a required field.
									</p>
								)}
							{formItemName &&
								errors[formItemName] &&
								errors[formItemName].type === 'pattern' && (
									<p className="text-red-500 text-xs italic">
										{errors[formItemName].message}
									</p>
								)}
						</div>
					</div>
				</div>
			)
		case 'select':
			return (
				<div className={className}>
					<div className="flex">
						<span
							className="font-semibold text-left px-4 w-1/4"
							style={{ whiteSpace: 'pre-line' }}
						>
							{label}
							{required && <span className="text-red-500 text-xs"> * </span>}:
						</span>
						<div className="w-full">
							<select
								name={formItemName}
								className={`w-full  border ${borderColor} py-2 px-4 px-6 rounded 
                                focus:outline-none 
                                focus:bg-white focus:${focusColor}`}
								ref={register({
									required,
									pattern: {
										value: regex,
										message: errorMessage,
									},
								})}
								disabled={disabled}
								style={inputStyle}
							>
								{options &&
									options.map((item) => (
										<option key={item.label} value={item.value}>
											{item.label}
										</option>
									))}
							</select>
							{formItemName &&
								errors[formItemName] &&
								errors[formItemName].type === 'required' && (
									<p className="text-red-500 text-xs italic">
										This is a required field.
									</p>
								)}
							{formItemName &&
								errors[formItemName] &&
								errors[formItemName].type === 'pattern' && (
									<p className="text-red-500 text-xs italic">
										{errors[formItemName].message}
									</p>
								)}
						</div>
					</div>
				</div>
			)
		case 'checkbox':
			return (
				<div className={className}>
					<div className="flex">
						<span
							className="font-semibold text-left px-4 w-1/4"
							style={{ whiteSpace: 'pre-line' }}
						>
							{label}
							{required && <span className="text-red-500 text-xs"> * </span>}:
						</span>
						<div className="w-full">
							<div className="flex justify-start">
								{options &&
									options.map((i) => (
										<div
											key={i.value}
											className="flex items-center flex-shrink mx-2"
										>
											<input
												type="checkbox"
												name={formItemName || ''}
												ref={register({
													required,
													pattern: {
														value: regex,
														message: errorMessage,
													},
												})}
												className="h-5 w-5 flex-none border border-red-300"
												value={i.value}
												disabled={disabled || i.disabled}
												style={inputStyle}
											/>
											<span className="text-gray-700 ml-2">{i.label}</span>
										</div>
									))}
							</div>
							{formItemName &&
								errors[formItemName] &&
								errors[formItemName].type === 'required' && (
									<p className="text-red-500 text-xs italic">
										This is a required field.
									</p>
								)}
							{formItemName &&
								errors[formItemName] &&
								errors[formItemName].type === 'pattern' && (
									<p className="text-red-500 text-xs italic">
										{errors[formItemName].message}
									</p>
								)}
						</div>
					</div>
				</div>
			)
		case 'textarea':
			return (
				<div className={className}>
					<div className="flex">
						<span
							className="font-semibold text-left px-4 w-1/4"
							style={{ whiteSpace: 'pre-line' }}
						>
							{label}
							{required && <span className="text-red-500 text-xs"> * </span>}:
						</span>
						<div className="w-full">
							<textarea
								name={formItemName}
								className={`appearance-none block w-full border ${borderColor} rounded py-2 px-4 overflow-y-scroll scroll-bar resize-none focus:outline-none focus:bg-white focus:${focusColor}`}
								ref={register({
									required,
									pattern: {
										value: regex,
										message: errorMessage,
									},
								})}
								style={{
									whiteSpace: 'pre-line',
									minHeight: '150px',
									color: disabled ? 'hsl(0,0%,60%)' : 'hsl(0,0%,20%)',
								}}
								disabled={disabled}
								maxLength={maxLength}
							/>
							{formItemName &&
								errors[formItemName] &&
								errors[formItemName].type === 'required' && (
									<p className="text-red-500 text-xs italic">
										This is a required field.
									</p>
								)}
							{formItemName &&
								errors[formItemName] &&
								errors[formItemName].type === 'pattern' && (
									<p className="text-red-500 text-xs italic">
										{errors[formItemName].message}
									</p>
								)}
						</div>
					</div>
				</div>
			)
		case 'file':
			return (
				<div className={className}>
					<div className="flex">
						<span
							className="font-semibold text-left px-4 w-1/4"
							style={{ whiteSpace: 'pre-line' }}
						>
							{label}
							{required && <span className="text-red-500 text-xs"> * </span>}:
						</span>
						<div className="w-full">
							<input
								className={`appearance-none block w-full p-2  border ${borderColor} rounded py-2 px-4 leading-tight focus:outline-none focus:bg-white focus:${focusColor}`}
								name={formItemName}
								type="file"
								accept={accept}
								placeholder=""
								ref={register({
									required,
									pattern: {
										value: regex,
										message: errorMessage,
									},
								})}
								disabled={disabled}
								style={inputStyle}
							/>
							{/* {formItemName && errors[formItemName] && <p className="text-red-500 text-xs italic">This is a required field.</p>} */}
							{formItemName &&
								errors[formItemName] &&
								errors[formItemName].type === 'required' && (
									<p className="text-red-500 text-xs italic">
										This is a required field.
									</p>
								)}
							{formItemName &&
								errors[formItemName] &&
								errors[formItemName].type === 'pattern' && (
									<p className="text-red-500 text-xs italic">
										{errors[formItemName].message}
									</p>
								)}
						</div>
					</div>
				</div>
			)
		case 'multiplefiles':
			return (
				<div className={className}>
					<div className="flex">
						<span
							className="font-semibold text-left px-4 w-1/4"
							style={{ whiteSpace: 'pre-line' }}
						>
							{label}
							{required && <span className="text-red-500 text-xs"> * </span>}:
						</span>
						<div className="w-full">
							<input
								className={`appearance-none block w-full p-2  border ${borderColor} rounded py-2 px-4 leading-tight focus:outline-none focus:bg-white focus:${focusColor}`}
								name={formItemName}
								type="file"
								accept={accept}
								placeholder=""
								ref={register({
									required,
									pattern: {
										value: regex,
										message: errorMessage,
									},
								})}
								disabled={disabled}
								style={inputStyle}
								multiple
							/>
							{/* {formItemName && errors[formItemName] && <p className="text-red-500 text-xs italic">This is a required field.</p>} */}
							{formItemName &&
								errors[formItemName] &&
								errors[formItemName].type === 'required' && (
									<p className="text-red-500 text-xs italic">
										This is a required field.
									</p>
								)}
							{formItemName &&
								errors[formItemName] &&
								errors[formItemName].type === 'pattern' && (
									<p className="text-red-500 text-xs italic">
										{errors[formItemName].message}
									</p>
								)}
						</div>
					</div>
				</div>
			)
		default:
			return (
				<div className={className}>
					<div className="flex">
						<span
							className="font-semibold text-left px-4 w-1/4"
							style={{ whiteSpace: 'pre-line' }}
						>
							{label}
							{required && <span className="text-red-500 text-xs"> * </span>}:
						</span>
						<textarea
							name={formItemName}
							onChange={() => null}
							className={`appearance-none block w-full bg-red-200 text-red-700 border ${borderColor} rounded py-2 px-4 overflow-y-scroll scroll-bar resize-none focus:outline-none focus:bg-white focus:${focusColor}`}
							value={inputType}
							style={{
								whiteSpace: 'pre-line',
								minHeight: '50px',
								color: disabled ? 'hsl(0,0%,60%)' : 'hsl(0,0%,20%)',
							}}
							disabled={disabled}
						/>
						{formItemName &&
							errors[formItemName] &&
							errors[formItemName].type === 'required' && (
								<p className="text-red-500 text-xs italic">
									This is a required field.
								</p>
							)}
						{formItemName &&
							errors[formItemName] &&
							errors[formItemName].type === 'pattern' && (
								<p className="text-red-500 text-xs italic">
									{errors[formItemName].message}
								</p>
							)}
					</div>
				</div>
			)
	}
}
