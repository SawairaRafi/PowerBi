

import React from 'react';
import Cards from "./Cards";

interface LayoutProps {
  gridSize: number;
  activePoints: string[];
  handleChartClick: (id: string) => void;
}

const Layout: React.FC<LayoutProps> = ({ gridSize, activePoints, handleChartClick }) => {
  const renderGrid = () => {
    const grid = [];

    for (let i = 0; i < gridSize; i++) {
      const row = [];

      for (let j = 0; j < gridSize; j++) {
        row.push(
          <div key={j} className="col-sm">
            <Cards activePoints={activePoints} handleChartClick={handleChartClick} />
          </div>
        );
      }

      grid.push(
        <div key={i} className="row">
          {row}
        </div>
      );
    }

    return grid;
  };

  return <div className="container">{renderGrid()}</div>;
}

export default Layout;
