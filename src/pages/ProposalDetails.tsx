import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { Header } from '../components/InternalDashboard/Header';
import { Sidebar } from '../components/InternalDashboard/Sidebar';
import { TeamProgressNodes } from '../components/ProposalDetails/TeamProgressNodes';
import { 
  FileText, 
  Calendar, 
  Users as UsersIcon, 
  AlertTriangle as AlertTriangleIcon,
  Clock,
  CheckCircle2,
  AlertCircle,
  Upload,
  X
} from 'lucide-react';
import { DepartmentProgress } from '../components/ProposalDetails/DepartmentProgress';
import { SuccessPopup } from '../components/SuccessPopup';

interface TimelineEvent {
  id: number;
  type: 'status_change' | 'comment' | 'document' | 'review';
  content: string;
  date: string;
  user: string;
  userRole: string;
}

interface SummaryStats {
  totalBudget: string;
  timeframe: string;
  impactScore: number;
  keyMetrics: {
    label: string;
    value: string;
  }[];
  bulletPoints: string[];
}

export function ProposalDetails() {
  const { id } = useParams();
  const [showFullSummary, setShowFullSummary] = useState(false);
  const [financeComment, setFinanceComment] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
  const [showSuccessPopup, setShowSuccessPopup] = useState(false);

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      setSelectedFiles(Array.from(event.target.files));
    }
  };

  const handleFinanceAction = async (action: 'approve' | 'reject') => {
    setIsSubmitting(true);
    try {
      // Create FormData to send both files and other data
      const formData = new FormData();
      formData.append('action', action);
      formData.append('comment', financeComment);
      selectedFiles.forEach(file => {
        formData.append('files', file);
      });

      console.log('Submitting finance action:', action, financeComment, selectedFiles);
      // await updateProposalStatus(id, formData);
      setShowSuccessPopup(true);
    } catch (error) {
      console.error('Error updating status:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  // Add the nodes data here
  const teamNodes = [
    {
      id: '1',
      name: 'Finance Team',
      status: 'completed' as const,
      progress: 100,
      tasks: [
        {
          id: 't1',
          title: 'Budget Analysis',
          completed: true,
          assignedTo: 'Sarah Ahmed',
          dueDate: '2024-02-20',
        },
        {
          id: 't2',
          title: 'Cost-Benefit Analysis',
          completed: true,
          assignedTo: 'Mohammed Hassan',
          dueDate: '2024-02-22',
        },
        {
          id: 't3',
          title: 'Financial Risk Assessment',
          completed: true,
          assignedTo: 'Fatima Al Mansouri',
          dueDate: '2024-02-25',
        },
      ],
      summary: 'Financial analysis complete. Project shows positive ROI with manageable risks.',
      research: 'financial_analysis_report.pdf',
    },
    {
      id: '2',
      name: 'Operations Team',
      status: 'in-progress' as const,
      progress: 60,
      tasks: [
        {
          id: 't4',
          title: 'Resource Allocation Plan',
          completed: true,
          assignedTo: 'Ahmed Al Hashemi',
          dueDate: '2024-02-28',
        },
        {
          id: 't5',
          title: 'Implementation Timeline',
          completed: true,
          assignedTo: 'Noura Al Kaabi',
          dueDate: '2024-03-01',
        },
        {
          id: 't6',
          title: 'Operational Risk Assessment',
          completed: false,
          assignedTo: 'Khalid Al Qubaisi',
          dueDate: '2024-03-05',
        },
      ],
      summary: 'Resource planning complete. Timeline established. Risk assessment in progress.',
    },
    {
      id: '3',
      name: 'Strategic Team',
      status: 'not-started' as const,
      progress: 0,
      tasks: [
        {
          id: 't7',
          title: 'Strategic Alignment Review',
          completed: false,
          assignedTo: 'Mariam Al Mheiri',
          dueDate: '2024-03-10',
        },
        {
          id: 't8',
          title: 'Impact Assessment',
          completed: false,
          assignedTo: 'Sultan Al Jaber',
          dueDate: '2024-03-15',
        },
      ],
      summary: 'Pending previous team completion.',
    },
  ];

  // Mock proposal data - In a real app, fetch this based on the id
  const proposal = {
    id,
    sn: 'REQ-2024-001',
    title: 'Q2 Budget Review',
    entity: 'Department of Urban Planning',
    submissionDate: '2024-02-15',
    priority: 'high',
    status: 'in-progress',
    summary: 'Comprehensive review of Q2 2024 budget allocation focusing on urban development projects. The proposal outlines infrastructure improvements and sustainability initiatives with detailed cost analysis.',
    description: 'Comprehensive review of Q2 2024 budget allocation for urban development projects including infrastructure improvements and sustainability initiatives.',
    documents: [
      { name: 'Budget_Proposal.pdf', size: '2.4 MB', type: 'pdf' },
      { name: 'Supporting_Documents.docx', size: '1.8 MB', type: 'docx' },
      { name: 'Financial_Analysis.xlsx', size: '1.2 MB', type: 'xlsx' },
    ],
    deadline: '2024-03-30',
    assignedTeams: ['Finance', 'Operations', 'Strategic Planning'],
    risks: [
      'Timeline constraints',
      'Resource allocation challenges',
      'Stakeholder coordination',
    ],
  };

  const departments = [
    {
      id: '1',
      name: 'Legal Department',
      status: 'approved' as const,
      reviewedBy: 'Ahmed Al Qasimi',
      comments: 'All legal requirements are met. Approved for further processing.',
      reviewDate: '2024-02-18',
      documents: [
        {
          name: 'Legal_Review.pdf',
          size: '2.4 MB',
          type: 'pdf',
          uploadedBy: 'Ahmed Al Qasimi',
          uploadDate: '2024-02-18',
        },
        {
          name: 'Compliance_Check.pdf',
          size: '1.8 MB',
          type: 'pdf',
          uploadedBy: 'Fatima Al Mansouri',
          uploadDate: '2024-02-17',
        },
      ],
      requirements: [
        {
          id: 'req1',
          title: 'Legal Compliance Check',
          status: 'completed',
          description: 'Verify compliance with local regulations and guidelines.',
        },
        {
          id: 'req2',
          title: 'Risk Assessment',
          status: 'completed',
          description: 'Evaluate potential legal risks and mitigation strategies.',
        },
      ],
      activities: [
        {
          id: 'act1',
          action: 'Initial Review Started',
          user: 'Ahmed Al Qasimi',
          date: '2024-02-15',
          details: 'Started comprehensive legal review of the proposal.',
        },
        {
          id: 'act2',
          action: 'Compliance Check Completed',
          user: 'Fatima Al Mansouri',
          date: '2024-02-17',
          details: 'All compliance requirements verified and documented.',
        },
        {
          id: 'act3',
          action: 'Final Approval',
          user: 'Ahmed Al Qasimi',
          date: '2024-02-18',
          details: 'Proposal approved from legal perspective.',
        },
      ],
    },
    {
      id: '2',
      name: 'Finance Department',
      status: 'in-review' as const,
      reviewedBy: 'Fatima Al Mansouri',
      comments: 'Reviewing budget allocations and financial implications.',
      reviewDate: '2024-02-20',
    },
    {
      id: '3',
      name: 'IT Department',
      status: 'pending' as const,
    },
    {
      id: '4',
      name: 'Human Resources',
      status: 'rejected' as const,
      reviewedBy: 'Mohammed Al Hashemi',
      comments: 'Additional staffing requirements need clarification.',
      reviewDate: '2024-02-19',
    },
  ];

  const summaryStats: SummaryStats = {
    totalBudget: "AED 2.5M",
    timeframe: "6 months",
    impactScore: 85,
    keyMetrics: [
      { label: "ROI", value: "25%" },
      { label: "Departments Affected", value: "4" },
      { label: "Resource Utilization", value: "75%" }
    ],
    bulletPoints: [
      "Improves operational efficiency by 30%",
      "Reduces processing time by 45%",
      "Enhances user satisfaction by 60%",
      "Implements sustainable practices",
      "Aligns with UAE Vision 2030"
    ]
  };

  const DetailModal = () => {
    if (!isDetailModalOpen) return null;

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-lg max-w-3xl w-full max-h-[90vh] overflow-y-auto">
          <div className="p-6">
            <div className="flex justify-between items-start mb-4">
              <h2 className="text-xl font-bold text-gray-900">Detailed Summary</h2>
              <button 
                onClick={() => setIsDetailModalOpen(false)}
                className="text-gray-400 hover:text-gray-500"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Full Summary */}
            <div className="mb-6">
              <h3 className="text-lg font-semibold mb-2">Full Summary</h3>
              <p className="text-gray-600 whitespace-pre-line">{proposal.summary}</p>
            </div>

            {/* Key Statistics */}
            <div className="mb-6">
              <h3 className="text-lg font-semibold mb-3">Key Statistics</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="bg-blue-50 p-4 rounded-lg">
                  <p className="text-sm text-gray-600">Total Budget</p>
                  <p className="text-lg font-bold text-blue-600">{summaryStats.totalBudget}</p>
                </div>
                <div className="bg-green-50 p-4 rounded-lg">
                  <p className="text-sm text-gray-600">Timeframe</p>
                  <p className="text-lg font-bold text-green-600">{summaryStats.timeframe}</p>
                </div>
                <div className="bg-purple-50 p-4 rounded-lg">
                  <p className="text-sm text-gray-600">Impact Score</p>
                  <p className="text-lg font-bold text-purple-600">{summaryStats.impactScore}%</p>
                </div>
              </div>
            </div>

            {/* Key Metrics */}
            <div className="mb-6">
              <h3 className="text-lg font-semibold mb-3">Key Metrics</h3>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {summaryStats.keyMetrics.map((metric, index) => (
                  <div key={index} className="bg-gray-50 p-4 rounded-lg">
                    <p className="text-sm text-gray-600">{metric.label}</p>
                    <p className="text-lg font-bold text-gray-900">{metric.value}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Key Points */}
            <div>
              <h3 className="text-lg font-semibold mb-3">Key Points</h3>
              <ul className="list-disc pl-5 space-y-2">
                {summaryStats.bulletPoints.map((point, index) => (
                  <li key={index} className="text-gray-600">{point}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <div className="flex h-[calc(100vh-64px)]">
        <Sidebar />
        <main className="flex-1 overflow-auto pl-64">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            {/* Proposal Header */}
            <div className="bg-white shadow rounded-lg p-6 mb-6">
              <div className="flex justify-between items-start">
                <div>
                  <h1 className="text-2xl font-bold text-gray-900 mb-2">
                    {proposal.title}
                  </h1>
                  <p className="text-sm text-gray-500">
                    Reference: {proposal.sn} • Submitted by {proposal.entity}
                  </p>
                </div>
                <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium
                  ${proposal.priority === 'high' 
                    ? 'bg-red-100 text-red-800' 
                    : proposal.priority === 'medium'
                    ? 'bg-yellow-100 text-yellow-800'
                    : 'bg-green-100 text-green-800'
                  }`}>
                  {proposal.priority.charAt(0).toUpperCase() + proposal.priority.slice(1)} Priority
                </span>
              </div>
            </div>

            {/* Key Information Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
              <div className="bg-white shadow rounded-lg p-6">
                <div className="flex items-center">
                  <Calendar className="h-6 w-6 text-blue-500" />
                  <h3 className="ml-2 text-sm font-medium text-gray-900">Submission Date</h3>
                </div>
                <p className="mt-2 text-lg font-semibold text-gray-900">{proposal.deadline}</p>
              </div>

              <div className="bg-white shadow rounded-lg p-6">
                <div className="flex items-center">
                  <FileText className="h-6 w-6 text-blue-500" />
                  <h3 className="ml-2 text-sm font-medium text-gray-900">Documents</h3>
                </div>
                <p className="mt-2 text-lg font-semibold text-gray-900">
                  {proposal.documents.length} Files
                </p>
              </div>

              <div className="bg-white shadow rounded-lg p-6">
                <div className="flex items-center">
                  <UsersIcon className="h-6 w-6 text-blue-500" />
                  <h3 className="ml-2 text-sm font-medium text-gray-900">Teams Involved</h3>
                </div>
                <p className="mt-2 text-lg font-semibold text-gray-900">
                  {proposal.assignedTeams.length} Teams
                </p>
              </div>

              <div className="bg-white shadow rounded-lg p-6">
                <div className="flex items-center">
                  <AlertTriangleIcon className="h-6 w-6 text-blue-500" />
                  <h3 className="ml-2 text-sm font-medium text-gray-900">Risk Factors</h3>
                </div>
                <p className="mt-2 text-lg font-semibold text-gray-900">
                  {proposal.risks.length} Identified
                </p>
              </div>
            </div>

            {/* Team Progress Section - Pass the nodes as props */}
            <div className="bg-white shadow rounded-lg p-6 mb-6">
              <h2 className="text-lg font-medium text-gray-900 mb-4">Summary</h2>
              <div className="prose max-w-none mb-4">
                <p className="text-gray-600 whitespace-pre-line">
                  {showFullSummary 
                    ? proposal.summary 
                    : (
                      <>
                        {`${proposal.summary.substring(0, 200).trim()}${proposal.summary.length > 200 ? '...' : ''}`}
                        {proposal.summary.length > 200 && (
                          <button
                            onClick={() => setShowFullSummary(true)}
                            className="ml-2 text-blue-600 hover:text-blue-700 font-medium"
                          >
                            View more
                          </button>
                        )}
                      </>
                    )
                  }
                  {showFullSummary && (
                    <button
                      onClick={() => setShowFullSummary(false)}
                      className="ml-2 text-blue-600 hover:text-blue-700 font-medium"
                    >
                      Show less
                    </button>
                  )}
                </p>
              </div>
              <button
                onClick={() => setIsDetailModalOpen(true)}
                className="inline-flex items-center px-4 py-2 text-sm font-medium text-blue-600 bg-blue-50 rounded-md hover:bg-blue-100"
              >
                View Detailed Summary
              </button>
              <DetailModal />
            </div>

            {/* Description Section */}
            <div className="bg-white shadow rounded-lg p-6 mb-6">
              <h2 className="text-lg font-medium text-gray-900 mb-4">Proposal Description</h2>
              <p className="text-gray-600">{proposal.description}</p>
            </div>

            {/* Documents Section */}
            <div className="bg-white shadow rounded-lg p-6 mb-6">
              <h2 className="text-lg font-medium text-gray-900 mb-4">Supporting Documents</h2>
              <ul className="divide-y divide-gray-200">
                {proposal.documents.map((doc, index) => (
                  <li key={index} className="py-3 flex justify-between items-center">
                    <div className="flex items-center">
                      <FileText className="h-5 w-5 text-gray-400 mr-3" />
                      <div>
                        <p className="text-sm font-medium text-gray-900">{doc.name}</p>
                        <p className="text-sm text-gray-500">{doc.size}</p>
                      </div>
                    </div>
                    <button className="text-sm text-blue-600 hover:text-blue-500">
                      Download
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            {/* Risk Assessment Section */}
            <div className="bg-white shadow rounded-lg p-6">
              <h2 className="text-lg font-medium text-gray-900 mb-4">Risk Assessment</h2>
              <ul className="space-y-3">
                {proposal.risks.map((risk, index) => (
                  <li key={index} className="flex items-start">
                    <AlertTriangleIcon className="h-5 w-5 text-yellow-500 mr-2 mt-0.5" />
                    <span className="text-gray-600">{risk}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Department Progress Section */}
            <div className="bg-white shadow rounded-lg p-6 mb-6">
              <h2 className="text-lg font-medium text-gray-900 mb-4">Department Reviews</h2>
              <DepartmentProgress departments={departments} />
            </div>

            {/* Finance Department Action Section */}
            <div className="bg-white shadow rounded-lg p-6 mb-6">
              <h2 className="text-lg font-medium text-gray-900 mb-4">Finance Department Action</h2>
              <div className="space-y-4">
                {/* File Upload Section */}
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-4">
                  <div className="flex items-center justify-center">
                    <label className="flex flex-col items-center cursor-pointer">
                      <Upload className="h-8 w-8 text-gray-400" />
                      <span className="mt-2 text-sm text-gray-500">Upload supporting documents</span>
                      <input
                        type="file"
                        className="hidden"
                        multiple
                        onChange={handleFileSelect}
                        accept=".pdf,.doc,.docx,.xls,.xlsx"
                      />
                    </label>
                  </div>
                  {/* Selected Files List */}
                  {selectedFiles.length > 0 && (
                    <div className="mt-4">
                      <h4 className="text-sm font-medium text-gray-900 mb-2">Selected Files:</h4>
                      <ul className="space-y-2">
                        {selectedFiles.map((file, index) => (
                          <li key={index} className="flex items-center text-sm text-gray-600">
                            <FileText className="h-4 w-4 mr-2" />
                            {file.name}
                            <button
                              onClick={() => setSelectedFiles(files => files.filter((_, i) => i !== index))}
                              className="ml-2 text-red-500 hover:text-red-700"
                            >
                              ×
                            </button>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>

                {/* Existing Comment Textarea */}
                <textarea
                  value={financeComment}
                  onChange={(e) => setFinanceComment(e.target.value)}
                  placeholder="Enter your review comments..."
                  className="w-full p-2 border rounded-md"
                  rows={4}
                />

                {/* Action Buttons */}
                <div className="flex space-x-4">
                  <button
                    onClick={() => handleFinanceAction('approve')}
                    disabled={isSubmitting}
                    className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 disabled:opacity-50"
                  >
                    {isSubmitting ? 'Processing...' : 'Approve'}
                  </button>
                  <button
                    onClick={() => handleFinanceAction('reject')}
                    disabled={isSubmitting}
                    className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 disabled:opacity-50"
                  >
                    {isSubmitting ? 'Processing...' : 'Reject'}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
      <SuccessPopup 
        isOpen={showSuccessPopup} 
        onClose={() => setShowSuccessPopup(false)} 
      />
    </div>
  );
}