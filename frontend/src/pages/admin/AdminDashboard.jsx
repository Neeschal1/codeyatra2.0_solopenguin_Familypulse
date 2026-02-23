import React, { useEffect, useState } from "react";
import { getAdminNurses, getAdminVisits } from "../../api";
import { Card, Badge, Spinner } from "../../components/UI";

const StatCard = ({ label, value, icon, color }) => (
  <Card className="p-6 flex items-center gap-4">
    <div className={`w-12 h-12 rounded-2xl flex items-center justify-center text-2xl ${color}`}>{icon}</div>
    <div>
      <p className="text-2xl font-extrabold text-gray-800">{value}</p>
      <p className="text-xs text-gray-400 mt-0.5">{label}</p>
    </div>
  </Card>
);

const AdminDashboard = ({ setView }) => {
  const [nurses, setNurses] = useState([]);
  const [visits, setVisits] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([getAdminNurses(), getAdminVisits()])
      .then(([n, v]) => { setNurses(n); setVisits(v); })
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <Spinner />;

  const scheduled = visits.filter((v) => v.status === "SCHEDULED").length;
  const completed = visits.filter((v) => v.status === "COMPLETED").length;
  const unassigned = visits.filter((v) => !v.nurse).length;

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-3xl font-extrabold text-gray-800">Admin <span className="text-[#9747ff]">Dashboard</span></h2>
        <p className="text-gray-400 text-sm mt-1">Overview of the entire FamilyPulse system</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard label="Total Nurses" value={nurses.length} icon="👩‍⚕️" color="bg-purple-100" />
        <StatCard label="Scheduled" value={scheduled} icon="📅" color="bg-blue-100" />
        <StatCard label="Completed" value={completed} icon="✅" color="bg-green-100" />
        <StatCard label="Unassigned" value={unassigned} icon="⚠️" color="bg-yellow-100" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="p-6">
          <div className="flex items-center justify-between mb-5">
            <h3 className="font-bold text-gray-700">Recent Visits</h3>
            <button onClick={() => setView("admin_visits")} className="text-xs text-[#9747ff] hover:underline font-medium">View all →</button>
          </div>
          <div className="space-y-3">
            {visits.slice(0, 5).map((v) => (
              <div key={v.id} className="flex items-center justify-between p-3 rounded-xl bg-gray-50 hover:bg-[#f5f0ff] transition-colors">
                <div>
                  <p className="text-sm font-semibold text-gray-700">{v.service?.replace(/_/g, " ")}</p>
                  <p className="text-xs text-gray-400">{new Date(v.scheduled_at).toLocaleDateString()}</p>
                </div>
                <Badge status={v.status} />
              </div>
            ))}
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center justify-between mb-5">
            <h3 className="font-bold text-gray-700">Nurses</h3>
            <button onClick={() => setView("admin_nurses")} className="text-xs text-[#9747ff] hover:underline font-medium">View all →</button>
          </div>
          <div className="space-y-3">
            {nurses.slice(0, 5).map((n) => (
              <div key={n.id} className="flex items-center gap-3 p-3 rounded-xl bg-gray-50 hover:bg-[#f5f0ff] transition-colors">
                <div className="w-9 h-9 rounded-full bg-linear-to-br from-[#9747ff] to-[#7d1ef9] flex items-center justify-center text-white text-sm font-bold">
                  {n.email?.[0]?.toUpperCase()}
                </div>
                <div>
                  <p className="text-sm font-semibold text-gray-700">{n.email}</p>
                  <span className={`text-xs font-medium ${n.is_active ? "text-green-500" : "text-red-400"}`}>
                    {n.is_active ? "● Active" : "● Inactive"}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
};

export default AdminDashboard;
