import React, { useEffect, useState } from "react";
import { getAdminVisits, getAdminNurses, assignNurse } from "../../api";
import { Card, Badge, Button, Select, Modal, Alert, Spinner, EmptyState } from "../../components/UI";

const AdminVisits = () => {
  const [visits, setVisits] = useState([]);
  const [nurses, setNurses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [assignModal, setAssignModal] = useState(null); // visit object
  const [selectedNurse, setSelectedNurse] = useState("");
  const [error, setError] = useState("");
  const [saving, setSaving] = useState(false);

  const load = () =>
    Promise.all([getAdminVisits(), getAdminNurses()])
      .then(([v, n]) => { setVisits(v); setNurses(n); })
      .finally(() => setLoading(false));

  useEffect(() => { load(); }, []);

  const handleAssign = async (e) => {
    e.preventDefault();
    if (!selectedNurse) return setError("Please select a nurse");
    setError("");
    setSaving(true);
    try {
      await assignNurse(assignModal.id, selectedNurse);
      setAssignModal(null);
      setSelectedNurse("");
      load();
    } catch (err) {
      setError(err.message);
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <Spinner />;

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-extrabold text-gray-800">All Visits</h2>
        <p className="text-gray-400 text-sm mt-1">Assign nurses and monitor visit status</p>
      </div>

      {visits.length === 0 ? (
        <Card className="p-6">
          <EmptyState message="No visits in the system." />
        </Card>
      ) : (
        <div className="space-y-4">
          {visits.map((v) => (
            <Card key={v.id} className="p-5">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div className="flex items-center gap-4">
                  <div className="w-11 h-11 rounded-xl bg-[#f0e6ff] flex items-center justify-center text-xl">📋</div>
                  <div>
                    <p className="font-bold text-gray-800">{v.service?.replace(/_/g, " ")}</p>
                    <p className="text-xs text-gray-400">{new Date(v.scheduled_at).toLocaleString()}</p>
                    <p className="text-xs text-gray-400">Fee: ${v.fee} · {v.is_paid ? "✅ Paid" : "❌ Unpaid"}</p>
                    {v.nurse ? (
                      <p className="text-xs text-[#9747ff] font-medium mt-0.5">Nurse assigned</p>
                    ) : (
                      <p className="text-xs text-yellow-600 font-medium mt-0.5">⚠️ Unassigned</p>
                    )}
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Badge status={v.status} />
                  <Button
                    variant={v.nurse ? "outline" : "primary"}
                    onClick={() => { setAssignModal(v); setSelectedNurse(v.nurse || ""); setError(""); }}
                    className="text-xs px-3 py-1.5"
                  >
                    {v.nurse ? "Reassign" : "Assign Nurse"}
                  </Button>
                </div>
              </div>
            </Card>
          ))}
        </div>
      )}

      <Modal
        open={!!assignModal}
        onClose={() => { setAssignModal(null); setSelectedNurse(""); }}
        title="Assign Nurse to Visit"
      >
        {assignModal && (
          <form onSubmit={handleAssign} className="space-y-4">
            <div className="p-3 bg-gray-50 rounded-xl">
              <p className="text-sm font-semibold text-gray-700">{assignModal.service?.replace(/_/g, " ")}</p>
              <p className="text-xs text-gray-400">{new Date(assignModal.scheduled_at).toLocaleString()}</p>
            </div>
            <Alert message={error} />
            <Select
              label="Select Nurse"
              value={selectedNurse}
              onChange={(e) => setSelectedNurse(e.target.value)}
            >
              <option value="" disabled>Choose a nurse</option>
              {nurses.filter((n) => n.is_active).map((n) => (
                <option key={n.id} value={n.id}>{n.email}</option>
              ))}
            </Select>
            <div className="flex gap-3 pt-2">
              <Button type="submit" disabled={saving} className="flex-1">
                {saving ? "Assigning..." : "Assign"}
              </Button>
              <Button variant="outline" onClick={() => setAssignModal(null)} className="flex-1">Cancel</Button>
            </div>
          </form>
        )}
      </Modal>
    </div>
  );
};

export default AdminVisits;
