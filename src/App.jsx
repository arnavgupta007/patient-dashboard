import { useState, useEffect } from "react";
import { fetchPatients, findJessicaTaylor } from "./services/api";
import PatientSidebar from "./components/PatientSidebar";
import PatientProfile from "./components/PatientProfile";
import Dashboard from "./pages/Dashboard";
import "./styles/globals.css";

export default function App() {
  const [patients, setPatients] = useState([]);
  const [activePatient, setActivePatient] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchPatients()
      .then((data) => {
        setPatients(data);
        const jessica = findJessicaTaylor(data);
        if (jessica) setActivePatient(jessica);
      })
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <LoadingSkeleton />;
  if (error) return <ErrorState message={error} />;

  return (
    <>
      <nav>
        <div className="nav-logo">
          <div className="nav-logo-icon">
            <svg viewBox="0 0 20 20">
              <path d="M10 2a8 8 0 100 16A8 8 0 0010 2zm.75 4a.75.75 0 00-1.5 0v3.25H6a.75.75 0 000 1.5h3.25V14a.75.75 0 001.5 0v-3.25H14a.75.75 0 000-1.5h-3.25V6z" />
            </svg>
          </div>
          HealthOS
        </div>

        <div className="nav-links">
          <button className="nav-link">Overview</button>
          <button className="nav-link active">Patients</button>
          <button className="nav-link">Schedule</button>
          <button className="nav-link">Messages</button>
          <button className="nav-link">Settings</button>
        </div>

        <div className="nav-right">
          <div className="nav-avatar">
            <div className="nav-avatar-img">
              <img src="https://i.pravatar.cc/36?img=12" alt="Dr. Sarah Chen" />
            </div>
            <div>
              <div className="nav-avatar-name">Dr. Sarah Chen</div>
              <div className="nav-avatar-role">General Practitioner</div>
            </div>
          </div>
        </div>
      </nav>

      <div className="app-layout">
        <PatientSidebar
          patients={patients}
          activePatient={activePatient}
          onSelect={setActivePatient}
        />
        <Dashboard patient={activePatient} />
        <PatientProfile patient={activePatient} />
      </div>
    </>
  );
}

function LoadingSkeleton() {
  return (
    <>
      <div style={{ height: 64, background: "#fff", borderBottom: "1px solid #DDD8CF" }} />
      <div className="app-layout">
        <aside className="sidebar">
          <div style={{ padding: 20 }}>
            {[...Array(6)].map((_, i) => (
              <div key={i} className="skeleton" style={{ height: 56, marginBottom: 8, borderRadius: 8 }} />
            ))}
          </div>
        </aside>
        <main className="main-content">
          <div className="skeleton" style={{ height: 280, borderRadius: 12 }} />
          <div className="skeleton" style={{ height: 200, borderRadius: 12 }} />
        </main>
        <aside className="right-panel">
          <div style={{ padding: 30, textAlign: "center" }}>
            <div className="skeleton" style={{ width: 90, height: 90, borderRadius: "50%", margin: "0 auto 16px" }} />
            <div className="skeleton" style={{ height: 20, width: "60%", margin: "0 auto 8px" }} />
            <div className="skeleton" style={{ height: 14, width: "80%", margin: "0 auto" }} />
          </div>
        </aside>
      </div>
    </>
  );
}

function ErrorState({ message }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", height: "100vh", gap: 12, textAlign: "center" }}>
      <span style={{ fontSize: 42 }}>⚕️</span>
      <h3 style={{ fontFamily: "'Libre Baskerville', serif" }}>Unable to load patient data</h3>
      <p style={{ color: "var(--text-muted)", fontSize: 13 }}>{message}</p>
    </div>
  );
}