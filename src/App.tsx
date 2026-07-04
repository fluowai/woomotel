/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useState, useEffect } from 'react';
import Layout from './components/Layout';
import Dashboard from './components/Dashboard';
import FrontDesk from './components/FrontDesk';
import Housekeeping from './components/Housekeeping';
import Inventory from './components/Inventory';
import Finance from './components/Finance';
import Settings from './components/Settings';
import Auth from './components/Auth';
import Reports from './components/Reports';
import Packages from './components/Packages';

const queryClient = new QueryClient();

export default function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(true); // Mock auth for now

  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <Routes>
          <Route path="/auth" element={<Auth onLogin={() => setIsAuthenticated(true)} />} />
          
          <Route
            path="/"
            element={
              isAuthenticated ? (
                <Layout />
              ) : (
                <Navigate to="/auth" replace />
              )
            }
          >
            <Route index element={<Dashboard />} />
            <Route path="front-desk" element={<FrontDesk />} />
            <Route path="housekeeping" element={<Housekeeping />} />
            <Route path="inventory" element={<Inventory />} />
            <Route path="packages" element={<Packages />} />
            <Route path="finance" element={<Finance />} />
            <Route path="reports" element={<Reports />} />
            <Route path="settings" element={<Settings />} />
          </Route>
        </Routes>
      </Router>
    </QueryClientProvider>
  );
}

