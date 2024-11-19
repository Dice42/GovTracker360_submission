import React from 'react';
import { Plus } from 'lucide-react';
import { Link } from 'react-router-dom';

export function Header() {
  return (
    <header className="bg-white border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex justify-between items-center">
          <div className="flex items-center">
            <img
              src="https://www.mediaoffice.abudhabi/static/img/adgmo-logo.192dc46e.png"
              alt="Abu Dhabi Executive Council Logo"
              className="h-10 w-auto"
            />
            <h1 className="ml-3 text-xl font-semibold text-gray-900">
              Abu Dhabi Executive Council
            </h1>
          </div>
          <Link
            to="/external/submit-request"
            className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            <Plus className="h-5 w-5 mr-2" />
            Submit New Request
          </Link>
        </div>
      </div>
    </header>
  );
}