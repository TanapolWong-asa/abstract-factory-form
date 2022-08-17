import React from "react";
import {
  IIntegrationData,
  IIntegrationFormData,
  IWMIntegrationData,
} from "../../../../interfaces";

interface IntegrationFormProps {
  partnerId: string;
  setPartnerId: Function;
  selectedIntegration: IWMIntegrationData;
  setSelectedIntegration: Function;
}

interface IntegrationFormState {
  partnerId: string;
  setPartnerId: Function;
  selectedIntegration: IWMIntegrationData;
  setSelectedIntegration: Function;
}

abstract class IntegrationForm extends React.Component<
  IntegrationFormProps,
  IntegrationFormState
> {
  constructor(props: IntegrationFormProps) {
    super(props);
    this.state = props;
    this.saveDraft = this.saveDraft.bind(this);
    this.readDraft = this.readDraft.bind(this);
    this.preprocessIntegrationInfoFormData =
      this.preprocessIntegrationInfoFormData.bind(this);
    this.generateIntegrationDraftKey =
      this.generateIntegrationDraftKey.bind(this);
  }

  protected currentStage: number = 1;
  protected saveDraft(content: string): void {
    localStorage.setItem(this.generateIntegrationDraftKey(), content);
  }
  protected readDraft(): string | null {
    return localStorage.getItem(this.generateIntegrationDraftKey());
  }
  protected abstract generateIntegrationDraftKey(): string;
  protected abstract preprocessIntegrationInfoFormData(
    selectedIntegration: IIntegrationData
  ): IIntegrationFormData;
}

export default IntegrationForm;
