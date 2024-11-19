import { useLanguage } from '../contexts/LanguageContext';

export function LanguageSwitcher() {
  const { language, setLanguage } = useLanguage();

  return (
    <button
      onClick={() => setLanguage(language === 'en' ? 'ar' : 'en')}
      className="px-3 py-1 rounded-md bg-gray-100 hover:bg-gray-200 transition-colors"
    >
      {language === 'en' ? 'عربي' : 'English'}
    </button>
  );
} 