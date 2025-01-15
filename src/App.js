import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Loginpagemain from "./Login";
import Dashboardpagemain from "./Dasboard";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Loginpagemain />} />                       // yaha per humne loginpage.jsk ka funtion ka mnaam likha hai , to sabse pehle yahi page dikhega.
        <Route path="/dashboard" element={<Dashboardpagemain />} />          // yaha per humne dasboard page ka function ka naam likha hai. 
      </Routes>
    </Router>
  );
}

export default App;