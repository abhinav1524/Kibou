import { useState } from "react";
import Modal from "@/components/Modal";
import { Plus, Edit, Trash } from "lucide-react";

type Application = {
  id: number;
  name: string;
  position: string;
  status: string;
  appliedOn: string;
};

export default function Applications() {
  const [applications, setApplications] = useState<Application[]>([
    {
      id: 1,
      name: "John Doe",
      position: "Frontend Developer",
      status: "Pending",
      appliedOn: "2025-07-01",
    },
  ]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editApplicationId, setEditApplicationId] = useState<number | null>(null);
  const [formData, setFormData] = useState({
    name: "",
    position: "",
    status: "",
    appliedOn: "",
  });
    const [searchTerm, setSearchTerm] = useState("");
    const filteredApplications = applications.filter((app) =>
     app.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
     app.position.toLowerCase().includes(searchTerm.toLowerCase())
    );
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [applicationToDelete, setApplicationToDelete] = useState<Application | null>(null);

  const openDeleteModal = (app: Application) => {
    setApplicationToDelete(app);
    setIsDeleteModalOpen(true);
  };

  const handleDelete = () => {
    if (applicationToDelete) {
      setApplications((prev) => prev.filter((a) => a.id !== applicationToDelete.id));
      setIsDeleteModalOpen(false);
      setApplicationToDelete(null);
    }
  };

  const handleEdit = (id: number) => {
    const application = applications.find((a) => a.id === id);
    if (application) {
      setFormData(application);
      setEditApplicationId(id);
      setIsModalOpen(true);
    }
  };

  const handleSave = () => {
    if (editApplicationId) {
      setApplications((prev) =>
        prev.map((a) => (a.id === editApplicationId ? { ...a, ...formData } : a))
      );
    } else {
      setApplications((prev) => [
        ...prev,
        { ...formData, id: Date.now() },
      ]);
    }
    setFormData({ name: "", position: "", status: "", appliedOn: "" });
    setEditApplicationId(null);
    setIsModalOpen(false);
  };

  const handleAdd = () => {
    setFormData({ name: "", position: "", status: "", appliedOn: "" });
    setEditApplicationId(null);
    setIsModalOpen(true);
  };

  return (
    <div className="p-6">
      <input
        type="text"
        placeholder="Search applications..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="mb-4 px-4 py-2 border rounded w-full sm:w-1/2 text-gray-500"
      />
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold text-gray-900">Applications</h2>
        <Plus
          onClick={handleAdd}
          className="w-6 h-6 text-white bg-green-500 cursor-pointer"
        />
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full table-auto border border-gray-500">
          <thead className="bg-gray-500 text-left text-white">
            <tr>
              <th className="px-4 py-2 border">Name</th>
              <th className="px-4 py-2 border">Position</th>
              <th className="px-4 py-2 border">Status</th>
              <th className="px-4 py-2 border">Applied On</th>
              <th className="px-4 py-2 border">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredApplications.map((app) => (
              <tr key={app.id} className="text-gray-800">
                <td className="px-4 py-2 border">{app.name}</td>
                <td className="px-4 py-2 border">{app.position}</td>
                <td className="px-4 py-2 border">{app.status}</td>
                <td className="px-4 py-2 border">{app.appliedOn}</td>
                <td className="px-4 py-2 space-x-2 flex justify-around">
                  <Edit
                    onClick={() => handleEdit(app.id)}
                    className="text-blue-500 w-5 h-5 cursor-pointer"
                  />
                  <Trash
                    onClick={() => openDeleteModal(app)}
                    className="text-red-500 w-5 h-5 cursor-pointer"
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Add/Edit Modal */}
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <h2 className="text-lg font-bold mb-4 text-gray-800">
          {editApplicationId ? "Edit Application" : "Add Application"}
        </h2>
        <input
          type="text"
          placeholder="Name"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          className="w-full border border-gray-300 rounded px-3 py-2 mb-2 text-gray-500"
        />
        <input
          type="text"
          placeholder="Position"
          value={formData.position}
          onChange={(e) => setFormData({ ...formData, position: e.target.value })}
          className="w-full border border-gray-300 rounded px-3 py-2 mb-2 text-gray-500"
        />
        <input
          type="text"
          placeholder="Status"
          value={formData.status}
          onChange={(e) => setFormData({ ...formData, status: e.target.value })}
          className="w-full border border-gray-300 rounded px-3 py-2 mb-2 text-gray-500"
        />
        <input
          type="date"
          placeholder="Applied On"
          value={formData.appliedOn}
          onChange={(e) => setFormData({ ...formData, appliedOn: e.target.value })}
          className="w-full border border-gray-300 rounded px-3 py-2 mb-4 text-gray-500"
        />
        <div className="flex justify-end gap-2">
          <button
            onClick={() => setIsModalOpen(false)}
            className="bg-gray-300 hover:bg-gray-400 px-4 py-2 rounded text-gray-500"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
          >
            Save
          </button>
        </div>
      </Modal>

      {/* Confirm Delete Modal */}
      <Modal isOpen={isDeleteModalOpen} onClose={() => setIsDeleteModalOpen(false)}>
        <h2 className="text-lg font-bold mb-4">Confirm Delete</h2>
        <p className="text-gray-700 mb-4">
          Are you sure you want to delete "{applicationToDelete?.name}" application?
        </p>
        <div className="flex justify-end gap-2">
          <button
            onClick={() => setIsDeleteModalOpen(false)}
            className="bg-gray-300 hover:bg-gray-400 px-4 py-2 rounded"
          >
            Cancel
          </button>
          <button
            onClick={handleDelete}
            className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded"
          >
            Yes, Delete
          </button>
        </div>
      </Modal>
    </div>
  );
}
