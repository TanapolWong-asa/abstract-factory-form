// eslint-disable-next-line @typescript-eslint/no-unused-vars
import React from 'react'

import { SelectedIntegrationContext } from '../../../../stores/selectedIntegration'
import DraftableForm from '../DraftableForm'

// This class for now act like a marker interface (might add something later)
// TODO: Add preprocessIntegrationInfoFormData as abstract method?
// TODO: Add generateFormList()?
abstract class IntegrationForm extends DraftableForm {
	protected currentStage = 1 // might be useless
}
IntegrationForm.contextType = SelectedIntegrationContext

export default IntegrationForm
