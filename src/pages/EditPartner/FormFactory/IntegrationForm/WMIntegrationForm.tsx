import { useCallback, useContext, useEffect } from "react";
import { useForm } from "react-hook-form";
import {
  IWMIntegrationData,
  IWMIntegrationFormData,
} from "../../../../interfaces";
import {
  ISelectedIntegrationContext,
  SelectedIntegrationContext,
} from "../../../../stores/selectedIntegration";
import { InputType, RenderFormItemByType } from "../../Form";
import IntegrationForm from "./IntegrationForm";

class WMIntegrationForm extends IntegrationForm {
  protected generateIntegrationDraftKey(): string {
    const {
      partnerId,
      selectedIntegration: { integrationId },
    } = this.state;

    return `${partnerId}-${integrationId}-WMIntegrationDraft`;
  }
  protected preprocessIntegrationInfoFormData(
    selectedIntegration: IWMIntegrationData
  ): IWMIntegrationFormData {
    const draft = JSON.parse(this.readDraft() || "{}");
    const allDirtyFields = {
      ...selectedIntegration.dirtyFields,
      ...(draft as any)["dirtyFields"],
    };

    const processedFormData = {
      technology: selectedIntegration.technology,
      integrationName:
        (draft as any)["integrationName"] ||
        selectedIntegration.integrationName,
      isDirty: selectedIntegration.isDirty || false,
      hasError: selectedIntegration.hasError || false,
      dirtyFields: allDirtyFields,
    };
    this.saveDraft(JSON.stringify(processedFormData));

    return processedFormData;
  }
  render() {
    return (
      <Form
        preprocessIntegrationInfoFormData={
          this.preprocessIntegrationInfoFormData
        }
        // selectedIntegration={this.state.selectedIntegration}
        saveDraft={this.saveDraft}
        readDraft={this.readDraft}
      />
    );
  }
}
WMIntegrationForm.contextType = SelectedIntegrationContext;

export default WMIntegrationForm;

interface FormProps {
  preprocessIntegrationInfoFormData: (
    selectedIntegration: IWMIntegrationData
  ) => IWMIntegrationFormData;
  // selectedIntegration: IWMIntegrationData;
  saveDraft: Function;
  readDraft: Function;
}
const Form: React.FC<FormProps> = ({
  saveDraft,
  readDraft,
}: // selectedIntegration,

// preprocessIntegrationInfoFormData,
FormProps) => {
  const context = useContext<ISelectedIntegrationContext>(
    SelectedIntegrationContext
  );
  const { register, setValue, getValues, control, formState, trigger } =
    useForm<IWMIntegrationFormData>();
  const formList = [
    {
      id: 1,
      inputType: "text",
      label: "Technology",
      formItemName: "technology",
      defaultValue: "WM",
      required: true,
      disabled: true,
      regex: /./i,
      errorMessage: "This is a required Field.",
    },
    {
      id: 2,
      inputType: "text",
      label: "Integration Name",
      formItemName: "integrationName",
      defaultValue: "",
      required: true,
      disabled: false,
      regex: /./i,
      errorMessage: "This is a required Field.",
    },
  ];
  const getKeyValue =
    <T extends object, U extends keyof T>(obj: T) =>
    (key: U) =>
      obj[key];

  const resetForm = useCallback(() => {
    let isDirty =
      context.selectedIntegration.isDirty ||
      context.selectedIntegration.hasError;
    if (isDirty === true) {
      trigger();
    } else {
      formState.errors = {};
      formState.isDirty = false;
    }
  }, [context.selectedIntegration]);
  useEffect(() => resetForm(), [resetForm]);

  const preprocessIntegrationInfoFormData = (
    selectedIntegration: IWMIntegrationData
  ): IWMIntegrationFormData => {
    const draft = JSON.parse(readDraft() || "{}");
    const allDirtyFields = {
      ...selectedIntegration.dirtyFields,
      ...(draft as any)["dirtyFields"],
    };

    const processedFormData = {
      technology: selectedIntegration.technology,
      integrationName:
        (draft as any)["integrationName"] ||
        selectedIntegration.integrationName,
      isDirty: selectedIntegration.isDirty || false,
      hasError: selectedIntegration.hasError || false,
      dirtyFields: allDirtyFields,
    };
    saveDraft(JSON.stringify(processedFormData));

    return processedFormData;
  };

  // set form data to be draft data (first time only)
  useEffect(() => {
    updateSelectedIntegration(
      preprocessIntegrationInfoFormData(context.selectedIntegration)
    );
  }, []);

  // update form fields
  useEffect(() => {
    const integrationInfoFormData: IWMIntegrationFormData =
      preprocessIntegrationInfoFormData(context.selectedIntegration);
    const keys = Object.keys(integrationInfoFormData);
    formList.forEach((item: { formItemName: string; defaultValue: string }) => {
      keys.forEach((key: any) => {
        if (key === item.formItemName) {
          const value: string = getKeyValue(integrationInfoFormData)(key);
          const k = item.formItemName as keyof IWMIntegrationFormData;
          setValue(k, value || item.defaultValue);
        }
      });
    });
    resetForm();
  }, [context.selectedIntegration]);

  // update selectedIntegration from context
  const updateSelectedIntegration = (
    integrationFormData: IWMIntegrationFormData
  ) => {
    saveDraft(JSON.stringify(integrationFormData));
    const draft = JSON.parse(readDraft() || "{}");
    const allDirtyFields = {
      ...(integrationFormData.dirtyFields || {}),
      ...(draft as any)["dirtyFields"],
    };

    const hasError = Object.keys(formState.errors).length !== 0;
    const newErrorFields = Object.keys(formState.errors) || [];
    const newDirtyFields = {
      ...context.selectedIntegration.dirtyFields,
      ...formState.dirtyFields,
      ...allDirtyFields,
    };
    const updatedWMIntegrationData: IWMIntegrationData = {
      ...context.selectedIntegration,
      integrationName: integrationFormData.integrationName,
      isDirty: true,
      hasError: hasError,
      dirtyFields: newDirtyFields,
      errorFields: newErrorFields,
    };
    context.setSelectedIntegration(updatedWMIntegrationData);
  };

  return (
    <form
      onChange={() => {
        trigger();
        updateSelectedIntegration(getValues());
      }}
    >
      {formList.map((formItem: any) => {
        const inputType = formItem.inputType as InputType;
        return (
          <RenderFormItemByType
            register={register}
            formItemName={formItem.formItemName}
            key={formItem.id}
            className="mb-2"
            inputType={inputType}
            options={formItem.options}
            label={formItem.label}
            formState={formState}
            required={formItem.required}
            regex={formItem.regex}
            disabled={formItem.disabled}
            errorMessage={formItem.errorMessage}
            dirtyFields={context.selectedIntegration.dirtyFields}
            control={control}
          />
        );
      })}
    </form>
  );
};
