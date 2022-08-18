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
}

export interface IATIntegrationData extends IIntegrationData {
  integrationId: string;
  integrationName: string;
  technology: string;
  businessLine: string;

  job: {
    jobList: any[] | undefined;
  };
  ATRef?: any;
}
export interface IATIntegrationFormData extends IIntegrationFormData {
  technology: string;
  integrationName: string;
}

export type IntegrationType = IWMIntegrationData | IATIntegrationData;
