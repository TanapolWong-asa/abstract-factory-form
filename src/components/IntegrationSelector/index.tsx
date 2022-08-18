import { FunctionComponent, useContext, useEffect, useState } from "react";
import { IntegrationType } from "../../interfaces";
import {
  IIntegrationsContext,
  IntegrationsContext,
} from "../../stores/intergrations";
import {
  ISelectedIntegrationContext,
  SelectedIntegrationContext,
} from "../../stores/selectedIntegration";

interface IntegrationSelectorProps {
  technology: string;
}

const IntegrationSelector: FunctionComponent<IntegrationSelectorProps> = ({
  technology,
}: IntegrationSelectorProps) => {
  const { integrations } =
    useContext<IIntegrationsContext>(IntegrationsContext);
  const { setSelectedIntegration } = useContext<ISelectedIntegrationContext>(
    SelectedIntegrationContext
  );

  const [filteredIntegrations, setFilteredIntegrations] = useState<
    IntegrationType[]
  >([]);

  useEffect(() => {
    setFilteredIntegrations(
      integrations.filter(
        (integration) => integration.technology === technology
      )
    );
  }, [technology, integrations]);

  return (
    <select
      onChange={(e) => {
        setSelectedIntegration(
          integrations.find(
            (integration) => integration.integrationId === e.target.value
          )!
        );
      }}
      defaultValue="default"
    >
      {filteredIntegrations.map((integration) => (
        <option
          key={integration.integrationId}
          value={integration.integrationId}
        >
          {integration.integrationName || "Untitled Integration"}
        </option>
      ))}
      <option value="default" disabled hidden>
        Select {technology} integration...
      </option>
    </select>
  );
};

export default IntegrationSelector;
