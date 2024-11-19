import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export function PDFServicesPage() {
  const [title, setTitle] = useState('');
  const navigate = useNavigate();

  const handleGeneratePDF = async () => {
    try {
      const response = await fetch(`http://127.0.0.1:8000/proposal/pdf`, {
        method: 'POST',
        body: JSON.stringify({ title }),
      });

      if (!response.ok) {
        throw new Error('Failed to generate PDF');
      }

      // Create a blob from the PDF stream
      const blob = await response.blob();
      // Create a link to download the PDF
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `proposal_${title}.pdf`;
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error('Error generating PDF:', error);
      // Handle error appropriately
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">PDF Services</h1>
      
      <div className="max-w-md">
        <div className="mb-4">
          <label htmlFor="title" className="block text-sm font-medium text-gray-700">
            Proposal Title
          </label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            placeholder="Enter proposal title"
          />
        </div>

        <button
          onClick={handleGeneratePDF}
          className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
        >
          Generate PDF
        </button>
      </div>
    </div>
  );
} 