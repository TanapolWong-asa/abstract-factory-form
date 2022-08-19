import React from 'react'

interface IntegrationFormProps {}

interface IntegrationFormState {}

abstract class IntegrationForm extends React.Component<IntegrationFormProps, IntegrationFormState> {
	protected currentStage = 1
}

export default IntegrationForm
