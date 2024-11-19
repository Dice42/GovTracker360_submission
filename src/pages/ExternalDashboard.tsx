import React from 'react';
import { Header } from '../components/ExternalDashboard/Header';
import { SearchBar } from '../components/ExternalDashboard/SearchBar';
import { RequestsTable } from '../components/ExternalDashboard/RequestsTable';
import { Footer } from '../components/ExternalDashboard/Footer';

export function ExternalDashboard() {
  return (
    <div className="min-h-screen bg-[var(--bg-secondary)]">
      <Header />
      <main>
        <SearchBar />
        <RequestsTable />
      </main>
      <Footer />
    </div>
  );
}