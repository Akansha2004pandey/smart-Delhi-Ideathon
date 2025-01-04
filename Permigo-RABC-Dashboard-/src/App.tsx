import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import DashboardLayout from './components/layout/DashboardLayout';
import Dashboard from './pages/Dashboard';
import Users from './pages/Users';
import Roles from './pages/MapControl';
import Permissions from './pages/Permissions';
import AnimatedCursor from 'react-animated-cursor';
import MapControl from './pages/MapControl';

function App() {
  return (
    
    <Router>
 <AnimatedCursor
      innerSize={8}
      outerSize={8}
      color='65,45,200'
      outerAlpha={0.2}
      innerScale={0.7}
      outerScale={5}
      clickables={[
        'a',
        'input[type="text"]',
        'input[type="email"]',
        'input[type="number"]',
        'input[type="submit"]',
        'input[type="image"]',
        'label[for]',
        'select',
        'textarea',
        'button',
        '.link',
        {
          target: '.custom',
          options: {
            innerSize: 12,
            outerSize: 12,
            color: '58,45,163',
            outerAlpha: 0.3,
            innerScale: 0.7,
            outerScale: 5
          }
        }
      ]}
    />
      <Routes>
        <Route path="/" element={<DashboardLayout />}>
          <Route index element={<Dashboard />} />
          <Route path="camera" element={<Users />} />
          <Route path="map" element={<MapControl />} />
          <Route path="permissions" element={<Permissions />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;