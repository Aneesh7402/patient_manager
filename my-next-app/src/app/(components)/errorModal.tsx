import { useEffect } from "react";

export const ErrorModal = ({
  errorMessage,
  onClose,
}: {
  errorMessage: string;
  onClose: () => void;
}) => {
  useEffect(() => {
    if (errorMessage) {
      const timer = setTimeout(onClose, 4000); // auto-close in 4 seconds
      return () => clearTimeout(timer);
    }
  }, [errorMessage, onClose]);

  if (!errorMessage) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center pointer-events-none">
      <div className="bg-white text-gray-800 border border-gray-300 shadow-xl rounded-xl px-6 py-4 max-w-sm w-full animate-fade-in-up pointer-events-auto">
        <h2 className="text-lg font-semibold text-red-600 mb-1">Something went wrong</h2>
        <p className="text-sm">{errorMessage}</p>
        <button
          onClick={onClose}
          className="mt-4 ml-auto block px-4 py-1.5 text-sm bg-red-100 text-red-600 rounded-md hover:bg-red-200 transition"
        >
          Close
        </button>
      </div>
    </div>
  );
};
