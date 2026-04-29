export default function PatientSidebar({ patients, activePatient, onSelect }) {
  return (
    <aside className="sidebar">
      <div className="sidebar-header">
        <span className="sidebar-title">Patients</span>
      </div>

      <div className="sidebar-search">
        <div className="sidebar-search-wrap">
          <svg className="sidebar-search-icon" width="14" height="14" viewBox="0 0 20 20" fill="#6B7574">
            <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
          </svg>
          <input className="sidebar-search-input" type="text" placeholder="Search patients…" readOnly />
        </div>
      </div>

      <div className="patient-list">
        {patients.map((p) => (
          <div
            key={p.name}
            className={`patient-item ${p.name === activePatient?.name ? "active" : ""}`}
            onClick={() => onSelect(p)}
          >
            <img
              className="patient-avatar"
              src={p.profile_picture || `https://i.pravatar.cc/40?u=${encodeURIComponent(p.name)}`}
              onError={e => { e.target.src = `https://i.pravatar.cc/40?u=${encodeURIComponent(p.name)}`; }}
              alt={p.name}
            />
            <div className="patient-info">
              <div className="patient-name">{p.name}</div>
              <div className="patient-meta">{p.gender}, {p.age} yrs</div>
            </div>
            <svg className="patient-more" width="14" height="14" viewBox="0 0 20 20" fill="currentColor">
              <path d="M10 6a2 2 0 110-4 2 2 0 010 4zM10 12a2 2 0 110-4 2 2 0 010 4zM10 18a2 2 0 110-4 2 2 0 010 4z" />
            </svg>
          </div>
        ))}
      </div>
    </aside>
  );
}