import React, { useState, useEffect } from "react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { Box, Modal, Typography } from "@mui/material";

interface DataPoint {
  timestamp: string;
  value: number;
}

interface ChartProps {
  timeframe: string;
}

const Chart: React.FC<ChartProps> = ({ timeframe }) => {
  const [data, setData] = useState<DataPoint[]>([]);
  const [selectedData, setSelectedData] = useState<DataPoint | null>(null);
  const [modalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await fetch("/data.json");
        const json = await result.json();
        setData(json);
        console.log("Fetched Data:", json); 
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);

  const handleClick = (data: DataPoint) => {
    setSelectedData(data);
    setModalOpen(true);
  };

  const handleClose = () => setModalOpen(false);

  const filterDataByTimeframe = (timeframe: string): DataPoint[] => {
    const today = new Date();

    if (timeframe === "daily") {
      const filteredDailyData = data.filter((point) => {
        const pointDate = new Date(point.timestamp);
        // return isSameDay(pointDate, today);
        return data; 
      });
      return filteredDailyData;
      
    } else if (timeframe === "weekly") {
      const endOfWeek = new Date(today.getTime() - (today.getDay() === 0 ? 7 : today.getDay()) * 24 * 60 * 60 * 1000); 
      const filteredWeeklyData = data.filter((point) => {
        const pointDate = new Date(point.timestamp);
        // return pointDate > endOfWeek && pointDate <= today;
        return data; 
    });
      console.log("Filtered Data (Weekly):", filteredWeeklyData);
      return filteredWeeklyData;
    } else if (timeframe === "monthly") {
      console.log("Filtered Data (Monthly):", data);
      return data; 
    }

    return data;
  };

  const isSameDay = (date1: Date, date2: Date): boolean => {
    return (
      date1.getFullYear() === date2.getFullYear() &&
      date1.getMonth() === date2.getMonth() &&
      date1.getDate() === date2.getDate()
    );
  };

  const filteredData = filterDataByTimeframe(timeframe);
  console.log("Timeframe:", timeframe);
  console.log("Filtered Data:", filteredData); // Log filtered data to verify

  return (
    <div>
      <ResponsiveContainer width="100%" height={400}>
        <LineChart
          data={filteredData}
          onClick={(e) => {
            if (e && e.activePayload && e.activePayload[0]) {
              handleClick(e.activePayload[0].payload);
            }
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="timestamp" />
          <YAxis />
          <Tooltip />
          <Line type="monotone" dataKey="value" stroke="#8884d8" activeDot={{ r: 8 }} />
        </LineChart>
      </ResponsiveContainer>

      <Modal open={modalOpen} onClose={handleClose}>
        <Box>
          <Typography variant="h6" component="h2">
            Selected Data
          </Typography>
          {selectedData && (
            <Typography>
              Timestamp: {selectedData.timestamp}, Value: {selectedData.value}
            </Typography>
          )}
        </Box>
      </Modal>
    </div>
  );
};

export default Chart;
