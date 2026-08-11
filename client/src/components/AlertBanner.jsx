function AlertBanner({ alerts }) {
  if (alerts.length === 0) return null;
  return (
    <div className="alert-card animate-slide">
      <div className="alert-header">🚨 Signal de vigilance requis</div>
      {alerts.map((a) => (
        <div key={a.id} style={{ fontSize: "0.9rem" }}>
          <strong>{a.message}</strong>
          <p style={{ color: "#475569", marginTop: "2px" }}>{a.action}</p>
        </div>
      ))}
    </div>
  );
}

export default AlertBanner;