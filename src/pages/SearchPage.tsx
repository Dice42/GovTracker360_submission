import React, { useState } from 'react';
import { Header } from '../components/ExternalDashboard/Header';
import { Footer } from '../components/ExternalDashboard/Footer';
import type { FormData as FormData } from '../types/type';
import { FileDown } from 'lucide-react';

interface SearchResult extends FormData {
  status: string;
  _id?: string;
  id?: string;
  url?: string;
}

export function SearchPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState<SearchResult[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const response = await fetch(`http://localhost:8000/search?query=${searchTerm}`);
      const data = await response.json();
      setSearchResults(data);
    } catch (error) {
      console.error('Error fetching search results:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDownloadPDF = async (title: string) => {
    try {
      const response = await fetch(`http://127.0.0.1:8000/pdf?title=${title}`);

      if (!response.ok) {
        throw new Error('Failed to generate PDF');
      }

      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `proposal_${title}.pdf`;
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error('Error downloading PDF:', error);
    }
  };

  const renderTableBody = (results: SearchResult[], isExternal: boolean) => {
    return results
      .filter(result => isExternal ? result.status === 'external' : !result.status || result.status !== 'external')
      .map((result, index) => (
        <tr key={`${isExternal ? 'ext' : 'int'}-${index}`} className="bg-white">
          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
            {result._id || result.id || 'N/A'}
          </td>
          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
            {result.title}
          </td>
          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
            {result.department}
          </td>
          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
            {result.submissionDate ? new Date(result.submissionDate).toLocaleDateString() : 'N/A'}
          </td>
          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
            {result.priority || 'N/A'}
          </td>
          <td className="px-6 py-4 whitespace-nowrap">
            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium
              ${result.status === 'completed' ? 'bg-green-100 text-green-800' : 
                result.status === 'in_progress' ? 'bg-blue-100 text-blue-800' : 
                'bg-gray-100 text-gray-800'}`}>
            </span>
          </td>
          <td className="px-6 py-4 whitespace-nowrap">
            <button
              onClick={() => handleDownloadPDF(result.title)}
              className="text-blue-600 hover:text-blue-900 inline-flex items-center"
            >
              <FileDown className="h-5 w-5 mr-1" />
              PDF
            </button>
          </td>
        </tr>
      ));
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Header />
      <main className="flex-1">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="mb-8">
            <h1 className="text-2xl font-bold text-gray-900">Search Requests</h1>
            <p className="mt-2 text-sm text-gray-600">
              Search through all submitted requests
            </p>
          </div>

          <div className="bg-white shadow rounded-lg p-6">
            <form onSubmit={handleSearch} className="mb-6">
              <div className="flex gap-4">
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Search by title, department, or ID..."
                  className="flex-1 rounded-md border border-gray-300 px-3 py-2 focus:border-blue-500 focus:ring-blue-500"
                />
                <button
                  type="submit"
                  disabled={isLoading}
                  className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50"
                >
                  {isLoading ? 'Searching...' : 'Search'}
                </button>
              </div>
            </form>

            {searchResults.length > 0 && (
              <div className="space-y-8">
                {/* Database Results */}
                {searchResults.filter(r => !r.status || r.status !== 'external').length > 0 && (
                  <div className="overflow-x-auto">
                    <h2 className="text-lg font-semibold mb-4">Database Results</h2>
                    <table className="min-w-full divide-y divide-gray-200">
                      <thead className="bg-gray-50">
                        <tr>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            ID
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Title
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Department
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Submission Date
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Priority
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Status
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Download
                          </th>
                        </tr>
                      </thead>
                      <tbody className="bg-white divide-y divide-gray-200">
                        {searchResults
                          .filter(r => !r.status || r.status !== 'external')
                          .map((result) => (
                            <tr key={result.id} className="hover:bg-gray-50">
                              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                {result.id}
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                {result.title}
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                {result.department}
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                {new Date(result.submissionDate).toLocaleDateString()}
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap">
                                <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium
                                  ${result.priority === 'high' ? 'bg-red-100 text-red-800' : 
                                    result.priority === 'medium' ? 'bg-yellow-100 text-yellow-800' : 
                                    'bg-green-100 text-green-800'}`}>
                                  {result.priority.charAt(0).toUpperCase() + result.priority.slice(1)}
                                </span>
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap">
                                <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium
                                  ${result.status === 'completed' ? 'bg-green-100 text-green-800' : 
                                    result.status === 'in_progress' ? 'bg-blue-100 text-blue-800' : 
                                    'bg-gray-100 text-gray-800'}`}>
                                </span>
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap">
                                <button
                                  onClick={() => handleDownloadPDF(result.title)}
                                  className="text-blue-600 hover:text-blue-900 inline-flex items-center"
                                >
                                  <FileDown className="h-5 w-5 mr-1" />
                                  PDF
                                </button>
                              </td>
                            </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}

                {/* Internet Results */}
                {searchResults.filter(r => r.status === 'external').length > 0 && (
                  <div className="overflow-x-auto">
                    <h2 className="text-lg font-semibold mb-4">Internet Results</h2>
                    <table className="min-w-full divide-y divide-gray-200">
                      <thead className="bg-gray-50">
                        <tr>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Title
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Description
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Source
                          </th>
                        </tr>
                      </thead>
                      <tbody className="bg-white divide-y divide-gray-200">
                        {searchResults
                          .filter(r => r.status === 'external')
                          .map((result, index) => (
                            <tr key={`ext-${index}`} className="hover:bg-gray-50">
                              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                <a href={result.url} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-800">
                                  {result.title}
                                </a>
                              </td>
                              <td className="px-6 py-4 text-sm text-gray-500">
                                {result.description}
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                {new URL(result.url || '').hostname.replace('www.', '')}
                              </td>
                            </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}