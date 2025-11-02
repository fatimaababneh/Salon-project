import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Dashboard from './pages/Dashboard';
import Customers from './pages/Customers';
import Services from './pages/Services';
import Bookings from './pages/Bookings';

function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/customers" element={<Customers />} />
        <Route path="/services" element={<Services />} />
        <Route path="/bookings" element={<Bookings />} />
      </Routes>
    </Layout>
  );
}

export default App;