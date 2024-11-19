import React from 'react';
import { Header } from '../components/InternalDashboard/Header';
import { FilterBar } from '../components/InternalDashboard/FilterBar';
import { RequestsTable } from '../components/InternalDashboard/RequestsTable';
import { Sidebar } from '../components/InternalDashboard/Sidebar';
import { StatCard } from '../components/InternalDashboard/StatCard';
import { RequestTimeline } from '../components/InternalDashboard/RequestTimeline';
import { PriorityChart } from '../components/InternalDashboard/PriorityChart';

export function InternalDashboard() {
  return (
    <div className="min-h-screen bg-[var(--bg-secondary)]">
      <Header />
      <div className="flex h-[calc(100vh-64px)]">
        <Sidebar />
        <main className="flex-1 overflow-auto pl-64">
          <div className="page-container">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
              <StatCard 
                title="Total Requests"
                value="156"
                change="+12.5%"
                trend="up"
              />
              <StatCard 
                title="In Progress"
                value="43"
                change="+5.2%"
                trend="up"
              />
              <StatCard 
                title="Completion Rate"
                value="92%"
                change="-2.1%"
                trend="down"
              />
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
              <div className="lg:col-span-2 card">
                <h3 className="section-title">Request Timeline</h3>
                <div className="h-[300px]">
                  <RequestTimeline />
                </div>
              </div>
              <div className="card">
                <h3 className="section-title">Priority Distribution</h3>
                <div className="h-[300px]">
                  <PriorityChart />
                </div>
              </div>
            </div>

            <div className="card">
              <div className="p-6 border-b border-[var(--border-primary)]">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-xl font-[var(--font-semibold)] text-[var(--text-primary)]">
                    Recent Proposals
                  </h2>
                </div>
                <FilterBar />
              </div>
              <RequestsTable />
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}