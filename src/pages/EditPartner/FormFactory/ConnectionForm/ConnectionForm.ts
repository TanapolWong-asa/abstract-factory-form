import { FormItem } from '../../Form/interfaces'
import DraftableForm, { DraftableFormProps, DraftableFormStates } from '../DraftableForm'

interface ConnectionFormProps extends DraftableFormProps {}

interface ConnectionFormState extends DraftableFormStates {}
abstract class ConnectionForm extends DraftableForm<ConnectionFormProps, ConnectionFormState> {
	protected currentStage = 3

	constructor(props: ConnectionFormProps) {
		super(props)
		// this.preprocessConnectionsInfoFormData = this.preprocessConnectionsInfoFormData.bind(this)
		this.generateFormList = this.generateFormList.bind(this)
	}

	// protected abstract preprocessConnectionsInfoFormData(
	// 	selectedConnections: ConnectionDataType[],
	// ): ConnectionFormType

	protected abstract generateFormList(): FormItem[]
}

export default ConnectionForm
