"use client";

import { FC } from "react";

interface QueryPreviewModalProps {
  open: boolean;
  onClose: () => void;
  sql?: string;
  onReset?: () => void;
}

const QueryPreviewModal: FC<QueryPreviewModalProps> = ({ open, onClose, sql, onReset }) => {
  if (!open) return null;

  const handleCloseAndReset = () => {
    onReset?.();
    onClose();
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black/30">
      <div className="w-2/3 max-h-[80vh] bg-white rounded-xl shadow-2xl p-6 relative animate-fade-in-scale overflow-y-auto flex flex-col">
        {/* Close icon */}
        <button
          className="absolute top-3 right-4 text-gray-600 hover:text-gray-800 text-2xl font-bold"
          onClick={handleCloseAndReset}
        >
          &times;
        </button>

        {/* Header */}
        <h2 className="text-xl font-semibold mb-4 text-gray-700">Query Preview</h2>

        {/* Query content */}
        <div className="flex-grow overflow-y-auto">
          {sql && sql.trim() ? (
            <pre className="bg-gray-100 text-sm text-gray-700 rounded p-4 whitespace-pre-wrap break-words">
              {sql}
            </pre>
          ) : (
            <div className="flex items-center text-sm text-gray-500 mt-6">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4 mr-2 text-gray-400"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M18 10c0 4.418-3.582 8-8 8s-8-3.582-8-8 3.582-8 8-8 8 3.582 8 8zm-8-3a1 1 0 100 2 1 1 0 000-2zm.75 4.75a.75.75 0 00-1.5 0v3.5a.75.75 0 001.5 0v-3.5z"
                  clipRule="evenodd"
                />
              </svg>
              No query provided to preview.
            </div>
          )}
        </div>

        {/* Button bottom right */}
        <div className="mt-4 flex justify-end">
          <button
            onClick={handleCloseAndReset}
            className="bg-red-100 text-red-600 hover:bg-red-200 px-4 py-2 text-sm rounded-md font-medium"
          >
            Close & Reset
          </button>
        </div>
      </div>

      <style jsx>{`
        @keyframes fadeInScale {
          from {
            opacity: 0;
            transform: scale(0.95);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }

        .animate-fade-in-scale {
          animation: fadeInScale 0.3s ease-out forwards;
        }
      `}</style>
    </div>
  );
};

export default QueryPreviewModal;
