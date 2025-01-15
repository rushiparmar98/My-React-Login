import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const [apiData, setApiData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState(null); // To manage selected category details
  const [deleteResponse, setDeleteResponse] = useState(null); // To store delete API response
  const [updateResponse, setUpdateResponse] = useState(null);
  const [deleteLoading, setDeleteLoading] = useState(false); // Loading state for delete API

  // Function to call the API   // Fetch categories
  const callApi = async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch(
        "https://dae4ebe4-bd07-4680-b672-e008113837ee.mock.pstmn.io/categories/list"
      ); // Replace with your actual API URL
      if (response.ok) {
        const data = await response.json();
        setApiData(data);
      } else {
        throw new Error("Failed to fetch data");
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };


  // New API Call Function 1 for Button 1
  const handleUpdateCategory = async () => {
    if (!selectedCategory) {
      alert("Please select a category to update.");
      return;
    }

    setLoading(true);
    setUpdateResponse(null);
    setError(null);

    try {
      const response = await fetch(
        `https://dae4ebe4-bd07-4680-b672-e008113837ee.mock.pstmn.io/category/7${selectedCategory.id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name: "Updated Name",
            description: "Updated Description",
          }),
        }
      );
        
      if (response.ok) {
        const contentType = response.headers.get("Content-Type");
        const data =
          contentType && contentType.includes("application/json")
            ? await response.json()
            : await response.text();
        setUpdateResponse(data);
        alert("Update Success: " + JSON.stringify(data));
      } else {
        throw new Error("Failed to update data");
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // Delete category
  const handleDeleteCategory = async () => {
    if (!selectedCategory) {
      alert("Please select a category to delete.");
      return;
    }

    setDeleteLoading(true);
    setDeleteResponse(null);
    setError(null);

    try {
      const response = await fetch(
        `https://dae4ebe4-bd07-4680-b672-e008113837ee.mock.pstmn.io//category/7/${selectedCategory.id}`,
        { method: "DELETE" }
      );

      if (response.ok) {
        const contentType = response.headers.get("Content-Type");
        const data =
          contentType && contentType.includes("application/json")
            ? await response.json()
            : await response.text();


        setDeleteResponse(data);
        setApiData((prev) =>
          prev.filter((category) => category.id !== selectedCategory.id)
        );
        setSelectedCategory(null);
        alert("Delete Success: " + JSON.stringify(data));
      }  else {
        throw new Error("Failed to delete category");
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setDeleteLoading(false);
    }
  };

  // Automatically call API when the component mounts
  useEffect(() => {
    callApi();
  }, []); // Empty dependency array ensures this runs only once on mount



  return (
    <div className="flex items-center justify-center h-screen bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500">
      <div className="text-center w-full px-4">
        <h1 className="text-5xl font-extrabold text-white drop-shadow-lg mb-8">
          Welcome to the <span className="text-yellow-300">Dashboard</span>
        </h1>
        {/* // Link that triggers the API call
      // <button  */}
        {/* //   onClick={callApi} 
      //   className="bg-blue-500 text-white px-4 py-2 rounded mt-4"
      // >
      //   Call API
      // </button> */}
        {/* New Button */}


        {/* Loading state */}
        {loading && <p className="text-white">Loading...</p>}
        {/* Display error if any */} {/* Error state */}
        {error && <p className="text-red-500">{error}</p>}


        {/* Display API data */}
        {apiData && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Left Section: Category List */}
            <div className="col-span-1 bg-white p-4 rounded shadow-lg">
              <h2 className="text-lg font-bold mb-4">Categories</h2>
              <ul className="text-left space-y-2">
                {apiData.map((category) => (
                  <li
                    key={category.id}
                    className={`cursor-pointer p-2 rounded ${
                      selectedCategory?.id === category.id
                        ? "bg-blue-200"
                        : "hover:bg-gray-100"
                    }`}
                    onClick={() => setSelectedCategory(category)}
                  > 
                    {/* Category Name */}
                    {category.name}
                    </li>
                ))}
              </ul>
            </div>
          

            {/* Right Section: Selected Category Details */}
            <div className="col-span-2 bg-white p-4 rounded shadow-lg">
              {selectedCategory ? (
                <div>
                  <h2 className="text-xl font-bold mb-2">
                    {selectedCategory.name}
                  </h2>
                  <p className="text-gray-700">
                    {selectedCategory.description}
                  </p>
                  </div>
              ) : (
                <p className="text-gray-500">
                  Please select a category to view details.
                </p>
              )}
            </div>
          </div>
        )}


        {updateResponse && (
          <div className="bg-green-100 text-green-800 p-4 rounded mt-4">
            <p>Update Success: {JSON.stringify(updateResponse)}</p>
          </div>
        )}

        {deleteResponse && (
          <div className="bg-red-100 text-red-800 p-4 rounded mt-4">
            <p>Delete Success: {JSON.stringify(deleteResponse)}</p>
          </div>
        )}
      </div>



        {/* Two New Buttons in the Bottom Left Corner */}
      <div className="absolute bottom-4 left-4 space-y-4">
        <button
          onClick={handleUpdateCategory}
          className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700"
          disabled={loading}
        >
          {loading ? "Updating..." : "UPDATE"}
        </button>

        <button
          onClick={handleDeleteCategory}
          className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700"
          disabled={deleteLoading}
        >
          {deleteLoading ? "Deleting..." : "DELETE"}
        </button>
      </div>
    </div>
  );
};

export default Dashboard;