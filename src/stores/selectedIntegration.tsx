import {
  createContext,
  FunctionComponent,
  SetStateAction,
  useState,
} from "react";

export interface ISelectedIntegrationContext {
  partnerId: string;
  setPartnerId: React.Dispatch<SetStateAction<string>>;
  selectedIntegration: Object;
  setSelectedIntegration: React.Dispatch<SetStateAction<Object>>;
}
export const SelectedIntegrationContext =
  createContext<ISelectedIntegrationContext>({
    partnerId: "",
    setPartnerId: () => null,
    selectedIntegration: {},
    setSelectedIntegration: () => null,
  });

interface SelectedIntegrationProviderProps {}

export const SelectedIntegrationProvider: FunctionComponent<
  SelectedIntegrationProviderProps
> = (props: any) => {
  const [selectedIntegration, setSelectedIntegration] = useState<Object>({});
  const [partnerId, setPartnerId] = useState<string>("");

  const value: ISelectedIntegrationContext = {
    partnerId: partnerId,
    setPartnerId: setPartnerId,
    selectedIntegration: selectedIntegration,
    setSelectedIntegration: setSelectedIntegration,
  };
  return (
    <SelectedIntegrationContext.Provider value={value}>
      {props.children}
    </SelectedIntegrationContext.Provider>
  );
};
