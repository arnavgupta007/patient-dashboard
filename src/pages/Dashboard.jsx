import BloodPressureChart from "../components/BloodPressureChart";

function BPLegend({ history }) {
  if (!history || !history.length) return null;

  const latest = history[history.length - 1];
  const sys = latest?.blood_pressure?.systolic?.value ?? "—";
  const dia = latest?.blood_pressure?.diastolic?.value ?? "—";
  const sysLevel = latest?.blood_pressure?.systolic?.levels ?? "";
  const diaLevel = latest?.blood_pressure?.diastolic?.levels ?? "";

  function Arrow({ level }) {
    if (!level) return null;
    const l = level.toLowerCase();
    if (l.includes("higher") || l.includes("high")) return <span>↑ Higher than Average</span>;
    if (l.includes("lower") || l.includes("low")) return <span>↓ Lower than Average</span>;
    return <span>→ Normal</span>;
  }

  return (
    <div className="bp-legend">
      <div className="bp-legend-item">
        <div className="bp-legend-dot sys">Systolic</div>
        <div className="bp-legend-value" style={{ color: "#C97F7F" }}>{sys}</div>
        <div className="bp-legend-label"><Arrow level={sysLevel} /></div>
      </div>
      <div className="bp-legend-divider" />
      <div className="bp-legend-item">
        <div className="bp-legend-dot dia">Diastolic</div>
        <div className="bp-legend-value" style={{ color: "#7B9CBB" }}>{dia}</div>
        <div className="bp-legend-label"><Arrow level={diaLevel} /></div>
      </div>
    </div>
  );
}

function DiagnosisHistory({ history }) {
  if (!history || !history.length) {
    return <p style={{ color: "var(--text-muted)", fontSize: 13 }}>No diagnosis history available.</p>;
  }

  const rows = history.flatMap(h =>
    (h.conditions || []).map(c => ({
      name: c.name,
      description: c.description,
      status: c.status,
      period: `${h.month ?? ""}, ${h.year ?? ""}`,
    }))
  );

  if (rows.length === 0) {
    return <p style={{ color: "var(--text-muted)", fontSize: 13 }}>No conditions recorded.</p>;
  }

  function StatusBadge({ status }) {
    if (!status) return null;
    const s = status.toLowerCase();
    let cls = "badge-warning";
    if (s.includes("normal") || s.includes("healthy")) cls = "badge-normal";
    else if (s.includes("critical") || s.includes("severe")) cls = "badge-critical";
    return <span className={`badge ${cls}`}>{status}</span>;
  }

  return (
    <table className="diagnosis-table">
      <thead>
        <tr>
          <th>Condition</th>
          <th>Period</th>
          <th>Status</th>
        </tr>
      </thead>
      <tbody>
        {rows.map((r, i) => (
          <tr key={i}>
            <td>
              <div className="diagnosis-name">{r.name || "—"}</div>
              {r.description && <div className="diagnosis-desc">{r.description}</div>}
            </td>
            <td>{r.period}</td>
            <td><StatusBadge status={r.status} /></td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default function Dashboard({ patient }) {
  if (!patient) return null;

  const history = patient.diagnosis_history || [];
  const chartHistory = [...history].slice(0, 6).reverse();

  return (
    <main className="main-content">

      <div className="card bp-card fade-up">
        <div className="bp-header">
          <h2 className="card-title" style={{ marginBottom: 0 }}>Blood Pressure</h2>
          <div className="bp-range-select">
            Last 6 months
            <svg width="12" height="12" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
          </div>
        </div>

        <div className="bp-chart-wrap" style={{ marginTop: 16 }}>
          <div className="bp-canvas-wrap">
            <BloodPressureChart history={chartHistory} />
          </div>
          <BPLegend history={chartHistory} />
        </div>
      </div>

      <div className="card fade-up" style={{ animationDelay: ".1s" }}>
        <h2 className="card-title">Diagnostic History</h2>
        <DiagnosisHistory history={history} />
      </div>

    </main>
  );
}