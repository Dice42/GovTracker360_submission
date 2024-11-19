interface DocumentUploadSectionProps {
  documents: Document[];
  onUpload: (files: FileList) => void;
  onRemove: (index: number) => void;
  title: string;
}

export function DocumentUploadSection({ documents, onUpload, onRemove, title }: DocumentUploadSectionProps) {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-700">
        {title}
      </label>
      <div className="mt-1 flex flex-col space-y-4">
        <div className="flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md hover:border-[#FFA726] transition-colors">
          <div className="space-y-1 text-center">
            <svg
              className="mx-auto h-12 w-12 text-gray-400"
              stroke="currentColor"
              fill="none"
              viewBox="0 0 48 48"
              aria-hidden="true"
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
                className="relative cursor-pointer rounded-md font-medium text-[#FFA726] hover:text-[#F57C00]"
              >
                <span>Upload files</span>
                <input
                  id="file-upload"
                  name="file-upload"
                  type="file"
                  className="sr-only"
                  multiple
                  onChange={(e) => e.target.files && onUpload(e.target.files)}
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

        {documents.length > 0 && (
          <ul className="divide-y divide-gray-200 border border-gray-200 rounded-md">
            {documents.map((doc, index) => (
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
                  onClick={() => onRemove(index)}
                  className="ml-4 flex-shrink-0 text-gray-400 hover:text-red-500 transition-colors"
                >
                  <svg className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path
                      fillRule="evenodd"
                      d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                      clipRule="evenodd"
                    />
                  </svg>
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}