import { useState, useEffect, Fragment } from "react";
import TemplateEditor from "@/components/Template/TemplateForm";
import { useGetAllTemplateQuery } from "@/Redux/API/TemplateApi";
import {
  FiHome,
  FiMessageSquare,
  FiMail,
  FiSettings,
  FiTrash2,
  FiPlus,
  FiCheckCircle,
  FiClock,
  FiXCircle,
} from "react-icons/fi";
import { format } from "date-fns";
import { MdLocalDining } from "react-icons/md";
import { BiBroadcast } from "react-icons/bi";
import { WHATSAPP_TEMPLATE_LANGUAGES } from "@/constants/template.constants";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

type TemplateStatus = "all" | "approved" | "pending" | "rejected";

const Template: React.FC = () => {
  const [activeTab, setActiveTab] = useState<TemplateStatus>("all");
  const [showEditor, setShowEditor] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [expandedTemplate, setExpandedTemplate] = useState<string | null>(null);

  const { data, isLoading, isError, refetch } = useGetAllTemplateQuery({});

  // Filter templates based on active tab and search query
  const filteredTemplates = data?.data?.filter((template) => {
    const matchesStatus =
      activeTab === "all" ||
      template.status.toLowerCase() === activeTab.toUpperCase();

    const matchesSearch =
      template.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      template.category.toLowerCase().includes(searchQuery.toLowerCase());

    return matchesStatus && matchesSearch;
  });

  const toggleTemplateExpand = (id: string) => {
    setExpandedTemplate(expandedTemplate === id ? null : id);
  };

  useEffect(() => {
    // Refetch data when tab changes
    refetch();
  }, [activeTab, refetch]);

  return (
    <div className="flex min-h-screen bg-[#e5e7ec]">
      {/* Sidebar */}
      <div className="flex-col hidden bg-white border-r border-gray-200 md:flex md:w-60">
        <div className="p-6 py-2 border-b border-gray-200">
          <h1 className="flex items-center font-semibold text-zinc-600 text-md">
            <span className="p-1 mr-2 rounded text-zinc-600 bg-zinc-100">
              <BiBroadcast size={20} />
            </span>
            Broadcasts
          </h1>
        </div>

        <nav className="flex-1 p-4 space-y-3 ">
          <a
            href="#"
            className="flex items-center p-2 text-sm rounded text-zinc-600 bg-zinc-100"
          >
            <FiHome className="mr-3 text-zinc-600" size={18} />
            Dashboard
          </a>

          <a
            onClick={() => {
              setShowEditor(false);
            }}
            className="flex items-center p-2 bg-transparent rounded text-zinc-600 text-md hover:bg-zinc-100"
          >
            <FiMessageSquare className="mr-3" size={18} />
            Templates
            <span className="ml-auto bg-zinc-100 text-zinc-800 text-xs font-semibold px-2 py-0.5 rounded-full">
              {data?.data?.length || 0}
            </span>
          </a>

          <button
            onClick={() => setShowEditor(true)}
            className="flex items-center w-full p-2 bg-transparent rounded text-zinc-600 text-md hover:bg-zinc-100"
          >
            <FiPlus className="mr-3" size={18} />
            Create Template
          </button>

          <a
            href="#"
            className="flex items-center p-2 bg-transparent rounded text-zinc-600 text-md hover:bg-zinc-100"
          >
            <FiMail className="mr-3" size={18} />
            Messages
          </a>

          <a
            href="#"
            className="flex items-center p-2 bg-transparent rounded text-zinc-600 text-md hover:bg-zinc-100"
          >
            <FiSettings className="mr-3" size={18} />
            Settings
          </a>
        </nav>

        <div className="p-4 border-t border-gray-200">
          <div className="flex items-center">
            <div className="flex items-center justify-center w-10 h-10 rounded-full bg-zinc-100">
              <span className="font-semibold text-zinc-600">U</span>
            </div>
            <div className="ml-3">
              <p className="text-sm font-medium text-gray-900">User Name</p>
              <p className="text-xs text-gray-500">Admin</p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex flex-col flex-1 overflow-hidden">
        {/* Content */}
        <main className="flex-1 p-6 overflow-y-auto">
          {showEditor ? (
            <TemplateEditor onClose={setShowEditor} />
          ) : (
            <div className="space-y-6">
              {/* Filters and Actions */}
              <div className="overflow-hidden bg-white rounded-lg shadow">
                <div className="flex flex-col px-6 py-4 border-b border-gray-200 sm:flex-row sm:items-center sm:justify-between">
                  <div className="flex items-center mb-4 space-x-2 sm:mb-0">
                    <button
                      onClick={() => setActiveTab("all")}
                      className={`px-4 py-2 text-sm font-medium rounded-md ${
                        activeTab === "all"
                          ? "bg-green-600 text-white"
                          : "text-gray-700 hover:bg-gray-100"
                      }`}
                    >
                      All Templates
                    </button>
                    <button
                      onClick={() => setActiveTab("approved")}
                      className={`px-4 py-2 text-sm font-medium rounded-md flex items-center ${
                        activeTab === "approved"
                          ? "bg-green-100 text-green-800"
                          : "text-gray-700 hover:bg-gray-100"
                      }`}
                    >
                      <FiCheckCircle className="mr-1" size={14} />
                      Approved
                    </button>
                    <button
                      onClick={() => setActiveTab("pending")}
                      className={`px-4 py-2 text-sm font-medium rounded-md flex items-center ${
                        activeTab === "pending"
                          ? "bg-yellow-100 text-yellow-800"
                          : "text-gray-700 hover:bg-gray-100"
                      }`}
                    >
                      <FiClock className="mr-1" size={14} />
                      Pending
                    </button>
                    <button
                      onClick={() => setActiveTab("rejected")}
                      className={`px-4 py-2 text-sm font-medium rounded-md flex items-center ${
                        activeTab === "rejected"
                          ? "bg-red-100 text-red-800"
                          : "text-gray-700 hover:bg-gray-100"
                      }`}
                    >
                      <FiXCircle className="mr-1" size={14} />
                      Rejected
                    </button>
                  </div>

                  <button
                    onClick={() => setShowEditor(true)}
                    className="inline-flex items-center px-4 py-2 text-sm font-medium text-white bg-green-600 border border-transparent rounded-md shadow-sm hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                  >
                    <FiPlus className="mr-2" size={16} />
                    New Template
                  </button>
                </div>

                {/* Template List */}
                <div className="divide-y divide-gray-200">
                  {isLoading ? (
                    <div className="flex justify-center p-8">
                      <MdLocalDining className="animate-spin" size="lg" />
                    </div>
                  ) : isError ? (
                    <div className="p-8 text-center text-red-500">
                      Failed to load templates. Please try again.
                    </div>
                  ) : filteredTemplates?.length === 0 ? (
                    <div>No template found</div>
                  ) : (
                    <div className="overflow-hidden">
                      <div>
                        <Table>
                          <TableHeader>
                            <TableRow className="hover:bg-transparent">
                              <TableHead>Template Name</TableHead>
                              <TableHead>Category</TableHead>
                              <TableHead className="text-center">
                                Status
                              </TableHead>
                              <TableHead>Language</TableHead>
                              <TableHead className="text-center">
                                Last Updated
                              </TableHead>
                              <TableHead className="text-right w-[15rem] ">
                                Actions
                              </TableHead>
                            </TableRow>
                          </TableHeader>
                          <TableBody className="">
                            {filteredTemplates.map((template) => (
                              <TableRow key={template.id} className="">
                                <TableCell>
                                  <div className="flex items-center gap-3">
                                    <div>
                                      <div className="font-medium">
                                        {template.name}
                                      </div>
                                    </div>
                                  </div>
                                </TableCell>
                                <TableCell>
                                  {template.category.charAt(0).toUpperCase() +
                                    template.category.slice(1).toLowerCase()}
                                </TableCell>
                                <TableCell className="text-center">
                                  {" "}
                                  <span
                                    className={`px-10 py-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                                      template.status === "APPROVED"
                                        ? "bg-green-700/20 text-green-800"
                                        : template.status === "PENDING"
                                        ? "bg-yellow-100 text-yellow-800"
                                        : "bg-red-100 text-red-800"
                                    }`}
                                  >
                                    {template.status}
                                  </span>
                                </TableCell>
                                <TableCell>
                                  {WHATSAPP_TEMPLATE_LANGUAGES.find(
                                    (lang) => lang.code === template.language
                                  )?.label || template.language}
                                </TableCell>
                                <TableCell className="text-center">
                                  {format(
                                    new Date(template.updatedAt),
                                    "MMM d, yyyy"
                                  )}
                                </TableCell>
                                <TableCell className="text-right max-w-[15rem] ">
                                  <div className="flex justify-end space-x-2">
                                    <button
                                      className="px-4 border border-green-700 rounded cursor-pointer bg-green-800/10 text-zinc-700 hover:text-zinc-600"
                                      onClick={(e) => {
                                        e.stopPropagation();
                                        // Handle edit
                                      }}
                                    >
                                      Send Broadcast
                                    </button>
                                    <button
                                      className="p-2 rounded text-zinc-600 bg-zinc-100 hover:text-red-600"
                                      onClick={(e) => {
                                        e.stopPropagation();
                                        // Handle delete
                                      }}
                                    >
                                      <FiTrash2 size={18} />
                                    </button>
                                  </div>
                                </TableCell>
                              </TableRow>
                            ))}
                          </TableBody>
                        </Table>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default Template;
