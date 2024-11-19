import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthLayout } from './components/AuthLayout';
import { LoginForm } from './components/LoginForm';
import { RoleSelection } from './pages/RoleSelection';
import { InternalDashboard } from './pages/InternalDashboard';
import { ExternalDashboard } from './pages/ExternalDashboard';
import { SubmitRequest } from './pages/SubmitRequest';
import { ProposalDetails } from './pages/ProposalDetails';
import { LanguageProvider } from './contexts/LanguageContext';
import { SearchPage } from './pages/SearchPage';
import { PDFServicesPage } from './pages/PDFServicesPage';

function App() {
  return (
    <LanguageProvider>
      <BrowserRouter>
        <Routes>
          <Route element={<AuthLayout />}>
            <Route path="/" element={<RoleSelection />} />
            <Route path="/login/internal" element={<LoginForm userType="internal" />} />
            <Route path="/login/external" element={<LoginForm userType="external" />} />
          </Route>
          <Route path="/internal/dashboard" element={<InternalDashboard />} />
          <Route path="/external/dashboard" element={<ExternalDashboard />} />
          <Route path="/external/submit-request" element={<SubmitRequest />} />
          <Route path="/internal/proposal/:id" element={<ProposalDetails />} />
          <Route path="/search" element={<SearchPage />} />
          <Route path="/pdf-services" element={<PDFServicesPage />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </BrowserRouter>
    </LanguageProvider>
  );
}

export default App;