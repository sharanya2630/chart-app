// TimeframeSelector.tsx

import React from "react";
import { Button } from "@mui/material";
import "../App.css"; // Import app.css for global styles

interface TimeframeSelectorProps {
  onSelect: (timeframe: string) => void;
}

const TimeframeSelector: React.FC<TimeframeSelectorProps> = ({ onSelect }) => {
  return (
    <div className="timeframe-selector-container container">
      <div className="timeframe-selector">
        {/* <Button variant="contained" color="primary" onClick={() => onSelect("daily")}>
          Daily
        </Button> */}
        {/* <Button variant="contained" color="primary" onClick={() => onSelect("weekly")}>
          Weekly
        </Button>
        <Button variant="contained" color="primary" onClick={() => onSelect("monthly")}>
          Monthly
        </Button> */}
      </div>
    </div>
  );
};

export default TimeframeSelector;
