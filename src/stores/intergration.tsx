import {
  createContext,
  FunctionComponent,
  SetStateAction,
  useState,
} from "react";

export interface IIntegrationsContext {
  integrations: Object[];
  setIntegrations: React.Dispatch<SetStateAction<Object[]>>;
}
export const IntegrationsContext = createContext<IIntegrationsContext>({
  integrations: [],
  setIntegrations: () => null,
});

interface IntegrationsProviderProps {}

export const IntegrationsProvider: FunctionComponent<
  IntegrationsProviderProps
> = (props: any) => {
  const [integrations, setIntegrations] = useState<Object[]>([]);

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
