import React, { useEffect, useState } from "react";
import { getNurseVisits, startVisit, completeVisit } from "../../api";
import { Card, Badge, Button, Spinner, EmptyState } from "../../components/UI";

const NurseVisits = () => {
  const [visits, setVisits] = useState([]);
  const [loading, setLoading] = useState(true);
  const [actionId, setActionId] = useState(null);

  const load = async () => {
    try {
      const data = await getNurseVisits();
      setVisits(data);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { load(); }, []);

  const handleStart = async (id) => {
    setActionId(id);
    try {
      const updated = await startVisit(id);
      setVisits((prev) => prev.map((v) => (v.id === id ? { ...v, ...updated } : v)));
    } catch (e) {
      alert(e.message);
      await load();
    } finally {
      setActionId(null);
    }
  };

  const handleComplete = async (id) => {
    setActionId(id);
    try {
      const updated = await completeVisit(id);
      setVisits((prev) => prev.map((v) => (v.id === id ? { ...v, ...updated } : v)));
    } catch (e) {
      alert(e.message);
      await load();
    } finally {
      setActionId(null);
    }
  };

  if (loading) return <Spinner />;

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-extrabold text-gray-800">My Visits</h2>
        <p className="text-gray-400 text-sm mt-1">Manage your assigned care visits</p>
      </div>

      {visits.length === 0 ? (
        <Card className="p-6">
          <EmptyState message="No visits assigned to you yet." />
        </Card>
      ) : (
        <div className="space-y-4">
          {visits.map((v) => (
            <Card key={v.id} className="p-5">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div className="flex items-center gap-4">
                  <div className="w-11 h-11 rounded-xl bg-[#f0e6ff] flex items-center justify-center text-xl">🩺</div>
                  <div>
                    <p className="font-bold text-gray-800">{v.service?.replace(/_/g, " ")}</p>
                    <p className="text-xs text-gray-400">{new Date(v.scheduled_at).toLocaleString()}</p>
                    <p className="text-xs text-gray-400">Fee: ${v.fee}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 flex-wrap">
                  <Badge status={v.status} />
                  {(v.status === "SCHEDULED" || v.status === "ASSIGNED") && (
                    <Button
                      onClick={() => handleStart(v.id)}
                      disabled={actionId === v.id}
                      className="text-xs px-3 py-1.5"
                    >
                      {actionId === v.id ? "Starting..." : "Start Visit"}
                    </Button>
                  )}
                  {v.status === "STARTED" && (
                    <Button
                      variant="outline"
                      onClick={() => handleComplete(v.id)}
                      disabled={actionId === v.id}
                      className="text-xs px-3 py-1.5"
                    >
                      {actionId === v.id ? "Completing..." : "Complete Visit"}
                    </Button>
                  )}
                </div>
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default NurseVisits;