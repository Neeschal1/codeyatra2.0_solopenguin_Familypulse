import React, { useEffect, useState } from "react";
import { getVisits, getDependents } from "../../api";
import { Card, Badge, Spinner, EmptyState } from "../../components/UI";
import { useAuth } from "../../context/AuthContext";

const StatCard = ({ label, value, icon, color }) => (
  <Card className="p-6 flex items-center gap-4">
    <div className={`w-12 h-12 rounded-2xl flex items-center justify-center text-2xl ${color}`}>{icon}</div>
    <div>
      <p className="text-2xl font-extrabold text-gray-800">{value}</p>
      <p className="text-xs text-gray-400 mt-0.5">{label}</p>
    </div>
  </Card>
);

const UserDashboard = ({ setView }) => {
  const { user } = useAuth();
  const [visits, setVisits] = useState([]);
  const [dependents, setDependents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([getVisits(), getDependents()])
      .then(([v, d]) => { setVisits(v); setDependents(d); })
      .finally(() => setLoading(false));
  }, []);

  const scheduled = visits.filter((v) => v.status === "SCHEDULED").length;
  const completed = visits.filter((v) => v.status === "COMPLETED").length;

  if (loading) return <Spinner />;

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-3xl font-extrabold text-gray-800">
          Hello, <span className="text-[#9747ff]">{user?.email?.split("@")[0]}</span> 👋
        </h2>
        <p className="text-gray-400 mt-1 text-sm">Here's what's happening with your family today.</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <StatCard label="Dependents" value={dependents.length} icon="👨‍👩‍👧" color="bg-purple-100" />
        <StatCard label="Scheduled Visits" value={scheduled} icon="📅" color="bg-blue-100" />
        <StatCard label="Completed Visits" value={completed} icon="✅" color="bg-green-100" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Visits */}
        <Card className="p-6">
          <div className="flex items-center justify-between mb-5">
            <h3 className="font-bold text-gray-700">Recent Visits</h3>
            <button onClick={() => setView("visits")} className="text-xs text-[#9747ff] hover:underline font-medium">View all →</button>
          </div>
          {visits.length === 0 ? (
            <EmptyState message="No visits yet" />
          ) : (
            <div className="space-y-3">
              {visits.slice(0, 4).map((v) => (
                <div key={v.id} className="flex items-center justify-between p-3 rounded-xl bg-gray-50 hover:bg-[#f5f0ff] transition-colors">
                  <div>
                    <p className="text-sm font-semibold text-gray-700">{v.service?.replace("_", " ")}</p>
                    <p className="text-xs text-gray-400">{new Date(v.scheduled_at).toLocaleDateString()}</p>
                  </div>
                  <Badge status={v.status} />
                </div>
              ))}
            </div>
          )}
        </Card>

        {/* Dependents */}
        <Card className="p-6">
          <div className="flex items-center justify-between mb-5">
            <h3 className="font-bold text-gray-700">Dependents</h3>
            <button onClick={() => setView("dependents")} className="text-xs text-[#9747ff] hover:underline font-medium">Manage →</button>
          </div>
          {dependents.length === 0 ? (
            <EmptyState message="No dependents added" />
          ) : (
            <div className="space-y-3">
              {dependents.map((d) => (
                <div key={d.id} className="flex items-center gap-3 p-3 rounded-xl bg-gray-50 hover:bg-[#f5f0ff] transition-colors">
                  <div className="w-9 h-9 rounded-full bg-linear-to-br from-[#9747ff] to-[#7d1ef9] flex items-center justify-center text-white text-sm font-bold">
                    {d.first_name?.[0]}
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-gray-700">{d.first_name} {d.last_name}</p>
                    <p className="text-xs text-gray-400">{d.email}</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </Card>
      </div>
    </div>
  );
};

export default UserDashboard;
