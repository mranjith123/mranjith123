import React from "react";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';  // Import from react-router-dom


import Profile from "./Components/Profile";

import Prac from "./Components/Prac";
import Sidebar from "./Components/SideBar";
// import Accounts from "./Components/Accounts";
import Mobile from "./Components/Mobile";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/prac" element={<Prac/>} />
        <Route path="/profile" element={<Profile/>}/>
        <Route path="/Sidebar" element={<Sidebar/>}/>
        <Route path="/Mobile" element={<Mobile/>}/>
        
      </Routes>
    </Router>
  );
};

export default App;
