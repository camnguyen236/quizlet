import React from 'react';
import {
    Routes,
    Route,
} from "react-router-dom";
import PageName from './pages/pageName/PageName'
import Home from './pages/home/Home'

function App() {
  return (
      <div className="App">
          <Routes>
              <Route path="/" element={<PageName/>} />
              <Route path="/latest" element={<Home/>} />
          </Routes>
      </div>
  );
}

export default App;
