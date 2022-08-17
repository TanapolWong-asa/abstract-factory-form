import React, { useEffect, useState } from "react";
import "./App.css";
import { EditPartner } from "./pages";
import ATFormFactory from "./pages/EditPartner/FormFactory/ATFormFactory";
import { FormFactory } from "./pages/EditPartner/FormFactory/FormFactory";
import WMFormFactory from "./pages/EditPartner/FormFactory/WMFormFactory";

enum Technology {
  WM = "WM",
  AT = "AT",
}

const App = () => {
  const [technology, setTechnology] = useState<string>();
  const [factory, setFactory] = useState<FormFactory>();

  useEffect(() => {
    if (technology === Technology.WM) {
      setFactory(new WMFormFactory());
    } else if (technology === Technology.AT) {
      setFactory(new ATFormFactory());
    }
  }, [technology]);

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
      {factory ? <EditPartner formFactory={factory} /> : <div>No Form</div>}
    </div>
  );
};

export default App;
