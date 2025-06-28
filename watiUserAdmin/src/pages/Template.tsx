import TemplateEditor from "@/components/Template/TemplateForm";
import React, { useState } from "react";
import {
  FiHome,
  FiMessageSquare,
  FiMail,
  FiSettings,
  FiTrash2,
} from "react-icons/fi";

const defaultTemplates = [
  {
    id: "1",
    name: "welcome_message",
    category: "UTILITY",
    language: "en",
    body: "Hello {{1}}, welcome to our service!",
    buttons: [{ type: "QUICK_REPLY", text: "Get Started" }],
    status: "APPROVED",
    headerType: "TEXT",
    headerText: "Welcome!",
    footerText: "Thank you for joining.",
  },
  {
    id: "2",
    name: "order_update",
    category: "UTILITY",
    language: "en",
    body: "Your order {{1}} is on the way!",
    buttons: [],
    status: "PENDING",
    headerType: "NONE",
    footerText: "",
  },
];

const Template: React.FC = () => {
  const [activeTab, setActiveTab] = useState<
    "all" | "approved" | "pending" | "rejected"
  >("all");
  const [showEditor, setShowEditor] = useState(false);

  return (
    <div className="flex h-screen text-black bg-[#f5f5f5]">
      {/* Sidebar */}
      <div className="w-64 bg-white shadow-md">
        <div className="p-4 border-b">
          <h1 className="text-xl font-bold text-green-600">
            WhatsApp Business
          </h1>
        </div>
        <nav className="p-4">
          <ul className="space-y-2">
            <li className="flex items-center p-2 text-green-600 bg-gray-100 rounded-lg">
              <FiHome className="mr-2" />
              Dashboard
            </li>
            <li className="flex items-center p-2 rounded-lg hover:bg-gray-100">
              <FiMessageSquare className="mr-2" />
              Templates
            </li>
            <button
              type="button"
              onClick={() => setShowEditor(true)}
              className="flex items-center w-full p-2 text-left rounded-lg hover:bg-gray-100"
            >
              <FiMessageSquare className="mr-2" />
              Create Templates
            </button>
            <li className="flex items-center p-2 rounded-lg hover:bg-gray-100">
              <FiMail className="mr-2" />
              Messages
            </li>
            <li className="flex items-center p-2 rounded-lg hover:bg-gray-100">
              <FiSettings className="mr-2" />
              Settings
            </li>
          </ul>
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1 h-screen p-6">
        {showEditor && <TemplateEditor />}

        {/* Template List */}
        {!showEditor && (
          <div className="overflow-hidden bg-white rounded-lg shadow-md">
            <div className="flex items-center justify-between p-4 border-b">
              <h2 className="text-lg font-semibold">My Templates</h2>
              <div className="flex space-x-2">
                <button
                  onClick={() => setActiveTab("all")}
                  className={`px-3 py-1 rounded-md text-sm ${
                    activeTab === "all"
                      ? "bg-green-500 text-white"
                      : "bg-gray-200"
                  }`}
                >
                  All
                </button>
                <button
                  onClick={() => setActiveTab("approved")}
                  className={`px-3 py-1 rounded-md text-sm ${
                    activeTab === "approved"
                      ? "bg-green-500 text-white"
                      : "bg-gray-200"
                  }`}
                >
                  Approved
                </button>
                <button
                  onClick={() => setActiveTab("pending")}
                  className={`px-3 py-1 rounded-md text-sm ${
                    activeTab === "pending"
                      ? "bg-yellow-500 text-white"
                      : "bg-gray-200"
                  }`}
                >
                  Pending
                </button>
                <button
                  onClick={() => setActiveTab("rejected")}
                  className={`px-3 py-1 rounded-md text-sm ${
                    activeTab === "rejected"
                      ? "bg-red-500 text-white"
                      : "bg-gray-200"
                  }`}
                >
                  Rejected
                </button>
              </div>
            </div>
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase">
                    Name
                  </th>
                  <th className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase">
                    Category
                  </th>
                  <th className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase">
                    Language
                  </th>
                  <th className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase">
                    Status
                  </th>
                  <th className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {defaultTemplates.map((template) => (
                  <tr key={template.id}>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {template.name}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {template.category}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {template.language}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span
                        className={`px-2 py-1 rounded-full text-xs font-semibold ${
                          template.status === "APPROVED"
                            ? "bg-green-100 text-green-800"
                            : template.status === "PENDING"
                            ? "bg-yellow-100 text-yellow-800"
                            : "bg-red-100 text-red-800"
                        }`}
                      >
                        {template.status}
                      </span>
                    </td>
                    <td className="flex px-6 py-4 space-x-2 whitespace-nowrap">
                      <button
                        className="text-red-500 hover:text-red-700"
                        type="button"
                      >
                        <FiTrash2 />
                      </button>
                    </td>
                  </tr>
                ))}
                {defaultTemplates.length === 0 && (
                  <tr>
                    <td
                      colSpan={5}
                      className="px-6 py-4 text-center text-gray-400"
                    >
                      No templates found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default Template;
