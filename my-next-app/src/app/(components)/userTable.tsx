import { FC, useEffect, useMemo, useState } from "react";
import { FunnelIcon } from "@heroicons/react/24/outline";
import { Search } from "lucide-react";
import MutliSelectDropDown from "./dropdown";
import { useRouter } from "next/navigation";

interface TableProps {
  headers: string[];
  data: Record<string, string | number>[];
  enableFilter: boolean;
  setFilterClicked?: (value: boolean) => void;
  disablePagination?: boolean;
  disableActions?: boolean;
  setShowQueryClicked?: (value: boolean) => void;
}

const UserTable: FC<TableProps> = ({
  headers,
  data,
  enableFilter,
  setFilterClicked,
  disablePagination,
  disableActions,
  setShowQueryClicked,
}) => {
  const [selectedHeaders, setSelectedHeaders] = useState<string[]>([]);
  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const router = useRouter();

  // Debounce the search input
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearch(search.trim().toLowerCase());
    }, 300); // 300ms debounce

    return () => clearTimeout(handler);
  }, [search]);

  useEffect(() => {
    setSelectedHeaders(headers.slice(0, 5));
  }, [headers]);

  const allTruthy = (row: Record<string, string | number>) => {
    return Object.keys(row).every((key) => {
      const value = row[key];
      return (
        (Array.isArray(value) ? !value.includes("NULL") : value !== "NULL") &&
        value !== null &&
        value !== "None" &&
        value !== ""
      );
    });
  };

  // Filter data based on debouncedSearch
  const filteredData = useMemo(() => {
    if (!debouncedSearch) return data;
    return data.filter((row) =>
      Object.values(row).some((value) =>
        value?.toString().toLowerCase().includes(debouncedSearch)
      )
    );
  }, [data, debouncedSearch]);

  return (
    <div
      className={
        disablePagination && !enableFilter
          ? ""
          : `p-6 m-6 bg-gray-50 rounded-lg shadow`
      }
    >
      {enableFilter && (
        <div className="flex justify-between items-start mb-4 flex-wrap gap-4">
          <div className="flex items-center flex-wrap gap-4">
            <button
              className="flex items-center bg-white border border-gray-300 px-4 py-2 rounded-lg shadow-sm hover:bg-gray-100"
              onClick={() => setFilterClicked?.(true)}
            >
              <FunnelIcon className="h-5 w-5 text-gray-600 mr-2" />
              <span className="text-sm font-medium text-gray-700">Filter</span>
            </button>

            <div className="relative z-30">
              <MutliSelectDropDown
                options={headers}
                selected={selectedHeaders}
                setSelected={setSelectedHeaders}
                disableWidget={true}
                maxOptions={5}
              />
            </div>

            <div className="flex items-center px-3 py-2 w-72 border border-gray-300 rounded-lg bg-white">
              <Search className="h-4 w-4 text-gray-400 mr-2" />
              <input
                type="text"
                placeholder="Search Users by Name, Email or Date"
                className="outline-none bg-transparent text-sm text-gray-600 w-full"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>

            <button
              className="flex items-center bg-white border border-gray-300 px-4 py-2 rounded-lg shadow-sm hover:bg-gray-100"
              onClick={() => setShowQueryClicked?.(true)}
            >
              <span className="text-sm font-medium text-gray-700">
                Show Query
              </span>
            </button>
          </div>

          <button
            className="bg-purple-600 text-white px-6 py-2 rounded-lg text-sm cursor-pointer font-medium hover:bg-purple-700"
            onClick={() => router.push("/create")}
          >
            Create Patient Record
          </button>
        </div>
      )}

      <div className="overflow-x-auto rounded-lg border border-gray-200 max-h-[60vh] overflow-y-auto">
        <table className="min-w-full bg-white">
          <thead className="bg-gray-100 sticky top-0 z-10">
            <tr>
              {selectedHeaders.map((header) => (
                <th
                  key={header}
                  className="text-left text-sm font-semibold text-gray-600 px-4 py-3"
                >
                  {header}
                </th>
              ))}
              {filteredData.some((row) => row.patient_id) && (
                <th className="px-4 py-3 text-sm font-semibold text-gray-600">
                  Active
                </th>
              )}
            </tr>
          </thead>

          <tbody>
            {filteredData.map((row, rowIndex) => (
              <tr
                key={rowIndex}
                className={rowIndex % 2 === 0 ? "bg-white" : "bg-gray-50"}
              >
                {selectedHeaders.map((header) => {
                  const value = row[header];
                  const formattedValue =
                    typeof value === "string" &&
                    /^\d{4}-\d{2}-\d{2}T/.test(value)
                      ? new Date(value).toLocaleDateString()
                      : value?.toString();

                  return (
                    <td
                      key={header}
                      className="px-4 py-3 text-sm text-gray-700"
                    >
                      {formattedValue}
                    </td>
                  );
                })}

                {row.patient_id && (
                  <td className="px-4 py-3 text-sm">
                    {allTruthy(row) ? (
                      <span className="text-gray-400 underline underline-dotted cursor-not-allowed">
                        None
                      </span>
                    ) : (
                      <button
                        onClick={() =>
                          router.push(`/create?id=${row.patient_id}`)
                        }
                        className="text-blue-600 hover:underline cursor-pointer"
                      >
                        Continue filling
                      </button>
                    )}
                  </td>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UserTable;
