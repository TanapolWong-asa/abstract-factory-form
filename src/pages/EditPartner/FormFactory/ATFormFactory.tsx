import ATConnectionForm from "./ConnectionForm/ATConnectionForm";
import ConnectionForm from "./ConnectionForm/ConnectionForm";
import { FormFactory } from "./FormFactory";
import ATIntegrationForm from "./IntegrationForm/ATIntegrationForm";
import IntegrationForm from "./IntegrationForm/IntegrationForm";
import ATInterfaceForm from "./InterfaceForm/ATInterfaceForm";
import InterfaceForm from "./InterfaceForm/InterfaceForm";

class ATFormFactory implements FormFactory {
  createIntegrationForm(): IntegrationForm {
    return new ATIntegrationForm({});
  }
  createInterfaceForm(): InterfaceForm {
    return new ATInterfaceForm({});
  }
  createConnectionForm(): ConnectionForm {
    return new ATConnectionForm({});
  }
}

export default ATFormFactory;
