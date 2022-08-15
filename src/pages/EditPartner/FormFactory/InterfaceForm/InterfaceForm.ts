import React from "react";

interface InterfaceFormProps {}

interface InterfaceFormState {}

abstract class InterfaceForm extends React.Component<
  InterfaceFormProps,
  InterfaceFormState
> {
  protected currentStage = 2;
}

export default InterfaceForm;
