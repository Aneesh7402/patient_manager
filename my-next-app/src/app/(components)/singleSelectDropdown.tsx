export default function SingleSelectDropdown({
  label,
  options,
  selected,
  setSelected,
  placeholder = "Select a table",
}: {
  label: string;
  options: string[];
  selected: string;
  setSelected: React.Dispatch<React.SetStateAction<string>>;
  placeholder?: string;
}) {
  return (
    <div className="mb-4">
      <label className="block text-sm font-medium text-gray-700">{label}</label>
      <select
        value={selected}
        onChange={(e) => setSelected(e.target.value)}
        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm text-gray-700"
      >
        <option value="" className="px-4 py-2 hover:bg-gray-100 cursor-pointer text-sm text-gray-700">
          {placeholder}
        </option>
        {options.map((option, index) => (
          <option
            className="px-4 py-2 hover:bg-gray-100 cursor-pointer text-sm text-gray-700"
            key={index}
            value={option}
          >
            {option}
          </option>
        ))}
      </select>
    </div>
  );
}
