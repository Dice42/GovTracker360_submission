import React, { useState } from 'react';
import { Header } from '../components/ExternalDashboard/Header';
import { Footer } from '../components/ExternalDashboard/Footer';
import { StepIndicator } from '../components/RequestForm/StepIndicator';
import { da } from 'date-fns/locale';
import type { FormData as FormData } from '../types/type';
import { SuccessPopup } from '../components/SuccessPopup';

interface FileDocument {
  file: File;
  name: string;
  size: string;
  type: string;
}

const steps = [
  'Basic Information',
  'Request Details',
  'Justification & Challenges',
  'Request Metrics',
  'Alternative Options',
  'Expected Effects',
  'Challenges & Risks',
  'Legal & Financial Opinion',
  'Partners Opinions',
  'Work Plan',
  'Recommendation',
  'Review & Submit'
];

export function SubmitRequest() {
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState<FormData>({
    id: 0,
    title: '',
    department: '',
    submissionDate: '',
    priority: '',
    description: '',
    justification: '',
    challenges: '',
    metrics: '',
    alternatives: '',
    effects: '',
    risks: '',
    legalOpinion: '',
    financialOpinion: '',
    partnerOpinions: '',
    workPlan: '',
    recommendation: '',
    tasksCompleted: 0,
    totalTasks: 0,
    documents: [] as FileDocument[],
    justificationDocs: [],
    metricsDocs: [],
    alternativesDocs: [],
    effectsDocs: [],
    risksDocs: [],
    legalFinancialDocs: [],
    partnerDocs: [],
    workPlanDocs: [],
    recommendationDocs: []
  });
  const [showSuccessPopup, setShowSuccessPopup] = useState(false);

  const handleNext = () => {
    setCurrentStep((prev) => Math.min(prev + 1, steps.length - 1));
  };

  const handleBack = () => {
    setCurrentStep((prev) => Math.max(prev - 1, 0));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const data = new FormData();
    data.append("id", formData.id.toString());
    data.append("title", formData.title);
    data.append("department", formData.department);
    data.append("priority", formData.priority);
    data.append("submissionDate", new Date().toISOString());
    data.append("description", formData.description);
    data.append("justification", formData.justification);
    data.append("challenges", formData.challenges);
    data.append("metrics", formData.metrics);
    data.append("alternatives", formData.alternatives);
    data.append("effects", formData.effects);
    data.append("risks", formData.risks);
    data.append("legalOpinion", formData.legalOpinion);
    data.append("financialOpinion", formData.financialOpinion);
    data.append("partnerOpinions", formData.partnerOpinions);
    data.append("workPlan", formData.workPlan);
    data.append("recommendation", formData.recommendation);
    data.append("tasksCompleted", formData.tasksCompleted.toString());
    data.append("totalTasks", formData.totalTasks.toString());
    for (const doc of formData.documents) {
      data.append('documents', doc.file);
    }
    for (const doc of formData.justificationDocs) {
      data.append('justificationDocs', doc.file);
    }
    for (const doc of formData.metricsDocs) {
      data.append('metricsDocs', doc.file);
    }
    for (const doc of formData.alternativesDocs) {
      data.append('alternativesDocs', doc.file);
    }
    for (const doc of formData.effectsDocs) {
      data.append('effectsDocs', doc.file);
    }
    for (const doc of formData.risksDocs) {
      data.append('risksDocs', doc.file);
    }
    for (const doc of formData.legalFinancialDocs) {
      data.append('legalFinancialDocs', doc.file);
    }
    for (const doc of formData.partnerDocs) {
      data.append('partnerDocs', doc.file);
    }
    for (const doc of formData.workPlanDocs) {
      data.append('workPlanDocs', doc.file);
    }
    for (const doc of formData.recommendationDocs) {
      data.append('recommendationDocs', doc.file);
    }
    for (const [key, value] of data.entries()) {
      console.log(`${key}:`, value);
    }
    const response = await fetch('http://127.0.0.1:8000/process', {
      method: 'POST',
      body: data,
    });
    console.log(response["status"])
    // Handle form submission
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (!files) return;

    const newDocuments: FileDocument[] = Array.from(files).map(file => ({
      file,
      name: file.name,
      size: formatFileSize(file.size),
      type: file.type,
    }));

    setFormData(prev => ({
      ...prev,
      documents: [...prev.documents, ...newDocuments]
    }));
  };

  const handleRemoveDocument = (index: number) => {
    setFormData(prev => ({
      ...prev,
      documents: prev.documents.filter((_, i) => i !== index)
    }));
  };

  const formatFileSize = (bytes: number): string => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Header />
      <main className="flex-1">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="mb-8">
            <h1 className="text-2xl font-bold text-gray-900">Submit New Request</h1>
            <p className="mt-2 text-sm text-gray-600">
              Please fill out the form below to submit your request to the Abu Dhabi Executive Council.
            </p>
          </div>

          <div className="mb-8 py-8 px-4">
            <StepIndicator steps={steps} currentStep={currentStep} />
          </div>

          <div className="bg-white shadow rounded-lg">
            <form onSubmit={handleSubmit} className="p-6">
              {currentStep === 0 && (
                <div className="space-y-6">
                  <div>
                    <label htmlFor="title" className="block text-sm font-medium text-gray-700">
                      Request Title
                    </label>
                    <input
                      type="text"
                      id="title"
                      value={formData.title}
                      onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                      className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 focus:border-blue-500 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <label htmlFor="department" className="block text-sm font-medium text-gray-700">
                      Request Type
                    </label>
                    <select
                      id="department"
                      value={formData.department}
                      onChange={(e) => setFormData({ ...formData, department: e.target.value })}
                      className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 focus:border-blue-500 focus:ring-blue-500"
                    >
                      <option value="">request type</option>
                      <option value="community">Projects and Initiatives - المشاريع والمبادرات</option>
                      <option value="culture&tourism">Polices & Strategies - السياسات والاستراتيجيات</option>
                      <option value="Economic">Government and legislation - الحكومة والتشريعات</option>
                      <option value="Economic">Land and Assets - الأراضي والأصول </option>
                      <option value="Economic">Human Capital - رأس المال البشري</option>
                      <option value="Economic">Financial Requests - الطلبات المالية</option>
                      <option value="Economic">reports & study - التقارير والدراسات</option>
                    </select>
                  </div>

                  <div>
                    <label htmlFor="priority" className="block text-sm font-medium text-gray-700">
                      Priority Level
                    </label>
                    <select
                      id="priority"
                      value={formData.priority}
                      onChange={(e) => setFormData({ ...formData, priority: e.target.value })}
                      className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 focus:border-blue-500 focus:ring-blue-500"
                    >
                      <option value="">Select priority</option>
                      <option value="low">Low</option>
                      <option value="medium">Medium</option>
                      <option value="high">High</option>
                    </select>
                  </div>
                </div>
              )}

              {currentStep === 1 && (
                <div className="space-y-6">
                  <div>
                    <label htmlFor="description" className="block text-sm font-medium text-gray-700">
                      Request Description
                    </label>
                    <textarea
                      id="description"
                      rows={4}
                      value={formData.description}
                      onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                      className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 focus:border-blue-500 focus:ring-blue-500"
                    />
                  </div>
                </div>
              )}

              {currentStep === 2 && (
                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Supporting Documents
                    </label>
                    <div className="mt-1 flex flex-col space-y-4">
                      <div className="flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
                        <div className="space-y-1 text-center">
                          <svg
                            className="mx-auto h-12 w-12 text-gray-400"
                            stroke="currentColor"
                            fill="none"
                            viewBox="0 0 48 48"
                          >
                            <path
                              d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                              strokeWidth={2}
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                          </svg>
                          <div className="flex text-sm text-gray-600 justify-center">
                            <label
                              htmlFor="file-upload"
                              className="relative cursor-pointer rounded-md font-medium text-blue-600 hover:text-blue-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-blue-500"
                            >
                              <span>Upload files</span>
                              <input
                                id="file-upload"
                                name="file-upload"
                                type="file"
                                className="sr-only"
                                multiple
                                onChange={handleFileUpload}
                                accept=".pdf,.doc,.docx,.xls,.xlsx"
                              />
                            </label>
                            <p className="pl-1">or drag and drop</p>
                          </div>
                          <p className="text-xs text-gray-500">
                            PDF, DOC, DOCX, XLS, XLSX up to 10MB each
                          </p>
                        </div>
                      </div>

                      {formData.documents.length > 0 && (
                        <div className="mt-4">
                          <h4 className="text-sm font-medium text-gray-700 mb-3">
                            Uploaded Documents
                          </h4>
                          <ul className="divide-y divide-gray-200 border border-gray-200 rounded-md">
                            {formData.documents.map((doc, index) => (
                              <li
                                key={index}
                                className="flex items-center justify-between py-3 px-4 hover:bg-gray-50"
                              >
                                <div className="flex items-center min-w-0 flex-1">
                                  <div className="flex-1 min-w-0">
                                    <p className="text-sm font-medium text-gray-900 truncate">
                                      {doc.name}
                                    </p>
                                    <p className="text-sm text-gray-500">
                                      {doc.size} • {doc.type.split('/')[1].toUpperCase()}
                                    </p>
                                  </div>
                                </div>
                                <button
                                  type="button"
                                  onClick={() => handleRemoveDocument(index)}
                                  className="ml-4 flex-shrink-0 text-sm font-medium text-red-600 hover:text-red-500"
                                >
                                  Remove
                                </button>
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </div>
                  </div>
                  <div>
                    <label htmlFor="justification" className="block text-sm font-medium text-gray-700">
                      Justification
                    </label>
                    <textarea
                      id="justification"
                      rows={4}
                      value={formData.justification}
                      onChange={(e) => setFormData({ ...formData, justification: e.target.value })}
                      className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 focus:border-blue-500 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <label htmlFor="challenges" className="block text-sm font-medium text-gray-700">
                      Challenges
                    </label>
                    <textarea
                      id="challenges"
                      rows={4}
                      value={formData.challenges}
                      onChange={(e) => setFormData({ ...formData, challenges: e.target.value })}
                      className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 focus:border-blue-500 focus:ring-blue-500"
                    />
                  </div>
                </div>
              )}

              {currentStep === 3 && (
                <div className="space-y-6">
                  <div>
                    <label htmlFor="metrics" className="block text-sm font-medium text-gray-700">
                      Request Metrics
                    </label>
                    <textarea
                      id="metrics"
                      rows={4}
                      value={formData.metrics}
                      onChange={(e) => setFormData({ ...formData, metrics: e.target.value })}
                      className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 focus:border-blue-500 focus:ring-blue-500"
                    />
                  </div>
                </div>
              )}

              {currentStep === 4 && (
                <div className="space-y-6">
                  <div>
                    <label htmlFor="alternatives" className="block text-sm font-medium text-gray-700">
                      Alternative Options
                    </label>
                    <textarea
                      id="alternatives"
                      rows={4}
                      value={formData.alternatives}
                      onChange={(e) => setFormData({ ...formData, alternatives: e.target.value })}
                      className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 focus:border-blue-500 focus:ring-blue-500"
                    />
                  </div>
                </div>
              )}

              {currentStep === 5 && (
                <div className="space-y-6">
                  <div>
                    <label htmlFor="effects" className="block text-sm font-medium text-gray-700">
                      Expected Effects
                    </label>
                    <textarea
                      id="effects"
                      rows={4}
                      value={formData.effects}
                      onChange={(e) => setFormData({ ...formData, effects: e.target.value })}
                      className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 focus:border-blue-500 focus:ring-blue-500"
                    />
                  </div>
                </div>
              )}

              {currentStep === 6 && (
                <div className="space-y-6">
                  <div>
                    <label htmlFor="risks" className="block text-sm font-medium text-gray-700">
                      Challenges & Risks
                    </label>
                    <textarea
                      id="risks"
                      rows={4}
                      value={formData.risks}
                      onChange={(e) => setFormData({ ...formData, risks: e.target.value })}
                      className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 focus:border-blue-500 focus:ring-blue-500"
                    />
                  </div>
                </div>
              )}

              {currentStep === 7 && (
                <div className="space-y-6">
                  <div>
                    <label htmlFor="legalOpinion" className="block text-sm font-medium text-gray-700">
                      Legal Opinion
                    </label>
                    <textarea
                      id="legalOpinion"
                      rows={4}
                      value={formData.legalOpinion}
                      onChange={(e) => setFormData({ ...formData, legalOpinion: e.target.value })}
                      className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 focus:border-blue-500 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <label htmlFor="financialOpinion" className="block text-sm font-medium text-gray-700">
                      Financial Opinion
                    </label>
                    <textarea
                      id="financialOpinion"
                      rows={4}
                      value={formData.financialOpinion}
                      onChange={(e) => setFormData({ ...formData, financialOpinion: e.target.value })}
                      className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 focus:border-blue-500 focus:ring-blue-500"
                    />
                  </div>
                </div>
              )}

              {currentStep === 8 && (
                <div className="space-y-6">
                  <div>
                    <label htmlFor="partnerOpinions" className="block text-sm font-medium text-gray-700">
                      Partners Opinions
                    </label>
                    <textarea
                      id="partnerOpinions"
                      rows={4}
                      value={formData.partnerOpinions}
                      onChange={(e) => setFormData({ ...formData, partnerOpinions: e.target.value })}
                      className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 focus:border-blue-500 focus:ring-blue-500"
                    />
                  </div>
                </div>
              )}

              {currentStep === 9 && (
                <div className="space-y-6">
                  <div>
                    <label htmlFor="workPlan" className="block text-sm font-medium text-gray-700">
                      Work Plan
                    </label>
                    <textarea
                      id="workPlan"
                      rows={4}
                      value={formData.workPlan}
                      onChange={(e) => setFormData({ ...formData, workPlan: e.target.value })}
                      className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 focus:border-blue-500 focus:ring-blue-500"
                    />
                  </div>
                </div>
              )}

              {currentStep === 10 && (
                <div className="space-y-6">
                  <div>
                    <label htmlFor="recommendation" className="block text-sm font-medium text-gray-700">
                      Recommendation
                    </label>
                    <textarea
                      id="recommendation"
                      rows={4}
                      value={formData.recommendation}
                      onChange={(e) => setFormData({ ...formData, recommendation: e.target.value })}
                      className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 focus:border-blue-500 focus:ring-blue-500"
                    />
                  </div>
                </div>
              )}

              <div className="mt-6 flex justify-between">
                <button
                  type="button"
                  onClick={handleBack}
                  disabled={currentStep === 0}
                  className="inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50"
                >
                  Back
                </button>
                {currentStep === steps.length - 1 ? (
                  <button
                    type="submit"
                    className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-[#FFA726] hover:bg-[#F57C00] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#FFA726]"
                  >
                    Submit Request
                  </button>
                ) : (
                  <button
                    type="button"
                    onClick={handleNext}
                    className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
                  >
                    Next
                  </button>
                )}
              </div>
            </form>
          </div>
        </div>
      </main>
      <Footer />
      <SuccessPopup 
        isOpen={showSuccessPopup} 
        onClose={() => setShowSuccessPopup(false)} 
      />
    </div>
  );
} 