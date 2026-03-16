function uid(prefix) {
  return `${prefix}_${Math.random().toString(16).slice(2)}_${Date.now()}`;
}

function formatTime(ms) {
  const d = new Date(ms);
  return d.toLocaleString(undefined, { dateStyle: "medium", timeStyle: "short" });
}

function initials(name) {
  const parts = (name || "").trim().split(/\s+/).slice(0,2);
  return parts.map(p => p[0]?.toUpperCase() || "").join("") || "U";
}

