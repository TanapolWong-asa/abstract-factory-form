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
  createIntegrationForm(): IntegrationForm {
    return new WMIntegrationForm({});
  }
  createInterfaceForm(): InterfaceForm {
    return new WMInterfaceForm({});
  }
  createConnectionForm(): ConnectionForm {
    return new WMConnectionForm({});
  }
}

export default WMFormFactory;
