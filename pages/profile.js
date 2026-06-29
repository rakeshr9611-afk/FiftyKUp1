import { useSession, signOut } from "next-auth/react";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Nav from "../components/Nav";

export default function ProfilePage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [confirmDelete, setConfirmDelete] = useState(false);
  const [confirmUnsub, setConfirmUnsub] = useState(false);
  const [msg, setMsg] = useState("");

  useEffect(() => {
    if (status === "unauthenticated") router.push("/auth");
  }, [status]);

  if (status === "loading" || !session) return null;

  const isSubscribed = typeof window !== "undefined" && localStorage.getItem("fiftykup_subscribed") === "true";

  function handleUnsubscribe() {
    localStorage.removeItem("fiftykup_subscribed");
    setMsg("Subscription cancelled. You will retain access until the end of your billing period. Email fiftykup@yahoo.com to confirm cancellation with Stripe.");
    setConfirmUnsub(false);
  }

  function handleDeleteAccount() {
    localStorage.clear();
    setMsg("Your local data has been cleared. To fully delete your account and stop billing, email fiftykup@yahoo.com with subject 'Delete Account'. We will process it within 30 days.");
    setConfirmDelete(false);
    setTimeout(() => signOut({ callbackUrl: "/auth" }), 3000);
  }

  const S = {
    wrap: { background: "#0A0A0A", minHeight: "100vh" },
    inner: { maxWidth: "640px", margin: "0 auto", padding: "48px 24px 100px" },
    h1: { fontSize: "1.8rem", fontWeight: 900, color: "white", marginBottom: "4px" },
    sub: { color: "#555", fontSize: "0.9rem", marginBottom: "40px" },
    card: { background: "#111", border: "1px solid #1E1E1E", borderRadius: "14px", padding: "24px", marginBottom: "16px" },
    label: { color: "#555", fontSize: "0.72rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: "6px" },
    value: { color: "#E8E8E8", fontSize: "0.95rem", fontWeight: 600 },
    row: { display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "12px" },
    sectionTitle: { color: "#D4A843", fontSize: "0.72rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: "16px" },
    btn: { border: "none", borderRadius: "10px", padding: "10px 20px", fontWeight: 700, fontSize: "0.875rem", cursor: "pointer" },
    goldBtn: { background: "linear-gradient(135deg,#D4A843,#F0C75A)", color: "#0A0A0A" },
    redBtn: { background: "rgba(255,95,87,0.12)", color: "#FF5F57", border: "1px solid rgba(255,95,87,0.3)" },
    grayBtn: { background: "#1A1A1A", color: "#888", border: "1px solid #333" },
    confirmBox: { background: "rgba(255,95,87,0.06)", border: "1px solid rgba(255,95,87,0.2)", borderRadius: "10px", padding: "16px", marginTop: "12px" },
    confirmText: { color: "rgba(255,255,255,0.7)", fontSize: "0.85rem", lineHeight: "1.6", marginBottom: "12px" },
    msgBox: { background: "rgba(212,168,67,0.08)", border: "1px solid rgba(212,168,67,0.25)", borderRadius: "10px", padding: "14px 18px", marginBottom: "20px" },
    msgText: { color: "#D4A843", fontSize: "0.875rem", lineHeight: "1.6", margin: 0 },
  };

  return (
    <div style={S.wrap}>
      <Nav />
      <div style={S.inner}>
        <h1 style={S.h1}>My Account</h1>
        <p style={S.sub}>Manage your profile, subscription, and data.</p>

        {msg && <div style={S.msgBox}><p style={S.msgText}>{msg}</p></div>}

        {/* Account Info */}
        <p style={S.sectionTitle}>Account Info</p>
        <div style={S.card}>
          <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
            <div>
              <p style={S.label}>Email</p>
              <p style={S.value}>{session.user?.email || "—"}</p>
            </div>
            <div>
              <p style={S.label}>Name</p>
              <p style={S.value}>{session.user?.name || "—"}</p>
            </div>
            <div>
              <p style={S.label}>Subscription Status</p>
              <p style={{ ...S.value, color: isSubscribed ? "#4CAF7D" : "#FF5F57" }}>
                {isSubscribed ? "✓ Active" : "✗ Inactive"}
              </p>
            </div>
          </div>
        </div>

        {/* Subscription */}
        <p style={{ ...S.sectionTitle, marginTop: "28px" }}>Subscription</p>
        <div style={S.card}>
          <div style={S.row}>
            <div>
              <p style={S.label}>Current Plan</p>
              <p style={S.value}>{isSubscribed ? "FiftyKUp Pro" : "No active plan"}</p>
            </div>
            {isSubscribed && !confirmUnsub && (
              <button style={{ ...S.btn, ...S.redBtn }} onClick={() => setConfirmUnsub(true)}>Cancel Subscription</button>
            )}
          </div>
          {confirmUnsub && (
            <div style={S.confirmBox}>
              <p style={S.confirmText}>Are you sure you want to cancel? You will keep access until the end of your current billing period. To stop Stripe charges, also email fiftykup@yahoo.com with subject "Cancel Subscription."</p>
              <div style={{ display: "flex", gap: "10px" }}>
                <button style={{ ...S.btn, ...S.redBtn }} onClick={handleUnsubscribe}>Yes, Cancel</button>
                <button style={{ ...S.btn, ...S.grayBtn }} onClick={() => setConfirmUnsub(false)}>Keep Subscription</button>
              </div>
            </div>
          )}
          {!isSubscribed && (
            <div style={{ marginTop: "12px" }}>
              <button style={{ ...S.btn, ...S.goldBtn }} onClick={() => router.push("/subscribe")}>Reactivate →</button>
            </div>
          )}
        </div>

        {/* Data */}
        <p style={{ ...S.sectionTitle, marginTop: "28px" }}>Your Data</p>
        <div style={S.card}>
          <p style={{ color: "rgba(255,255,255,0.6)", fontSize: "0.875rem", lineHeight: "1.7", marginBottom: "16px" }}>
            Your financial data (income, bills, portfolio) is stored locally in your browser. You can clear it at any time. For a full data export or deletion request under CCPA/GDPR, email fiftykup@yahoo.com.
          </p>
          <button style={{ ...S.btn, ...S.grayBtn }} onClick={() => {
            const keys = ["fku_v4", "fku_bills", "fku_stack"];
            keys.forEach(k => localStorage.removeItem(k));
            setMsg("Your financial tracking data has been cleared from this device.");
          }}>Clear My Financial Data</button>
        </div>

        {/* Sign Out */}
        <p style={{ ...S.sectionTitle, marginTop: "28px" }}>Session</p>
        <div style={S.card}>
          <div style={S.row}>
            <p style={{ color: "rgba(255,255,255,0.6)", fontSize: "0.875rem", margin: 0 }}>Signed in as {session.user?.email}</p>
            <button style={{ ...S.btn, ...S.grayBtn }} onClick={() => signOut({ callbackUrl: "/auth" })}>Sign Out</button>
          </div>
        </div>

        {/* Delete Account */}
        <p style={{ ...S.sectionTitle, marginTop: "28px", color: "#FF5F57" }}>Danger Zone</p>
        <div style={{ ...S.card, border: "1px solid rgba(255,95,87,0.2)" }}>
          <div style={S.row}>
            <div>
              <p style={{ color: "white", fontWeight: 700, fontSize: "0.95rem", marginBottom: "4px" }}>Delete Account</p>
              <p style={{ color: "#555", fontSize: "0.82rem", margin: 0 }}>Permanently delete your account and all associated data.</p>
            </div>
            {!confirmDelete && (
              <button style={{ ...S.btn, ...S.redBtn }} onClick={() => setConfirmDelete(true)}>Delete Account</button>
            )}
          </div>
          {confirmDelete && (
            <div style={S.confirmBox}>
              <p style={S.confirmText}>This will clear all your local data and sign you out immediately. To fully delete your account and cancel billing, we will also need to process your request manually — we will email fiftykup@yahoo.com on your behalf. This cannot be undone.</p>
              <div style={{ display: "flex", gap: "10px" }}>
                <button style={{ ...S.btn, ...S.redBtn }} onClick={handleDeleteAccount}>Yes, Delete Everything</button>
                <button style={{ ...S.btn, ...S.grayBtn }} onClick={() => setConfirmDelete(false)}>Cancel</button>
              </div>
            </div>
          )}
        </div>

        {/* Legal Links */}
        <div style={{ marginTop: "40px", display: "flex", gap: "20px", flexWrap: "wrap" }}>
          {[["Privacy Policy", "/privacy"], ["Terms of Service", "/terms"], ["Data & Compliance", "/compliance"]].map(([label, href]) => (
            <a key={href} href={href} style={{ color: "#555", fontSize: "0.8rem", textDecoration: "none" }}>{label}</a>
          ))}
        </div>
      </div>
    </div>
  );
}
