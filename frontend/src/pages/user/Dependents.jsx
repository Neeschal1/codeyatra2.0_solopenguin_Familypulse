import React, { useEffect, useState } from "react";
import { getDependents, createDependent, deleteDependent } from "../../api";
import { Card, Button, Input, Modal, Alert, Spinner, EmptyState } from "../../components/UI";

const Dependents = () => {
  const [dependents, setDependents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [form, setForm] = useState({ first_name: "", last_name: "", date_of_birth: "", email: "", phone: "" });
  const [error, setError] = useState("");
  const [saving, setSaving] = useState(false);

  const load = () => getDependents().then(setDependents).finally(() => setLoading(false));
  useEffect(() => { load(); }, []);

  const set = (key) => (e) => setForm({ ...form, [key]: e.target.value });

  const handleCreate = async (e) => {
    e.preventDefault();
    setError("");
    setSaving(true);
    try {
      await createDependent(form);
      setModalOpen(false);
      setForm({ first_name: "", last_name: "", date_of_birth: "", email: "", phone: "" });
      load();
    } catch (err) {
      setError(err.message);
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Remove this dependent?")) return;
    await deleteDependent(id);
    load();
  };

  if (loading) return <Spinner />;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-extrabold text-gray-800">Dependents</h2>
          <p className="text-gray-400 text-sm mt-1">Manage your family members</p>
        </div>
        <Button onClick={() => setModalOpen(true)}>+ Add Dependent</Button>
      </div>

      {dependents.length === 0 ? (
        <Card className="p-6">
          <EmptyState message="No dependents added yet. Add one to get started." />
        </Card>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {dependents.map((d) => (
            <Card key={d.id} className="p-6">
              <div className="flex items-start justify-between mb-4">
                <div className="w-12 h-12 rounded-2xl bg-linear-to-br from-[#9747ff] to-[#7d1ef9] flex items-center justify-center text-white text-lg font-bold shadow-lg shadow-[#9747ff]/20">
                  {d.first_name?.[0]}
                </div>
                <button
                  onClick={() => handleDelete(d.id)}
                  className="text-red-400 hover:text-red-600 text-sm transition-colors"
                >
                  🗑️
                </button>
              </div>
              <h3 className="font-bold text-gray-800">{d.first_name} {d.last_name}</h3>
              <p className="text-xs text-gray-400 mt-1">{d.email}</p>
              <p className="text-xs text-gray-400">{d.phone}</p>
              <p className="text-xs text-gray-400">DOB: {d.date_of_birth}</p>
            </Card>
          ))}
        </div>
      )}

      <Modal open={modalOpen} onClose={() => setModalOpen(false)} title="Add Dependent">
        <form onSubmit={handleCreate} className="space-y-4">
          <Alert message={error} />
          <div className="grid grid-cols-2 gap-3">
            <Input label="First Name" placeholder="First name" value={form.first_name} onChange={set("first_name")} required />
            <Input label="Last Name" placeholder="Last name" value={form.last_name} onChange={set("last_name")} required />
          </div>
          <Input label="Date of Birth" type="date" value={form.date_of_birth} onChange={set("date_of_birth")} required />
          <Input label="Email" type="email" placeholder="Email address" value={form.email} onChange={set("email")} required />
          <Input label="Phone" placeholder="Phone number" value={form.phone} onChange={set("phone")} required />
          <div className="flex gap-3 pt-2">
            <Button type="submit" disabled={saving} className="flex-1">
              {saving ? "Saving..." : "Add Dependent"}
            </Button>
            <Button variant="outline" onClick={() => setModalOpen(false)} className="flex-1">Cancel</Button>
          </div>
        </form>
      </Modal>
    </div>
  );
};

export default Dependents;
