import React from "react";
import { IWMIntegrationData } from "../../../interfaces";
import ConnectionForm from "./ConnectionForm/ConnectionForm";
import WMConnectionForm from "./ConnectionForm/WMConnectionForm";
import { FormFactory } from "./FormFactory";
import IntegrationForm from "./IntegrationForm/IntegrationForm";
import WMIntegrationForm from "./IntegrationForm/WMIntegrationForm";
import InterfaceForm from "./InterfaceForm/InterfaceForm";
import WMInterfaceForm from "./InterfaceForm/WMInterfaceForm";

class WMFormFactory implements FormFactory {
  props: Object = {};

  constructor({
    partnerId,
    setPartnerId,
    selectedIntegration,
    setSelectedIntegration,
  }: {
    partnerId: string;
    setPartnerId: Function;
    selectedIntegration: IWMIntegrationData;
    setSelectedIntegration: Function;
  }) {
    this.props = {
      partnerId,
      setPartnerId,
      selectedIntegration,
      setSelectedIntegration,
    };
  }

  createIntegrationForm(): IntegrationForm {
    return new WMIntegrationForm({
      partnerId: (this.props as any)["partnerId"],
      setPartnerId: (this.props as any)["setPartnerId"],
      selectedIntegration: (this.props as any)["selectedIntegration"],
      setSelectedIntegration: (this.props as any)["setSelectedIntegration"],
    });
  }
  createInterfaceForm(): InterfaceForm {
    return new WMInterfaceForm(this.props);
  }
  createConnectionForm(): ConnectionForm {
    return new WMConnectionForm(this.props);
  }
}

export default WMFormFactory;
