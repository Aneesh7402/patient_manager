import React from "react";

const Loader: React.FC = () => {
  return (
    <div className="flex items-center justify-center py-10">
      <div className="w-8 h-8 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin"></div>
    </div>
  );
};

export default Loader;
