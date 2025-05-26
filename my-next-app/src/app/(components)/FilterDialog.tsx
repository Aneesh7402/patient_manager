"use client";

import { FC, useState } from "react";
import UserTable from "./userTable";
import SingleSelectDropdown from "./singleSelectDropdown";
import { DUMMY_QUERIES } from "../(utils)/constants";

// Example queries to import
// Import your list of example queries

interface SchemaColumn {
  name: string;
  type: string;
}

interface Schema {
  name: string;
  data: SchemaColumn[];
}

interface FilterDialogProps {
  open: boolean;
  onClose: () => void;
  schema: Schema[];
  onApply: (query: string) => void;
  query?: string;
  setQuery?: (query: string) => void;
}

const FilterDialog: FC<FilterDialogProps> = ({
  open,
  onClose,
  schema,
  onApply,
  query = "",
  setQuery = () => {},
}) => {
  const [selectedTable, setSelectedTable] = useState<string>(
    schema.length > 0 ? schema[0].name : ""
  );

  if (!open) return null;

  const handleApply = () => {
    onApply(query);
  };

  const selectedSchema = schema.find((table) => table.name === selectedTable);

  const headers = ["Column Name", "Type"];
  const data =
    selectedSchema?.data.map((col) => ({
      "Column Name": col.name,
      Type: col.type,
    })) ?? [];

  const tableNames = schema.map((s) => s.name);

  // Randomly pick an example query
  const handleExampleQuery = () => {
    const randomQuery =
      DUMMY_QUERIES[Math.floor(Math.random() * DUMMY_QUERIES.length)];
    setQuery(randomQuery);
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div className="w-3/4 h-3/4 bg-gray-50 rounded-xl shadow-2xl p-8 relative animate-fade-in-scale overflow-y-auto">
        <button
          className="absolute top-4 right-5 text-gray-600 hover:text-gray-800 text-2xl font-bold"
          onClick={onClose}
        >
          &times;
        </button>

        <h2 className="text-2xl font-semibold mb-6 text-gray-600">
          Filter Options
        </h2>

        <div className="flex justify-between">
          {/* Left: Query Input */}
          <div className="w-1/2 pr-4 h-full flex flex-col">
            <div className="flex-grow">
              <label
                htmlFor="query-box"
                className="block text-sm text-gray-600 font-medium mb-2"
              >
                Please enter your SQL query
              </label>
              <textarea
                id="query-box"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg text-sm text-gray-600 h-[30vh]"
                placeholder="Enter query"
                rows={4}
              />
            </div>

            <div
              className="mt-4 cursor-pointer flex items-center hover:bg-gray-100 px-4 py-2 rounded-lg"
              onClick={handleExampleQuery}
              title="Click to insert an example query"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 text-blue-600 hover:text-blue-800"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M9 5l7 7-7 7"
                />
              </svg>
              <span className="ml-3 text-sm text-gray-700 font-medium">
                Insert Example Query
              </span>
            </div>

            <div className="mt-4">
              <button
                onClick={handleApply}
                className="w-full bg-blue-600 text-white py-2 rounded-lg text-sm font-medium hover:bg-blue-700"
              >
                Apply
              </button>
            </div>
            <div className="mt-4 flex items-start text-sm text-gray-600">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4 mr-2 mt-0.5 text-gray-400 flex-shrink-0"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M18 10c0 4.418-3.582 8-8 8s-8-3.582-8-8 3.582-8 8-8 8 3.582 8 8zm-8-3a1 1 0 100 2 1 1 0 000-2zm.75 4.75a.75.75 0 00-1.5 0v3.5a.75.75 0 001.5 0v-3.5z"
                  clipRule="evenodd"
                />
              </svg>

              <span className="leading-relaxed">
                <strong className="text-gray-700">
                  Only read queries are allowed.
                </strong>{" "}
                Use the table schema on the right to write your query.
                <br />
                <br />✅ Your query must:
                <ul className="list-disc list-inside ml-4 mt-1 space-y-1">
                  <li>
                    Start with{" "}
                    <code className="bg-gray-100 px-1 py-0.5 rounded text-gray-700 text-xs">
                      SELECT
                    </code>
                  </li>
                  <li>
                    Avoid commands like{" "}
                    <code className="bg-gray-100 px-1 py-0.5 rounded text-gray-700 text-xs">
                      INSERT
                    </code>
                    ,{" "}
                    <code className="bg-gray-100 px-1 py-0.5 rounded text-gray-700 text-xs">
                      UPDATE
                    </code>
                    ,{" "}
                    <code className="bg-gray-100 px-1 py-0.5 rounded text-gray-700 text-xs">
                      DELETE
                    </code>
                    , etc.
                  </li>
                  <li>
                    Do <strong>not</strong> end with a semicolon{" "}
                    <code className="bg-gray-100 px-1 py-0.5 rounded text-gray-700 text-xs">
                      ;
                    </code>
                  </li>
                  <li>
                    Do <strong>not</strong> use comments{" "}
                    <code className="bg-gray-100 px-1 py-0.5 rounded text-gray-700 text-xs">
                      --
                    </code>
                  </li>
                  <li>
                    Use proper quotes for string values (e.g.{" "}
                    <code className="bg-gray-100 px-1 py-0.5 rounded text-gray-700 text-xs">
                      gender = &apos;FEMALE&apos;
                    </code>
                    )
                  </li>
                </ul>
                <br />❌ Queries attempting to modify the database will be
                blocked for safety.
              </span>
            </div>
          </div>

          {/* Right: Schema Viewer */}
          <div className="w-1/2 pl-4 border-l-2 border-gray-300">
            <h3 className="text-xl font-semibold text-gray-600 mb-4">
              Table Schema
            </h3>

            <div className="mb-4 relative z-30">
              <SingleSelectDropdown
                label="Table Name"
                placeholder="Select a table"
                options={tableNames}
                selected={selectedTable}
                setSelected={setSelectedTable}
              />
            </div>

            <UserTable
              headers={headers}
              data={data}
              enableFilter={false}
              disablePagination={true}
            />
          </div>
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

export default FilterDialog;
