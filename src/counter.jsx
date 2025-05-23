import React, { useState } from "react";

function Counter() {
  const [count, setCount] = useState(0);
  const [savedCounts, setSavedCounts] = useState([]);

  const increment = () => setCount(count + 1);
  const decrement = () => setCount(count > 0 ? count - 1 : 0);
  const saveCount = () => {
    setSavedCounts([...savedCounts, count]);
    setCount(0); // Reset count to 0 after saving
  };

  return (
    <div className="max-w-sm mx-auto mt-20 p-6 bg-gray-100 rounded shadow text-center">
      <h1 className="text-3xl font-bold mb-6">Counting App</h1>

      <div className="text-6xl mb-6">{count}</div>

      <div className="space-x-4 mb-6">
        <button
          onClick={decrement}
          className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
        >
          -
        </button>

        <button
          onClick={increment}
          className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
        >
          +
        </button>
      </div>

      <button
        onClick={saveCount}
        className="px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
      >
        Save
      </button>

      {savedCounts.length > 0 && (
        <div className="mt-8 text-left">
          <h2 className="text-xl font-semibold mb-2">Saved Counts:</h2>
          <ul className="list-disc list-inside">
            {savedCounts.map((c, i) => (
              <li key={i}>Count: {c}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default Counter;
