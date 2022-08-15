import ConnectionForm from "./ConnectionForm/ConnectionForm";
import IntegrationForm from "./IntegrationForm/IntegrationForm";
import InterfaceForm from "./InterfaceForm/InterfaceForm";

export interface FormFactory {
  createIntegrationForm(): IntegrationForm;
  createInterfaceForm(): InterfaceForm;
  createConnectionForm(): ConnectionForm;
}
