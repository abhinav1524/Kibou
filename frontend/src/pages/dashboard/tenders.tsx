import { useState } from "react";
import Modal from "@/components/Modal";
import { Plus, Edit, Trash } from "lucide-react";
type Tender = {
  id: number;
  title: string;
  description: string;
  budget: string;
  deadline: string;
};

export default function Tenders() {
  const [tenders, setTenders] = useState<Tender[]>([
    {
      id: 1,
      title: "Website Development",
      description: "Create a responsive company website.",
      budget: "$5000",
      deadline: "2025-07-30",
    },
  ]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editTenderId, setEditTenderId] = useState<number | null>(null);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    budget: "",
    deadline: "",
  });

  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [tenderToDelete, setTenderToDelete] = useState<Tender | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const filteredTenders = tenders.filter((tender) =>
  tender.title.toLowerCase().includes(searchTerm.toLowerCase())
);
  const handleEdit = (id: number) => {
    const tender = tenders.find((t) => t.id === id);
    if (tender) {
      setFormData(tender);
      setEditTenderId(id);
      setIsModalOpen(true);
    }
  };

  const openDeleteModal = (tender: Tender) => {
    setTenderToDelete(tender);
    setIsDeleteModalOpen(true);
  };

  const handleDelete = () => {
    if (tenderToDelete) {
      setTenders((prev) => prev.filter((t) => t.id !== tenderToDelete.id));
      setIsDeleteModalOpen(false);
      setTenderToDelete(null);
    }
  };

  const handleSave = () => {
    if (editTenderId) {
      setTenders(
        tenders.map((t) =>
          t.id === editTenderId ? { ...t, ...formData } : t
        )
      );
    } else {
      setTenders([
        ...tenders,
        { ...formData, id: Date.now() }, // Simulated ID
      ]);
    }
    setIsModalOpen(false);
    setFormData({ title: "", description: "", budget: "", deadline: "" });
    setEditTenderId(null);
  };

  return (
    <div className="p-6">
      <input
        type="text"
        placeholder="Search tenders..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="mb-4 px-4 py-2 border rounded w-full sm:w-1/2 text-gray-500"
      />
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold text-gray-900">Tenders</h2>
        <Plus
          onClick={() => {
            setFormData({ title: "", description: "", budget: "", deadline: "" });
            setEditTenderId(null);
            setIsModalOpen(true);
          }}
          className="w-6 h-6 text-white bg-green-500 cursor-pointer"
        />
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full table-auto border border-gray-500">
          <thead className="bg-gray-500 text-left text-white">
            <tr>
              <th className="px-4 py-2 border">Title</th>
              <th className="px-4 py-2 border">Description</th>
              <th className="px-4 py-2 border">Budget</th>
              <th className="px-4 py-2 border">Deadline</th>
              <th className="px-4 py-2 border">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredTenders.map((tender) => (
              <tr key={tender.id} className="text-gray-800">
                <td className="px-4 py-2 border">{tender.title}</td>
                <td className="px-4 py-2 border">{tender.description}</td>
                <td className="px-4 py-2 border">{tender.budget}</td>
                <td className="px-4 py-2 border">{tender.deadline}</td>
                <td className="px-4 py-2 space-x-2 flex justify-around">
                  <Edit
                    onClick={() => handleEdit(tender.id)}
                    className="text-blue-500 w-5 h-5 cursor-pointer"
                  />
                  <Trash
                    onClick={() => openDeleteModal(tender)}
                    className="text-red-500 w-5 h-5 cursor-pointer"
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Add/Edit Tender Modal */}
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <h2 className="text-lg font-bold mb-4 text-gray-500">
          {editTenderId ? "Edit Tender" : "Add Tender"}
        </h2>
        <input
          type="text"
          placeholder="Title"
          value={formData.title}
          onChange={(e) => setFormData({ ...formData, title: e.target.value })}
          className="w-full border border-gray-300 rounded px-3 py-2 mb-2 text-gray-500"
        />
        <input
          type="text"
          placeholder="Description"
          value={formData.description}
          onChange={(e) => setFormData({ ...formData, description: e.target.value })}
          className="w-full border border-gray-300 rounded px-3 py-2 mb-2 text-gray-500"
        />
        <input
          type="text"
          placeholder="Budget"
          value={formData.budget}
          onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
          className="w-full border border-gray-300 rounded px-3 py-2 mb-2 text-gray-500"
        />
        <input
          type="date"
          value={formData.deadline}
          onChange={(e) => setFormData({ ...formData, deadline: e.target.value })}
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
          Are you sure you want to delete "{tenderToDelete?.title}" tender?
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
