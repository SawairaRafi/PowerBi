
import React, { useState } from 'react';
import Layout from "./Layout";
import '../App.css';
import { useEffect } from 'react';

interface DashboardProps {
  selectedGridSize: number;
  resetActive:boolean;
}

const Dashboard: React.FC<DashboardProps> = ({ selectedGridSize ,resetActive}) => {
  const [activePoints, setActivePoints] = useState<string[]>([]);

  const handleChartClick = (id: string) => {
    if (activePoints.includes(id)) {
      setActivePoints(activePoints.filter(pointId => pointId !== id));
    } else {
      setActivePoints([...activePoints, id]);
    }
  };

  useEffect(() => {
    if (resetActive) {
      setActivePoints([]); 
    }
  }, [resetActive]); 

  return (
    <div className="DashboardStyle">
    
      <Layout gridSize={selectedGridSize} activePoints={activePoints} handleChartClick={handleChartClick} />
    </div>
  );
};

export default Dashboard;
