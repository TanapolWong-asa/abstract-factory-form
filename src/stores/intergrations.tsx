import {
  createContext,
  FunctionComponent,
  SetStateAction,
  useState,
} from "react";
import { IntegrationType } from "../interfaces";
import { INTEGRATIONS } from "./mockData";

export interface IIntegrationsContext {
  integrations: IntegrationType[];
  setIntegrations: React.Dispatch<SetStateAction<IntegrationType[]>>;
}
export const IntegrationsContext = createContext<IIntegrationsContext>({
  integrations: [],
  setIntegrations: () => null,
});

interface IntegrationsProviderProps {}

export const IntegrationsProvider: FunctionComponent<
  IntegrationsProviderProps
> = (props: any) => {
  const [integrations, setIntegrations] =
    useState<IntegrationType[]>(INTEGRATIONS);

  const value: IIntegrationsContext = {
    integrations: integrations,
    setIntegrations: setIntegrations,
  };
  return (
    <IntegrationsContext.Provider value={value}>
      {props.children}
    </IntegrationsContext.Provider>
  );
};
