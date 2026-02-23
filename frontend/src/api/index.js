const BASE_URL = "http://127.0.0.1:8000/api";

const getHeaders = () => {
  const token = localStorage.getItem("access_token");
  return {
    "Content-Type": "application/json",
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
  };
};

const handle = async (res) => {
  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err.detail || JSON.stringify(err) || "Request failed");
  }
  if (res.status === 204) return null;
  return res.json();
};

// Auth
export const login = (email, password) =>
  fetch(`${BASE_URL}/users/login/`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  }).then(handle);

export const register = (data) =>
  fetch(`${BASE_URL}/users/register/`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  }).then(handle);

export const getMe = (token) =>
  fetch(`${BASE_URL}/users/me/`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token || localStorage.getItem("access_token")}`,
    },
  }).then(handle);

export const refreshToken = (refresh) =>
  fetch(`${BASE_URL}/users/token/refresh/`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ refresh }),
  }).then(handle);

// Dependents
export const getDependents = () =>
  fetch(`${BASE_URL}/dependents/`, { headers: getHeaders() }).then(handle);

export const createDependent = (data) =>
  fetch(`${BASE_URL}/dependents/`, {
    method: "POST",
    headers: getHeaders(),
    body: JSON.stringify(data),
  }).then(handle);

export const getDependent = (id) =>
  fetch(`${BASE_URL}/dependents/${id}/`, { headers: getHeaders() }).then(handle);

export const deleteDependent = (id) =>
  fetch(`${BASE_URL}/dependents/${id}/`, {
    method: "DELETE",
    headers: getHeaders(),
  }).then(handle);

// Visits (User)
export const getVisits = () =>
  fetch(`${BASE_URL}/visits/`, { headers: getHeaders() }).then(handle);

export const createVisit = (data) =>
  fetch(`${BASE_URL}/visits/`, {
    method: "POST",
    headers: getHeaders(),
    body: JSON.stringify(data),
  }).then(handle);

// Nurse
export const getNurseVisits = () =>
  fetch(`${BASE_URL}/nurse/visits/`, { headers: getHeaders() }).then(handle);

export const startVisit = (id) =>
  fetch(`${BASE_URL}/nurse/visits/${id}/start/`, {
    method: "PUT",
    headers: getHeaders(),
  }).then(handle);

export const completeVisit = (id) =>
  fetch(`${BASE_URL}/nurse/visits/${id}/complete/`, {
    method: "PUT",
    headers: getHeaders(),
  }).then(handle);

// Admin
export const getAdminNurses = () =>
  fetch(`${BASE_URL}/admin/nurses/`, { headers: getHeaders() }).then(handle);

export const getAdminVisits = () =>
  fetch(`${BASE_URL}/admin/visits/`, { headers: getHeaders() }).then(handle);

export const assignNurse = (visitId, nurseId) =>
  fetch(`${BASE_URL}/admin/visits/${visitId}/assign/`, {
    method: "PUT",
    headers: getHeaders(),
    body: JSON.stringify({ nurse_id: nurseId }),
  }).then(handle);

// Payments
export const createPayment = (data) =>
  fetch(`http://127.0.0.1:8000/payments/create/`, {
    method: "POST",
    headers: getHeaders(),
    body: JSON.stringify(data),
  }).then(handle);