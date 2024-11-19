import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Building2, Users } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import { translations } from '../translations';
import { LanguageSwitcher } from '../components/LanguageSwitcher';

export function RoleSelection() {
  const navigate = useNavigate();
  const { language } = useLanguage();
  const t = translations[language];

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Add Language Switcher in header/corner */}
      <div className="absolute top-4 right-4">
        <LanguageSwitcher />
      </div>
      
      <div className="max-w-7xl w-full mx-auto grid md:grid-cols-2 gap-8 items-center">
        {/* Left Side - Branding */}
        <div className="text-center md:text-left space-y-6 md:pr-8">
          <div className="space-y-4">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900">
              {t.welcome}
            </h1>
            <p className="text-xl text-gray-600 max-w-xl">
              {t.subtitle}
            </p>
          </div>
          
          {/* Animated logo sliding up with fade */}
          <img
            src="https://upload.wikimedia.org/wikipedia/en/8/80/Logo_of_Abu_Dhabi_Executive_Council.jpg"
            alt="Abu Dhabi Executive Council Logo"
            className="w-auto h-auto hidden md:block shadow-[0_0_30px_10px_rgba(0,0,0,0.0)] animate-slide-up-fade"
          />
        </div>

        {/* Right Side - Auth Options */}
        <div className="bg-white rounded-2xl shadow-xl p-8 space-y-8 w-full max-w-md mx-auto">
          <div className="text-center space-y-2">
            <h2 className="text-2xl font-bold text-gray-900">Welcome Back</h2>
            <p className="text-gray-600">Please select your role to continue</p>
          </div>

          <div className="space-y-4">
            {/* Internal Department Button */}
            <button
              onClick={() => navigate('/login/internal')}
              className="w-full group relative flex items-center justify-center space-x-4 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white p-4 rounded-xl transition-all duration-200 shadow-md hover:shadow-lg"
            >
              <Building2 className="w-6 h-6" />
              <span className="text-lg font-medium">Internal Department</span>
            </button>

            {/* External Entity Button */}
            <button
              onClick={() => navigate('/login/external')}
              className="w-full group relative flex items-center justify-center space-x-4 bg-gradient-to-r from-gray-100 to-gray-200 hover:from-gray-200 hover:to-gray-300 text-gray-700 p-4 rounded-xl transition-all duration-200 border border-gray-200 shadow-sm hover:shadow-md"
            >
              <Users className="w-6 h-6" />
              <span className="text-lg font-medium">External Entity</span>
            </button>
          </div>

          {/* Additional Links */}
          <div className="space-y-4 text-center">
            <p className="text-sm text-gray-600">
              Need help? <a href="#" className="text-blue-600 hover:text-blue-700 font-medium">Contact Support</a>
            </p>
            <div className="flex justify-center space-x-4 text-sm text-gray-500">
              <a href="#" className="hover:text-gray-700">Privacy Policy</a>
              <span>•</span>
              <a href="#" className="hover:text-gray-700">Terms of Use</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}