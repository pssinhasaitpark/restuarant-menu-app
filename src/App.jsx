import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { LandingPage,MenusLayout,AllResturantLayout,WhislistLayouts,YourOrderLayout,YourProfileLayout,YourActivityLayout,QrMenuLayout } from './Views/Layouts/index';
import './App.css';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/menu/:restaurantId" element={<MenusLayout />} />
          <Route path="allresturant" element={<AllResturantLayout />} />
          <Route path="whislist" element={<WhislistLayouts />} />
          <Route path="order" element={<YourOrderLayout />} />
          <Route path="profile" element={<YourProfileLayout />} />
          <Route path="activity" element={<YourActivityLayout />} />
          <Route path="qrmenu" element={<QrMenuLayout />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
