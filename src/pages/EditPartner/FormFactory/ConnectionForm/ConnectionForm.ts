import React from "react";

interface ConnectionFormProps {}

interface ConnectionFormState {}

abstract class ConnectionForm extends React.Component<
  ConnectionFormProps,
  ConnectionFormState
> {
  protected currentStage: number = 2;
}

export default ConnectionForm;
