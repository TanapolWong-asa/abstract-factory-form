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
	isDirty: boolean
	hasError: boolean
	dirtyFields: any
}

export interface IWMIntegrationData extends IIntegrationData {}
export interface IWMIntegrationFormData extends IIntegrationFormData {
	technology: string
	integrationName: string
}

export interface IATIntegrationData extends IIntegrationData {
	businessLine: string
	ATRef?: any
}
export interface IATIntegrationFormData extends IIntegrationFormData {
	technology: string
	integrationName: string
	businessLine: string
}

// XXX: Add other tech integration here

export type IntegrationType = IWMIntegrationData | IATIntegrationData

// TODO: Change this
export interface IInterfaceData {
	interfaceId: string
	interfaceName: string
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

// TODO: Change this

export interface IInterfaceFormData {
	isDirty: boolean
	hasError: boolean
	dirtyFields: any
}

export interface IWMInterfaceData extends IInterfaceData {}
export interface IATInterfaceData extends IInterfaceData {}

// XXX: Add other tech interface here
export type InterfaceType = IWMInterfaceData | IATInterfaceData
