import React, { useContext, useEffect, useState } from "react";
import "./App.css";
import { IntegrationSelector } from "./components/";
import { IATIntegrationData } from "./interfaces";
import { EditPartner } from "./pages";
import ATFormFactory from "./pages/EditPartner/FormFactory/ATFormFactory";
import { FormFactory } from "./pages/EditPartner/FormFactory/FormFactory";
import WMFormFactory from "./pages/EditPartner/FormFactory/WMFormFactory";
import {
  ISelectedIntegrationContext,
  SelectedIntegrationContext,
} from "./stores/selectedIntegration";

enum Technology {
  WM = "WM",
  AT = "AT",
}

const App = () => {
  const [technology, setTechnology] = useState<string>("");
  const [factory, setFactory] = useState<FormFactory>();
  const {
    partnerId,
    setPartnerId,
    selectedIntegration,
    setSelectedIntegration,
  } = useContext<ISelectedIntegrationContext>(SelectedIntegrationContext);

  useEffect(() => {
    if (technology === Technology.WM) {
      setFactory(new WMFormFactory());
    } else if (technology === Technology.AT) {
      // TODO: Edit this to follow WMFormFactory
      setFactory(
        new ATFormFactory({
          partnerId,
          setPartnerId,
          selectedIntegration: selectedIntegration as IATIntegrationData,
          setSelectedIntegration,
        })
      );
    }
  }, [technology, selectedIntegration]);

  return (
    <div className="App">
      <select
        onChange={(e) => setTechnology(e.target.value)}
        defaultValue="default"
      >
        {Object.values(Technology).map((technology) => (
          <option key={technology} value={technology}>
            {technology}
          </option>
        ))}
        <option value="default" disabled hidden>
          Select techonology...
        </option>
      </select>
      {technology !== "" && <IntegrationSelector technology={technology} />}
      {
        // HACK: don't check for null integration like this in dev (for quick hack only)
        factory && selectedIntegration.integrationId !== "" ? (
          <EditPartner formFactory={factory} />
        ) : (
          <div>No Form</div>
        )
      }
    </div>
  );
};

export default App;
