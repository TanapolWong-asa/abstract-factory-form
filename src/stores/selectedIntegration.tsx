import {
  createContext,
  FunctionComponent,
  SetStateAction,
  useState,
} from "react";
import { IntegrationType, IWMIntegrationData } from "../interfaces";

const initialWMIntegrationData: IWMIntegrationData = {
  integrationId: "",
  integrationName: "",
  technology: "WM",
  businessTransaction: {
    businessTransactionList: [],
  },
};
// XXX: Add other tech integration interface here
export interface ISelectedIntegrationContext {
  partnerId: string;
  setPartnerId: React.Dispatch<SetStateAction<string>>;
  selectedIntegration: IntegrationType;
  setSelectedIntegration: React.Dispatch<SetStateAction<IntegrationType>>;
}
export const SelectedIntegrationContext =
  createContext<ISelectedIntegrationContext>({
    partnerId: "",
    setPartnerId: () => null,
    selectedIntegration: initialWMIntegrationData,
    setSelectedIntegration: () => null,
  });

interface SelectedIntegrationProviderProps {}

export const SelectedIntegrationProvider: FunctionComponent<
  SelectedIntegrationProviderProps
> = (props: any) => {
  const [selectedIntegration, setSelectedIntegration] =
    useState<IntegrationType>(initialWMIntegrationData);
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
