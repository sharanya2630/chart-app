import React, { useState } from "react";
import Chart from "./components/Chart";
import TimeframeSelector from "./components/TimeframeSelector";
import "./App.css";

const App: React.FC = () => {
  const [timeframe, setTimeframe] = useState<string>("daily");

  return (
    <div className="App">
      <h1 className="heading">Social Media Users</h1>
      <TimeframeSelector onSelect={setTimeframe} />
      <div className="chart-container">
        <Chart timeframe={timeframe} />
      </div>
    </div>
  );
};

export default App;
