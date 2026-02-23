import React, { useEffect, useState } from "react";
import { getReports, createReport, updateReport, deleteReport, getAISummary, getNurseVisits } from "../../api";
import { Card, Spinner, EmptyState } from "../../components/UI";

const emptyForm = {
  visit: "",
  body_weight: "",
  haemoglobin: "",
  platelets: "",
  blood_pressure: "",
  heartbeat: "",
  notes: "",
};

const Field = ({ label, value, onChange, type = "text", placeholder, disabled }) => (
  <div>
    <label className="text-sm font-medium text-gray-700">{label}</label>
    <input
      type={type}
      className="mt-1 w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#9747ff]/40 disabled:bg-gray-50"
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      disabled={disabled}
    />
  </div>
);

const NurseReports = () => {
  const [reports, setReports] = useState([]);
  const [visits, setVisits] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState(emptyForm);
  const [editId, setEditId] = useState(null);
  const [submitting, setSubmitting] = useState(false);
  const [deleteId, setDeleteId] = useState(null);
  const [error, setError] = useState("");
  const [aiSummary, setAiSummary] = useState({ id: null, text: "", loading: false });

  const load = async () => {
    try {
      const [reportsData, visitsData] = await Promise.all([getReports(), getNurseVisits()]);
      console.log("visits loaded:", visitsData);
      setReports(reportsData);
      setVisits(visitsData);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { load(); }, []);

  const set = (key) => (e) => setForm({ ...form, [key]: e.target.value });

  const openCreate = () => {
    setForm(emptyForm);
    setEditId(null);
    setError("");
    setShowForm(true);
  };

  const openEdit = (r) => {
    setForm({
      visit: r.visit,
      body_weight: r.body_weight || "",
      haemoglobin: r.haemoglobin || "",
      platelets: r.platelets || "",
      blood_pressure: r.blood_pressure || "",
      heartbeat: r.heartbeat || "",
      notes: r.notes || "",
    });
    setEditId(r.id);
    setError("");
    setShowForm(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setError("");
    try {
      if (editId) {
        const updated = await updateReport(editId, form);
        setReports((prev) => prev.map((r) => (r.id === editId ? updated : r)));
      } else {
        const created = await createReport(form);
        setReports((prev) => [created, ...prev]);
      }
      setShowForm(false);
    } catch (err) {
      setError(err.message);
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this report?")) return;
    setDeleteId(id);
    try {
      await deleteReport(id);
      setReports((prev) => prev.filter((r) => r.id !== id));
      if (aiSummary.id === id) setAiSummary({ id: null, text: "", loading: false });
    } catch (err) {
      alert(err.message);
    } finally {
      setDeleteId(null);
    }
  };

  const handleAISummary = async (id) => {
    setAiSummary({ id, text: "", loading: true });
    try {
      const res = await getAISummary(id);
      setAiSummary({ id, text: res.summary, loading: false });
    } catch (err) {
      setAiSummary({ id, text: "Failed to generate summary: " + err.message, loading: false });
    }
  };

  const completedVisits = visits.filter((v) => v.status === "STARTED" || v.status === "COMPLETED");

  if (loading) return <Spinner />;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-extrabold text-gray-800">Reports</h2>
          <p className="text-gray-400 text-sm mt-1">Create and manage visit health reports</p>
        </div>
        <button
          onClick={openCreate}
          className="bg-linear-to-r from-[#9747ff] to-[#7d1ef9] text-white px-5 py-2.5 rounded-xl text-sm font-semibold shadow-lg shadow-[#9747ff]/30 hover:scale-[1.02] active:scale-[0.98] transition-all duration-200"
        >
          + New Report
        </button>
      </div>

      {showForm && (
        <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center px-4">
          <div className="bg-white rounded-3xl shadow-2xl w-full max-w-lg p-8 space-y-5 max-h-[90vh] overflow-y-auto">
            <h3 className="text-2xl font-extrabold text-[#9747ff]">{editId ? "Edit Report" : "New Report"}</h3>
            {error && <p className="text-red-500 text-sm bg-red-50 px-4 py-2 rounded-xl">{error}</p>}
            <form onSubmit={handleSubmit} className="space-y-4">

              {/* ---- VISIT DROPDOWN ---- */}
              <div>
                <label className="text-sm font-medium text-gray-700">Visit</label>
                {editId ? (
                  <input
                    className="mt-1 w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm bg-gray-50"
                    value={form.visit}
                    disabled
                  />
                ) : (
                  <>
                    <select
                      className="mt-1 w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#9747ff]/40"
                      value={form.visit}
                      onChange={set("visit")}
                      required
                    >
                      <option value="" disabled>Select a visit</option>
                      {completedVisits.map((v) => (
                        <option key={v.id} value={v.id}>
                          {v.service?.replace(/_/g, " ")} — {new Date(v.scheduled_at).toLocaleDateString()} ({v.status})
                        </option>
                      ))}
                    </select>
                    {completedVisits.length === 0 && (
                      <p className="text-xs text-orange-400 mt-1">⚠️ No started or completed visits found. Start a visit first.</p>
                    )}
                  </>
                )}
              </div>

              <div className="grid grid-cols-2 gap-4">
                <Field label="Body Weight (kg)" placeholder="e.g. 70" value={form.body_weight} onChange={set("body_weight")} />
                <Field label="Haemoglobin" placeholder="e.g. 13.5" value={form.haemoglobin} onChange={set("haemoglobin")} />
                <Field label="Platelets" placeholder="e.g. 250000" value={form.platelets} onChange={set("platelets")} type="number" />
                <Field label="Blood Pressure" placeholder="e.g. 120/80" value={form.blood_pressure} onChange={set("blood_pressure")} />
                <Field label="Heartbeat (bpm)" placeholder="e.g. 72" value={form.heartbeat} onChange={set("heartbeat")} type="number" />
              </div>

              <div>
                <label className="text-sm font-medium text-gray-700">Notes</label>
                <textarea
                  className="mt-1 w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#9747ff]/40 resize-none"
                  rows={3}
                  placeholder="Additional notes..."
                  value={form.notes}
                  onChange={set("notes")}
                />
              </div>

              <div className="flex gap-3 pt-2">
                <button
                  type="submit"
                  disabled={submitting}
                  className="flex-1 bg-linear-to-r from-[#9747ff] to-[#7d1ef9] text-white py-2.5 rounded-xl text-sm font-semibold shadow-lg shadow-[#9747ff]/30 hover:scale-[1.02] transition-all duration-200 disabled:opacity-60"
                >
                  {submitting ? "Saving..." : editId ? "Update Report" : "Create Report"}
                </button>
                <button
                  type="button"
                  onClick={() => setShowForm(false)}
                  className="flex-1 border-2 border-gray-200 text-gray-500 py-2.5 rounded-xl text-sm font-semibold hover:bg-gray-50 transition-all duration-200"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {reports.length === 0 ? (
        <Card className="p-6">
          <EmptyState message="No reports yet. Create one after completing a visit." />
        </Card>
      ) : (
        <div className="space-y-4">
          {reports.map((r) => (
            <Card key={r.id} className="p-5 space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <span className="text-lg">📋</span>
                    <p className="font-bold text-gray-800 text-sm">
                      Visit: <span className="font-mono text-xs text-gray-400">{r.visit}</span>
                    </p>
                  </div>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-x-6 gap-y-1 text-xs text-gray-600">
                    {r.body_weight && <p>⚖️ Weight: <span className="font-medium">{r.body_weight} kg</span></p>}
                    {r.haemoglobin && <p>🩸 Haemoglobin: <span className="font-medium">{r.haemoglobin}</span></p>}
                    {r.platelets && <p>🔬 Platelets: <span className="font-medium">{r.platelets}</span></p>}
                    {r.blood_pressure && <p>💉 BP: <span className="font-medium">{r.blood_pressure}</span></p>}
                    {r.heartbeat && <p>❤️ Heartbeat: <span className="font-medium">{r.heartbeat} bpm</span></p>}
                  </div>
                  {r.notes && <p className="text-xs text-gray-400 italic">"{r.notes}"</p>}
                  <p className="text-xs text-gray-300">{new Date(r.created_at).toLocaleString()}</p>
                </div>
                <div className="flex gap-2 shrink-0 flex-wrap">
                  <button
                    onClick={() => handleAISummary(r.id)}
                    disabled={aiSummary.loading && aiSummary.id === r.id}
                    className="text-xs px-3 py-1.5 bg-linear-to-r from-[#9747ff] to-[#7d1ef9] text-white rounded-lg font-semibold hover:scale-[1.02] transition-all duration-200 disabled:opacity-60"
                  >
                    {aiSummary.loading && aiSummary.id === r.id ? "Generating..." : "✨ AI Summary"}
                  </button>
                  <button
                    onClick={() => openEdit(r)}
                    className="text-xs px-3 py-1.5 border-2 border-[#9747ff] text-[#9747ff] rounded-lg font-semibold hover:bg-[#f5f0ff] transition-all duration-200"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(r.id)}
                    disabled={deleteId === r.id}
                    className="text-xs px-3 py-1.5 border-2 border-red-300 text-red-400 rounded-lg font-semibold hover:bg-red-50 transition-all duration-200 disabled:opacity-60"
                  >
                    {deleteId === r.id ? "Deleting..." : "Delete"}
                  </button>
                </div>
              </div>

              {aiSummary.id === r.id && (
                <div className="bg-[#f5f0ff] border border-[#9747ff]/20 rounded-2xl p-4 space-y-2">
                  <div className="flex items-center justify-between">
                    <p className="text-sm font-bold text-[#9747ff]">✨ AI Summary</p>
                    <button
                      onClick={() => setAiSummary({ id: null, text: "", loading: false })}
                      className="text-xs text-gray-400 hover:text-gray-600"
                    >
                      ✕ Close
                    </button>
                  </div>
                  {aiSummary.loading ? (
                    <p className="text-sm text-gray-400 animate-pulse">Generating patient-friendly summary...</p>
                  ) : (
                    <p className="text-sm text-gray-700 whitespace-pre-line leading-relaxed">{aiSummary.text}</p>
                  )}
                </div>
              )}
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default NurseReports;