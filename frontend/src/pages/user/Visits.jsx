import React, { useEffect, useState } from "react";
import { getVisits, createVisit, getDependents, createPayment } from "../../api";
import { Card, Badge, Button, Input, Select, Modal, Alert, Spinner, EmptyState } from "../../components/UI";

const SERVICE_OPTIONS = [
  "VITALS_CHECK",
  "FULL_BODY_CHECK",
  "FOLLOW_UP",
];


const Visits = () => {
  const [visits, setVisits] = useState([]);
  const [dependents, setDependents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [payingId, setPayingId] = useState(null);
  const [form, setForm] = useState({ dependent: "", service: "", scheduled_at: "" });
  const [error, setError] = useState("");
  const [saving, setSaving] = useState(false);

  const load = () =>
    Promise.all([getVisits(), getDependents()])
      .then(([v, d]) => { setVisits(v); setDependents(d); })
      .finally(() => setLoading(false));

  useEffect(() => { load(); }, []);

  const set = (key) => (e) => setForm({ ...form, [key]: e.target.value });

  const handleCreate = async (e) => {
    e.preventDefault();
    setError("");
    setSaving(true);
    try {
      await createVisit({
        dependent: form.dependent,
        service: form.service,
        scheduled_at: new Date(form.scheduled_at).toISOString(),
      });
      setModalOpen(false);
      setForm({ dependent: "", service: "", scheduled_at: "" });
      load();
    } catch (err) {
      setError(err.message);
    } finally {
      setSaving(false);
    }
  };

  const handlePay = async (visit) => {
    setPayingId(visit.id);
    try {
      const res = await createPayment({
        visit_id: visit.id,
        paid_to: visit.nurse,
        description: `Payment for ${visit.service}`,
        amount: visit.fee,
      });
      if (res.checkout_url) window.open(res.checkout_url, "_blank");
    } catch (err) {
      alert("Payment failed: " + err.message);
    } finally {
      setPayingId(null);
    }
  };

  if (loading) return <Spinner />;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-extrabold text-gray-800">Visits</h2>
          <p className="text-gray-400 text-sm mt-1">Schedule and manage care visits</p>
        </div>
        <Button onClick={() => setModalOpen(true)}>+ Schedule Visit</Button>
      </div>

      {visits.length === 0 ? (
        <Card className="p-6">
          <EmptyState message="No visits scheduled yet." />
        </Card>
      ) : (
        <div className="space-y-4">
          {visits.map((v) => (
            <Card key={v.id} className="p-5">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-xl bg-[#f0e6ff] flex items-center justify-center text-lg">🏥</div>
                  <div>
                    <p className="font-bold text-gray-800">{v.service?.replace(/_/g, " ")}</p>
                    <p className="text-xs text-gray-400">{new Date(v.scheduled_at).toLocaleString()}</p>
                    <p className="text-xs text-gray-400">Fee: ${v.fee}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Badge status={v.status} />
                  {!v.is_paid && v.status === "COMPLETED" && (
                    <Button
                      variant="primary"
                      onClick={() => handlePay(v)}
                      disabled={payingId === v.id}
                      className="text-xs px-3 py-1.5"
                    >
                      {payingId === v.id ? "Processing..." : "Pay Now"}
                    </Button>
                  )}
                  {v.is_paid && (
                    <span className="text-xs text-green-600 font-semibold bg-green-50 px-2 py-1 rounded-lg">Paid ✓</span>
                  )}
                </div>
              </div>
            </Card>
          ))}
        </div>
      )}

      <Modal open={modalOpen} onClose={() => setModalOpen(false)} title="Schedule a Visit">
        <form onSubmit={handleCreate} className="space-y-4">
          <Alert message={error} />
          <Select label="Dependent" value={form.dependent} onChange={set("dependent")} required>
            <option value="" disabled>Select dependent</option>
            {dependents.map((d) => (
              <option key={d.id} value={d.id}>{d.first_name} {d.last_name}</option>
            ))}
          </Select>
          <Select label="Service" value={form.service} onChange={set("service")} required>
            <option value="" disabled>Select service</option>
            {SERVICE_OPTIONS.map((s) => (
              <option key={s} value={s}>{s.replace(/_/g, " ")}</option>
            ))}
          </Select>
          <Input label="Scheduled At" type="datetime-local" value={form.scheduled_at} onChange={set("scheduled_at")} required />
          <div className="flex gap-3 pt-2">
            <Button type="submit" disabled={saving} className="flex-1">
              {saving ? "Scheduling..." : "Schedule Visit"}
            </Button>
            <Button variant="outline" onClick={() => setModalOpen(false)} className="flex-1">Cancel</Button>
          </div>
        </form>
      </Modal>
    </div>
  );
};

export default Visits;
