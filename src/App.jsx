import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import './design-system/global.css';

import Landing from './pages/Landing';
import AppShell from './pages/AppShell';
import DashboardPage from './pages/DashboardPage';
import PracticePage from './pages/PracticePage';
import AssessmentsPage from './pages/AssessmentsPage';
import ResourcesPage from './pages/ResourcesPage';
import ProfilePage from './pages/ProfilePage';
import PrpTestPage from './pages/PrpTestPage';
import PrpShipPage from './pages/PrpShipPage';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Landing page */}
        <Route path="/" element={<Landing />} />

        {/* Dashboard area with sidebar shell */}
        <Route element={<AppShell />}>
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/practice" element={<PracticePage />} />
          <Route path="/assessments" element={<AssessmentsPage />} />
          <Route path="/resources" element={<ResourcesPage />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/prp/07-test" element={<PrpTestPage />} />
          <Route path="/prp/08-ship" element={<PrpShipPage />} />
        </Route>

        {/* Fallback */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}
