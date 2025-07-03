import { useState } from "react";
import Modal from "@/components/Modal";
import { Plus, Edit, Trash } from "lucide-react";

type CompanyProfileType = {
  id: number;
  image: string;
  name: string;
  industry: string;
  description: string;
};

export default function Profile() {
  const [companies, setCompanies] = useState<CompanyProfileType[]>([
    {
      id: 1,
      image: "",
      name: "Kibou Technologies",
      industry: "Software",
      description: "Building innovative tender platforms for B2B companies.",
    },
  ]);

  const [formData, setFormData] = useState({
    image: "",
    name: "",
    industry: "",
    description: "",
  });
  const [searchTerm, setSearchTerm] = useState("");
  const filteredCompanies = companies.filter((company) =>
    company.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    company.industry.toLowerCase().includes(searchTerm.toLowerCase())
  );
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isConfirmDeleteOpen, setIsConfirmDeleteOpen] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [companyToDelete, setCompanyToDelete] = useState<CompanyProfileType | null>(null);

  const handleAdd = () => {
    setFormData({ image: "", name: "", industry: "", description: "" });
    setEditingId(null);
    setIsModalOpen(true);
  };

  const handleEdit = (company: CompanyProfileType) => {
    setFormData(company);
    setEditingId(company.id);
    setIsModalOpen(true);
  };

  const handleSave = () => {
    if (editingId !== null) {
      // Edit existing
      setCompanies(prev =>
        prev.map(c => (c.id === editingId ? { id: editingId, ...formData } : c))
      );
    } else {
      // Add new
      setCompanies(prev => [...prev, { id: Date.now(), ...formData }]);
    }

    setFormData({ image: "", name: "", industry: "", description: "" });
    setEditingId(null);
    setIsModalOpen(false);
  };

  const handleDelete = () => {
    if (companyToDelete) {
      setCompanies(prev => prev.filter(c => c.id !== companyToDelete.id));
      setCompanyToDelete(null);
      setIsConfirmDeleteOpen(false);
    }
  };

  return (
    <>
      <div className="p-6">
        <input
          type="text"
          placeholder="Search companies..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="mb-4 px-4 py-2 border rounded w-full sm:w-1/2 text-gray-500"
        />
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-bold mb-6 text-gray-900">Company Profiles</h2>
          <Plus
            onClick={handleAdd}
            className="w-6 h-6 text-white bg-green-500 cursor-pointer"
          />
        </div>

        {filteredCompanies.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="min-w-full table-auto border border-gray-500">
              <thead className="bg-gray-500 text-left text-white">
                <tr>
                  <th className="px-4 py-2 border">Logo</th>
                  <th className="px-4 py-2 border">Name</th>
                  <th className="px-4 py-2 border">Industry</th>
                  <th className="px-4 py-2 border">Description</th>
                  <th className="px-4 py-2 border">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredCompanies.map((company) => (
                  <tr key={company.id} className="text-gray-800">
                    <td className="px-4 py-2 border">
                      {company.image ? (
                        <img
                          src={company.image}
                          alt="logo"
                          className="w-16 h-10 object-contain rounded"
                        />
                      ) : (
                        <span className="text-gray-400 italic">No image</span>
                      )}
                    </td>
                    <td className="px-4 py-2 border">{company.name}</td>
                    <td className="px-4 py-2 border">{company.industry}</td>
                    <td className="px-4 py-2 border">{company.description}</td>
                    <td className="px-4 py-2 space-x-2 flex justify-around">
                      <Edit
                        onClick={() => handleEdit(company)}
                        className="text-blue-500 w-5 h-5 cursor-pointer"
                      />
                      <Trash
                        onClick={() => {
                          setCompanyToDelete(company);
                          setIsConfirmDeleteOpen(true);
                        }}
                        className="text-red-500 w-5 h-5 cursor-pointer"
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="text-gray-500">No company profiles found.</div>
        )}
      </div>

      {/* Add/Edit Modal */}
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <h2 className="text-lg font-bold mb-4 text-gray-800">
          {editingId !== null ? "Edit Company" : "Add Company"}
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
          placeholder="Industry"
          value={formData.industry}
          onChange={(e) => setFormData({ ...formData, industry: e.target.value })}
          className="w-full border border-gray-300 rounded px-3 py-2 mb-2 text-gray-500"
        />
        <textarea
          placeholder="Description"
          value={formData.description}
          onChange={(e) => setFormData({ ...formData, description: e.target.value })}
          className="w-full border border-gray-300 rounded px-3 py-2 mb-4 text-gray-500"
        />
        <input
          type="file"
          accept="image/*"
           onChange={(e) => {
            const file = e.target.files?.[0];
            if (file) {
              const imageURL = URL.createObjectURL(file);
              setFormData({ ...formData, image: imageURL });
              }  }}
          className="w-full border border-gray-300 rounded px-3 py-2 mb-2 text-gray-500"
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
      <Modal
        isOpen={isConfirmDeleteOpen}
        onClose={() => setIsConfirmDeleteOpen(false)}
      >
        <h2 className="text-lg font-bold mb-4">Confirm Delete</h2>
        <p className="text-gray-700 mb-4">
          Are you sure you want to delete "{companyToDelete?.name}"?
        </p>
        <div className="flex justify-end gap-2">
          <button
            onClick={() => setIsConfirmDeleteOpen(false)}
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
    </>
  );
}
