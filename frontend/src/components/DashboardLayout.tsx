// components/DashboardLayout.tsx

import { useState } from 'react';
import CompanyProfile from '../pages/dashboard/profile';
import MyTenders from '../pages/dashboard/tenders';
import MyApplications from '../pages/dashboard/applications';

export default function DashboardLayout() {
  const [activeTab, setActiveTab] = useState<'profile' | 'tenders' | 'applications'>('profile');

  const renderContent = () => {
    switch (activeTab) {
      case 'tenders':
        return <MyTenders />;
      case 'applications':
        return <MyApplications />;
      default:
        return <CompanyProfile />;
    }
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row">
      {/* Sidebar */}
      <aside className="w-full md:w-64 bg-gray-800 text-white px-4 py-6">
        <h2 className="text-xl font-semibold mb-6">Dashboard</h2>
        <nav className="flex md:flex-col gap-3">
          <button
            onClick={() => setActiveTab('profile')}
            className={`px-4 py-2 rounded text-left cursor-pointer ${
              activeTab === 'profile' ? 'bg-blue-600' : 'bg-gray-700'
            }`}
          >
            Company Profile
          </button>
          <button
            onClick={() => setActiveTab('tenders')}
            className={`px-4 py-2 rounded text-left cursor-pointer ${
              activeTab === 'tenders' ? 'bg-blue-600' : 'bg-gray-700'
            }`}
          >
            My Tenders
          </button>
          <button
            onClick={() => setActiveTab('applications')}
            className={`px-4 py-2 rounded text-left cursor-pointer ${
              activeTab === 'applications' ? 'bg-blue-600' : 'bg-gray-700'
            }`}
          >
            My Applications
          </button>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6 bg-gray-100">{renderContent()}</main>
    </div>
  );
}
