import React, { useEffect, useState } from "react";
import { getAdminNurses } from "../../api";
import { Card, Spinner, EmptyState } from "../../components/UI";

const AdminNurses = () => {
  const [nurses, setNurses] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getAdminNurses().then(setNurses).finally(() => setLoading(false));
  }, []);

  if (loading) return <Spinner />;

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-extrabold text-gray-800">Nurses</h2>
        <p className="text-gray-400 text-sm mt-1">{nurses.length} nurse{nurses.length !== 1 ? "s" : ""} registered</p>
      </div>

      {nurses.length === 0 ? (
        <Card className="p-6">
          <EmptyState message="No nurses registered yet." />
        </Card>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {nurses.map((n) => (
            <Card key={n.id} className="p-6">
              <div className="flex items-center gap-4 mb-3">
                <div className="w-12 h-12 rounded-2xl bg-linear-to-br from-[#9747ff] to-[#7d1ef9] flex items-center justify-center text-white text-lg font-bold shadow-lg shadow-[#9747ff]/20">
                  {n.email?.[0]?.toUpperCase()}
                </div>
                <div>
                  <p className="font-bold text-gray-800 text-sm">{n.email}</p>
                  <span className={`text-xs font-semibold ${n.is_active ? "text-green-500" : "text-red-400"}`}>
                    {n.is_active ? "● Active" : "● Inactive"}
                  </span>
                </div>
              </div>
              <p className="text-xs text-gray-400 font-mono truncate">{n.id}</p>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default AdminNurses;
