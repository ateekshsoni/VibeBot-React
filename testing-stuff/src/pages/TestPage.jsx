import React from "react";
import DashboardLayout from "@/components/layout/DashboardLayout";
import BackendTestPanel from "@/components/BackendTestPanel";

const TestPage = () => {
  return (
    <DashboardLayout>
      <div className="p-6">
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-white mb-2">
            Backend Integration Testing
          </h1>
          <p className="text-gray-400">
            Test your frontend integration with the backend API to ensure
            everything is working correctly.
          </p>
        </div>

        <BackendTestPanel />
      </div>
    </DashboardLayout>
  );
};

export default TestPage;
