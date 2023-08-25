import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Button from 'react-bootstrap/Button';
import '../App.css';
import user from '../images/user.png';
import { useState } from 'react';
import Dashboard from './Dashboard';
import { useEffect } from 'react';
function Headers() {

  const [selectedGridSize,setSelectedGridSize]=useState(2);
  const[resetStatus,setResetStatus]=useState(false);
  const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedGridSize(Number(event.target.value));
  };

  const handleResetStatus=()=>{
   setResetStatus(true);
  }

  useEffect(() => {
    if (resetStatus) {
      setResetStatus(false);
    }
  }, [resetStatus]);
  return (
    <>
    <Navbar collapseOnSelect expand="lg"  sticky='top' style={{backgroundColor:'#131313'}}>
      <Container>
        <Navbar.Brand href="#home" style={{color:'#EF305E',marginBottom:'10px'}}>POWER BI</Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="#pricing">Select Grid</Nav.Link>
            <Nav.Link href="#pricing">  
             <select className="form-select form-select-sm" style={{marginBottom:'10%'}} aria-label=".form-select-sm example" value={selectedGridSize}   onChange={handleSelectChange}>
            <option value={2} selected className='formStyle'>2x2</option>
            <option value={3} className='formStyle'>3x3</option>
         </select>
          </Nav.Link>
           
          </Nav>
          <Nav>
            <Nav.Link eventKey={2} href="#memes">
            <Button className='btnStyle' onClick={handleResetStatus}>Reset</Button>
            </Nav.Link>

            <Nav.Link href="#deets">
              <img src={user} alt='profile' width={36} height={34} style={{marginTop:2}}/>
            </Nav.Link>
                       
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
    <Dashboard selectedGridSize={selectedGridSize} resetActive={resetStatus}/>
    
    </>
  );
}

export default Headers;