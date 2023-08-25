
import React, { useState } from 'react';
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  Cell,
  ResponsiveContainer
} from 'recharts';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Modal from 'react-bootstrap/Modal';

interface CardsProps {
  activePoints: string[];
  handleChartClick: (id: string) => void;
}
const generateRandomData = (length: number) => {
  return Array.from({ length }, (_, index) => ({
    id: String.fromCharCode(65 + index),
    name: String.fromCharCode(65 + index),
    value: Math.floor(Math.random() * 50) + 10,
  }));
};

const data= generateRandomData(5);
const Cards: React.FC<CardsProps> = ({ activePoints, handleChartClick }) => {
  const [show, setShow] = useState(false);
  const [clicked, setClicked] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
 
 
  const [selectedOption, setSelectedOption] = useState('0');

  const handlePlot = () => {
    handleClose();
    setClicked(true);
  }

  const handleOptionChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedOption(event.target.value);
  };

  const syncedFill = (id: string) => {
    return activePoints.includes(id) ? '#EF305E' : '#8884d8';
  };

  const CustomizedDot: React.FC<any> = (props) => {
    const { cx, cy, data, index } = props;
    const entry = data[index];

    const isSelected = activePoints.includes(entry.id);

    return (
      <circle
        cx={cx}
        cy={cy}
        r={9}
        fill={isSelected ? '#EF305E' : '#8884d8'}
        onClick={() => handleChartClick(entry.id)}
        cursor="pointer"
      />
    );
  };

  return (
    <>
    
      <Card style={{ minWidth: '100%', minHeight: '270px', marginTop: 20, marginBottom: 40 }}>
        <Card.Body>
          {selectedOption !== "2" && selectedOption !== "1" ? <Button className='dashbtn' onClick={handleShow}>Add a graph</Button> : null}
          {clicked && selectedOption === '1' ?  
          
         
          <ResponsiveContainer width="90%" height='85%'>
            <LineChart width={400} height={300} data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line
            type="monotone"
            dataKey="value"
            stroke="black"
            dot={({ cx, cy, index ,}) => (
              <CustomizedDot
                cx={cx}
                cy={cy}
                index={index}
                data={data}
                
              />
            )}
          />
        </LineChart>
          </ResponsiveContainer>
          : null}


          {clicked && selectedOption === '2' ? 
          
         <ResponsiveContainer width="90%" aspect={2}>
           
           <BarChart width={400} height={300} data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="value">
            {data.map((entry) => (
              <Cell
                key={`cell-${entry.id}`}
                fill={syncedFill(entry.id)}
                onClick={() => handleChartClick(entry.id)}
              />
            ))}
          </Bar>
        </BarChart>
         </ResponsiveContainer>
        
        
        
        : null}
        
        {/* Rest of the modal code */}
        
        </Card.Body>
      </Card>
      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>Add Graph</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <select className="form-select form-select-sm" style={{ marginBottom: '10%' }} aria-label=".form-select-sm example" onChange={handleOptionChange}>
            <option selected className='formStyle'>Add Graph</option>
            <option value="1" className='formStyle'>Line</option>
            <option value="2" className='formStyle'>Bar</option>
          </select>
          <Button className='dashbtn' style={{ width: '100%' }} onClick={handlePlot}>Plot</Button>
        </Modal.Body>
      </Modal>
    </>
  );
}

export default Cards;