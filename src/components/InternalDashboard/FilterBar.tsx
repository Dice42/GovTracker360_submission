import React from 'react';
import { Search, Filter } from 'lucide-react';

import { useLanguage } from '../../contexts/LanguageContext';
import { translations } from '../../translations';

export function FilterBar() {
  const { language } = useLanguage();
  const t = translations[language];

  return (
    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
      <div className="flex-1">
        <div className="relative">
          <input
            type="text"
            placeholder={t.searchRequests}
            className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
          <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
        </div>
      </div>
      
      <div className="flex flex-wrap items-center gap-3">
        <select className="rounded-lg border border-gray-300 py-2 pl-3 pr-10 text-sm focus:ring-2 focus:ring-blue-500">
          <option>{t.allStatuses}</option>
          <option>{t.notStarted}</option>
          <option>{t.inProgress}</option>
          <option>{t.completed}</option>
        </select>

        <select className="rounded-lg border border-gray-300 py-2 pl-3 pr-10 text-sm focus:ring-2 focus:ring-blue-500">
          <option>{t.allPriorities}</option>
          <option>{t.high}</option>
          <option>{t.medium}</option>
          <option>{t.low}</option>
        </select>

        <button className="inline-flex items-center px-4 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700 focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
          <Filter className="h-4 w-4 mr-2" />
          {t.moreFilters}
        </button>
      </div>
    </div>
  );
}
      