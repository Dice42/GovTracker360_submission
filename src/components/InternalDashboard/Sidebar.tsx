import React from 'react';
import { Link } from 'react-router-dom';
import {
  LayoutDashboard,
  CheckSquare,
  Archive,
  BarChart3,
  Settings,
  Search,
  FileText,
} from 'lucide-react';
import clsx from 'clsx';
import { useLanguage } from '../../contexts/LanguageContext';
import { translations } from '../../translations';

export function Sidebar() {
  const { language } = useLanguage();
  const t = translations[language];

  const navigation = [
    { name: t.dashboard, href: '/internal/dashboard', icon: LayoutDashboard, current: true },
    { name: t.assignedTasks, href: '/internal/tasks', icon: CheckSquare, current: false },
    { name: t.completedRequests, href: '/internal/completed', icon: Archive, current: false },
    { name: t.analytics, href: '/internal/analytics', icon: BarChart3, current: false },
    { name: 'Search', href: '/search', icon: Search, current: false },
    { name: 'PDF Services', href: '/pdf-services', icon: FileText, current: false },
    { name: t.settings, href: '/internal/settings', icon: Settings, current: false },
  ];

  return (
    <div className="hidden md:flex md:flex-col md:w-64 md:fixed md:inset-y-0 bg-white border-r border-gray-200">
      <div className="flex-1 flex flex-col min-h-0">
        <div className="flex-1 flex flex-col pt-5 pb-4 overflow-y-auto">
          <nav className="mt-5 flex-1 px-2 space-y-1">
            {navigation.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                className={clsx(
                  item.current
                    ? 'bg-blue-50 text-blue-600'
                    : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900',
                  'group flex items-center px-2 py-2 text-sm font-medium rounded-md'
                )}
              >
                <item.icon
                  className={clsx(
                    item.current ? 'text-blue-600' : 'text-gray-400 group-hover:text-gray-500',
                    'mr-3 flex-shrink-0 h-6 w-6'
                  )}
                />
                {item.name}
              </Link>
            ))}
          </nav>
        </div>
      </div>
    </div>
  );
}