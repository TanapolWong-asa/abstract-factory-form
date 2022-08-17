export interface IIntegrationData {}

export interface IIntegrationFormData {
  isDirty: boolean;
  hasError: boolean;
  dirtyFields: any;
}

export interface IWMIntegrationData extends IIntegrationData {
  integrationId: string;
  integrationName: string;
  technology: string;
  lastModifiedDate?: string;
  lastModifiedBy?: string;
  createdDate?: string;
  createdBy?: string;
  businessTransaction: {
    businessTransactionList: any[]; //IWMInterface[];
  };
  newFlag?: boolean;
  isDirty?: boolean;
  hasError?: boolean;
  dirtyFields?: any;
  errorFields?: any;
}
export interface IWMIntegrationFormData extends IIntegrationFormData {
  technology: string;
  integrationName: string;

  isDirty: boolean;
  hasError: boolean;
  dirtyFields: any;
}
