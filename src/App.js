import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Loginpagemain from "./Login";
import Dashboardpagemain from "./Dasboard";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Loginpagemain />} />                      
        <Route path="/dashboard" element={<Dashboardpagemain />} />         
      </Routes>
    </Router>
  );
}

export default App;