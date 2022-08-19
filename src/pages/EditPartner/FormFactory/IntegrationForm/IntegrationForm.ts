import React from 'react'

import { SelectedIntegrationContext } from '../../../../stores/selectedIntegration'
import DraftableForm from '../DraftableForm'

interface IntegrationFormProps {}

interface IntegrationFormState {}

// This class for now act like a marker interface (might add something later)
abstract class IntegrationForm extends DraftableForm {
	protected currentStage = 1 // might be useless
}

IntegrationForm.contextType = SelectedIntegrationContext

export default IntegrationForm
