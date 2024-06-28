import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Root from "./componente/Root";
import Home from './componente/Home'
import Coin from './componente/Coin'
import Favorites from './componente/Favorites'


function App() {
  return (
    <Router>
      <div className="HomePage">
        <Routes>
          <Route path="/" element={<Root />} >
            <Route path="/" element={<Home />} />
            <Route path="/Coin/:id" element={<Coin />} />
            <Route path="/Favorites" element={<Favorites />} />
          </Route>
        </Routes>
      </div>
    </Router>
  );
}

export default App;
