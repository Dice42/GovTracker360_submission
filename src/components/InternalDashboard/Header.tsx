import React from 'react';
import { Bell, LogOut } from 'lucide-react';
import { Link } from 'react-router-dom';

export function Header() {
  return (
    <header className="bg-white shadow">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex">
            <div className="flex-shrink-0 flex items-center">
              <img
                src="https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&w=100&h=100&q=80"
                alt="Abu Dhabi Executive Council Logo"
                className="h-8 w-auto"
              />
              <h1 className="ml-3 text-xl font-semibold text-gray-900">
                Finance Department
              </h1>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <button className="p-2 text-gray-400 hover:text-gray-500 relative">
              <Bell className="h-6 w-6" />
              <span className="absolute top-0 right-0 block h-2 w-2 rounded-full bg-red-400 ring-2 ring-white" />
            </button>
            <div className="flex items-center space-x-3">
              <img
                src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=facearea&facepad=2&w=32&h=32&q=80"
                alt="User avatar"
                className="h-8 w-8 rounded-full"
              />
              <span className="text-sm font-medium text-gray-700">Ahmed Hassan</span>
            </div>
            <Link
              to="/"
              className="p-2 text-gray-400 hover:text-gray-500"
              title="Sign out"
            >
              <LogOut className="h-6 w-6" />
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}