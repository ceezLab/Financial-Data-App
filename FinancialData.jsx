import React, { useEffect, useState } from "react";

const FinancialData = () => {
  const [data, setData] = useState([]); // State to store fetched data
  const [loading, setLoading] = useState(true); // State to track loading status
  const [filters, setFilters] = useState({ startDate: "", endDate: "", minRevenue: "", maxRevenue: "" }); // State to store filter values
  const [sortBy, setSortBy] = useState(""); // State to track sorting option
  const apiKey = "TsOa9cFZj5HV1Z58bA3kUOwtQJoqdAQJ"; // API key for fetching data

  // Fetch data from the API when the component mounts
  useEffect(() => {
    fetch(`https://financialmodelingprep.com/api/v3/income-statement/AAPL?period=annual&apikey=${apiKey}`)
      .then((response) => response.json())
      .then((data) => {
        setData(data); // Set the fetched data
        setLoading(false); // Set loading to false
      })
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  if (loading) return <div className="text-center mt-4">Loading...</div>; // Show loading message

  // Filter data based on user input
  const filteredData = data.filter((item) => {
    const date = new Date(item.date).getFullYear();
    const revenue = item.revenue;

    return (
      (!filters.startDate || date >= parseInt(filters.startDate)) &&
      (!filters.endDate || date <= parseInt(filters.endDate)) &&
      (!filters.minRevenue || revenue >= parseFloat(filters.minRevenue)) &&
      (!filters.maxRevenue || revenue <= parseFloat(filters.maxRevenue))
    );
  });

  // Sort data based on user selection
  const sortedData = [...filteredData].sort((a, b) => {
    if (sortBy === "date") {
      return new Date(a.date) - new Date(b.date);
    }
    if (sortBy === "revenue") {
      return b.revenue - a.revenue;
    }
    if (sortBy === "netIncome") {
      return b.netIncome - a.netIncome;
    }
    return 0; // Default: no sorting
  });

  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-blue-600 text-white p-4">
        <h1 className="text-2xl font-bold">Financial Data</h1>
      </header>
      <main className="p-4">
        {/* Filter Inputs */}
        <div className="filters mb-4 flex flex-wrap gap-2">
          <input
            type="number"
            placeholder="Start Year"
            value={filters.startDate}
            onChange={(e) => setFilters({ ...filters, startDate: e.target.value })}
            className="border px-2 py-1 rounded"
          />
          <input
            type="number"
            placeholder="End Year"
            value={filters.endDate}
            onChange={(e) => setFilters({ ...filters, endDate: e.target.value })}
            className="border px-2 py-1 rounded"
          />
          <input
            type="number"
            placeholder="Min Revenue"
            value={filters.minRevenue}
            onChange={(e) => setFilters({ ...filters, minRevenue: e.target.value })}
            className="border px-2 py-1 rounded"
          />
          <input
            type="number"
            placeholder="Max Revenue"
            value={filters.maxRevenue}
            onChange={(e) => setFilters({ ...filters, maxRevenue: e.target.value })}
            className="border px-2 py-1 rounded"
          />
        </div>

        {/* Sorting Dropdown */}
        <div className="sorting mb-4">
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="border px-2 py-1 rounded"
          >
            <option value="">Sort By</option>
            <option value="date">Date</option>
            <option value="revenue">Revenue</option>
            <option value="netIncome">Net Income</option>
          </select>
        </div>

        {/* Data Table */}
        <div className="overflow-x-auto">
          <table className="table-auto w-full border-collapse border border-gray-200">
            <thead>
              <tr className="bg-gray-200">
                <th className="border border-gray-300 px-4 py-2">Date</th>
                <th className="border border-gray-300 px-4 py-2">Revenue</th>
                <th className="border border-gray-300 px-4 py-2">Net Income</th>
                <th className="border border-gray-300 px-4 py-2">Gross Profit</th>
                <th className="border border-gray-300 px-4 py-2">EPS</th>
                <th className="border border-gray-300 px-4 py-2">Operating Income</th>
              </tr>
            </thead>
            <tbody>
              {sortedData.map((item, index) => (
                <tr key={item.date} className={index % 2 === 0 ? "bg-white" : "bg-gray-100"}>
                  <td className="border border-gray-300 px-4 py-2">{item.date}</td>
                  <td className="border border-gray-300 px-4 py-2">{item.revenue}</td>
                  <td className="border border-gray-300 px-4 py-2">{item.netIncome}</td>
                  <td className="border border-gray-300 px-4 py-2">{item.grossProfit}</td>
                  <td className="border border-gray-300 px-4 py-2">{item.eps}</td>
                  <td className="border border-gray-300 px-4 py-2">{item.operatingIncome}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </main>
      <footer className="bg-blue-600 text-white p-4 text-center">
        <p>&copy; Financial Data App</p>
      </footer>
    </div>
  );
};

export default FinancialData;


