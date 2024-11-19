import React from 'react';
import { Link } from 'react-router-dom';

export function Footer() {
  return (
    <footer className="bg-white border-t border-gray-200 mt-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex justify-center space-x-6 text-sm text-gray-500">
          <Link to="/privacy" className="hover:text-gray-900">
            Privacy Policy
          </Link>
          <Link to="/terms" className="hover:text-gray-900">
            Terms of Use
          </Link>
          <Link to="/support" className="hover:text-gray-900">
            Contact Support
          </Link>
        </div>
      </div>
    </footer>
  );
}