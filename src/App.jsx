import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import './design-system/global.css';

import Landing from './pages/Landing';
import AppShell from './pages/AppShell';
import DashboardPage from './pages/DashboardPage';
import PracticePage from './pages/PracticePage';
import AssessmentsPage from './pages/AssessmentsPage';
import ResourcesPage from './pages/ResourcesPage';
import ProfilePage from './pages/ProfilePage';

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
        </Route>

        {/* Fallback */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}
