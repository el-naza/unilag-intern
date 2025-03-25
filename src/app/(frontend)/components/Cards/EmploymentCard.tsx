import React from "react";

const EmploymentCard = ({ company, status, student, onAccept, onCancel, loading }) => {
  return (
    <div className="max-w-md bg-white shadow-lg rounded-lg p-4 border">
      <h2 className="text-xl font-semibold">{company.name}</h2>
      <p className="text-gray-600">{company.address}</p>
      <p className="text-gray-500">Phone: {company.phone}</p>
      <p className="text-gray-500">Status: {status}</p>
      <p className="text-gray-700 font-medium mt-2">
        Student: {student.firstName} {student.lastName}
      </p>
      <div className="mt-4 flex gap-2">
        <button
          onClick={onAccept}
          className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 disabled:bg-green-300"
          disabled={loading}
        >
          {loading === "Accept" ? "Processing..." : "Accept"}
        </button>
        <button
          onClick={onCancel}
          className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 disabled:bg-red-300"
          disabled={loading}
        >
          {loading === "Decline" ? "Processing..." : "Cancel"}
        </button>
      </div>
    </div>
  );
};

export default EmploymentCard;
