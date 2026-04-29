function DetailItem({ icon, label, value }) {
  return (
    <li className="profile-detail-item">
      <div className="profile-detail-icon">{icon}</div>
      <div>
        <div className="profile-detail-label">{label}</div>
        <div className="profile-detail-value">{value || "—"}</div>
      </div>
    </li>
  );
}

function VitalCard({ emoji, type, label, value, unit, status }) {
  const statusMap = { normal: "Normal", high: "Above Normal", low: "Below Normal" };
  return (
    <div className="vital-card">
      <div className={`vital-icon ${type}`}>{emoji}</div>
      <div>
        <div className="vital-label">{label}</div>
        <div className="vital-value">
          {value ?? "—"} <span className="vital-unit">{unit}</span>
        </div>
      </div>
      {status && (
        <div className={`vital-status ${status}`}>{statusMap[status]}</div>
      )}
    </div>
  );
}

export default function PatientProfile({ patient }) {
  if (!patient) return null;

  const hrStatus = patient.heart_rate > 100 ? "high" : patient.heart_rate < 60 ? "low" : "normal";
  const bmiStatus = patient.bmi > 24.9 ? "high" : patient.bmi < 18.5 ? "low" : "normal";

  return (
    <aside className="right-panel fade-up">

      <div className="profile-card">
        <img
          className="profile-photo"
          src={patient.profile_picture || `https://i.pravatar.cc/100?u=${encodeURIComponent(patient.name)}`}
          onError={e => { e.target.src = `https://i.pravatar.cc/100?u=${encodeURIComponent(patient.name)}`; }}
          alt={patient.name}
        />
        <div className="profile-name">{patient.name}</div>

        <ul className="profile-detail-list">
          <DetailItem
            icon={<CalendarIcon />}
            label="Date of Birth"
            value={patient.date_of_birth}
          />
          <DetailItem
            icon={<GenderIcon />}
            label="Gender"
            value={patient.gender}
          />
          <DetailItem
            icon={<PhoneIcon />}
            label="Contact"
            value={patient.phone_number}
          />
          <DetailItem
            icon={<ShieldIcon />}
            label="Insurance"
            value={patient.insurance_type}
          />
          <DetailItem
            icon={<PhoneIcon />}
            label="Emergency Contact"
            value={patient.emergency_contact}
          />
        </ul>

        <button className="btn-show-all">Show All Information</button>
      </div>

      <div className="vitals-section">
        <div className="vitals-section-title">Vital Signs</div>
        <div className="vital-cards">
          <VitalCard emoji="🌡" type="temp" label="Temperature" value={patient.temperature} unit="°F" />
          <VitalCard emoji="❤️" type="heart" label="Heart Rate" value={patient.heart_rate} unit="bpm" status={hrStatus} />
          <VitalCard emoji="🫁" type="resp" label="Respiratory Rate" value={patient.respiratory_rate} unit="bpm" />
          <VitalCard emoji="⚖️" type="bmi" label="BMI" value={patient.bmi} unit="" status={bmiStatus} />
        </div>
      </div>

      <div className="lab-section">
        <div className="lab-section-title">Lab Results</div>
        <div className="lab-list">
          {(patient.lab_results || []).length === 0 ? (
            <div style={{ color: "var(--text-muted)", fontSize: 13, padding: "10px 0" }}>
              No lab results on file.
            </div>
          ) : (
            (patient.lab_results || []).map((lab, i) => (
              <div className="lab-item" key={i}>
                <span className="lab-name">{lab}</span>
                <span className="lab-arrow">
                  <svg width="14" height="14" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                </span>
              </div>
            ))
          )}
        </div>
      </div>

    </aside>
  );
}

function CalendarIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 20 20" fill="var(--sage)">
      <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
    </svg>
  );
}
function GenderIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 20 20" fill="var(--sage)">
      <path d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" />
    </svg>
  );
}
function PhoneIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 20 20" fill="var(--sage)">
      <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
    </svg>
  );
}
function ShieldIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 20 20" fill="var(--sage)">
      <path fillRule="evenodd" d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
    </svg>
  );
}