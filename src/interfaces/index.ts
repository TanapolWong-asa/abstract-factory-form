export interface IIntegrationData {
  lastModifiedDate?: string;
  lastModifiedBy?: string;
  createdDate?: string;
  createdBy?: string;
  newFlag?: boolean;
  isDirty?: boolean;
  hasError?: boolean;
  dirtyFields?: any;
  errorFields?: any;
}

export interface IIntegrationFormData {
  isDirty: boolean;
  hasError: boolean;
  dirtyFields: any;
}

export interface IWMIntegrationData extends IIntegrationData {
  integrationId: string;
  integrationName: string;
  technology: string;
  businessTransaction: {
    businessTransactionList: any[]; //IWMInterface[];
  };
}
export interface IWMIntegrationFormData extends IIntegrationFormData {
  technology: string;
  integrationName: string;

  isDirty: boolean;
  hasError: boolean;
  dirtyFields: any;
}
