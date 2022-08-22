export interface IIntegrationData {
	integrationId: string
	integrationName: string
	technology: string
	// interfaces could be from either WM (businessTransactions) or AT (jobs), this will simplify the hassle of 'switch-case' in general class such as InterfaceSelector
	interfaces: {
		interfaceList: InterfaceType[]
	}
	lastModifiedDate?: string
	lastModifiedBy?: string
	createdDate?: string
	createdBy?: string
	newFlag?: boolean
	isDirty?: boolean
	hasError?: boolean
	dirtyFields?: any
	errorFields?: any
}

export interface IIntegrationFormData {
	technology: string
	integrationName: string
	isDirty: boolean
	hasError: boolean
	dirtyFields: any
}

export interface IWMIntegrationData extends IIntegrationData {}
export interface IWMIntegrationFormData extends IIntegrationFormData {}

export interface IATIntegrationData extends IIntegrationData {
	businessLine: string
	ATRef?: any
}
export interface IATIntegrationFormData extends IIntegrationFormData {
	businessLine: string
}

// XXX: Add other tech integration here

export type IntegrationType = IWMIntegrationData | IATIntegrationData

export interface IInterfaceData {
	interfaceId: string
	interfaceName: string
	connections: IConnectionData[]

	lastModifiedDate?: string
	lastModifiedBy?: string
	createdDate?: string
	createdBy?: string
	newFlag?: boolean
	isDirty?: boolean
	hasError?: boolean
	dirtyFields?: any
	errorFields?: any
}

export interface IInterfaceFormData {
	interfaceName: string
	isDirty: boolean
	hasError: boolean
	dirtyFields: any
}

export interface IWMInterfaceData extends IInterfaceData {
	direction: string
	businessTransactionType: string
}

export interface IWMInterfaceFormData extends IInterfaceFormData {
	direction: string
	businessTransactionType: string
}
export interface IATInterfaceData extends IInterfaceData {
	jobType: string
	notes: string
}
export interface IATInterfaceFormData extends IInterfaceFormData {
	jobType: string
	notes: string
}

// XXX: Add other tech interface here
export type InterfaceType = IWMInterfaceData | IATInterfaceData

export interface IConnectionData {
	lastModifiedDate?: string
	lastModifiedBy?: string
	createdDate?: string
	createdBy?: string
	newFlag?: boolean
	isDirty?: boolean
	hasError?: boolean
	dirtyFields?: any
	errorFields?: any
}
export interface IConnectionFormData {
	isDirty: boolean
	hasError: boolean
	dirtyFields: any
}

export interface IWMConnectionData extends IConnectionData {}
export interface IWMConnectionFormData extends IConnectionFormData {}
export interface IATConnectionData extends IConnectionData {}
export interface IATConnectionFormData extends IConnectionFormData {}

export type ConnectionData = IWMConnectionData | IATConnectionData
