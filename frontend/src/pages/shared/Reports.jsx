import React, { useEffect, useState } from "react";
import { getReports, getAISummary } from "../../api";
import { Card, Spinner, EmptyState } from "../../components/UI";

const Reports = () => {
  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(true);
  const [aiSummary, setAiSummary] = useState({ id: null, text: "", loading: false });

  useEffect(() => {
    getReports().then(setReports).finally(() => setLoading(false));
  }, []);

  const handleAISummary = async (id) => {
    setAiSummary({ id, text: "", loading: true });
    try {
      const res = await getAISummary(id);
      setAiSummary({ id, text: res.summary, loading: false });
    } catch (err) {
      setAiSummary({ id, text: "Failed to generate summary: " + err.message, loading: false });
    }
  };

  if (loading) return <Spinner />;

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-extrabold text-gray-800">Health Reports</h2>
        <p className="text-gray-400 text-sm mt-1">View health reports from completed visits</p>
      </div>

      {reports.length === 0 ? (
        <Card className="p-6">
          <EmptyState message="No reports available yet." />
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
                <button
                  onClick={() => handleAISummary(r.id)}
                  disabled={aiSummary.loading && aiSummary.id === r.id}
                  className="text-xs px-3 py-1.5 bg-linear-to-r from-[#9747ff] to-[#7d1ef9] text-white rounded-lg font-semibold hover:scale-[1.02] transition-all duration-200 disabled:opacity-60 shrink-0 h-fit"
                >
                  {aiSummary.loading && aiSummary.id === r.id ? "Generating..." : "✨ AI Summary"}
                </button>
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

export default Reports;