import { useSession, signOut } from "next-auth/react";
import { useRouter } from "next/router";

const TABS = [
  { label: "Home", path: "/" },
  { label: "Methods", path: "/methods" },
  { label: "Stack", path: "/stack" },
  { label: "Bills", path: "/bills" },
  { label: "Timeline", path: "/timeline" },
];

export default function Nav() {
  const { data: session } = useSession();
  const router = useRouter();

  return (
    <nav style={styles.nav}>
      <div style={styles.logo}>
        <span style={{ color: "#D4A843" }}>FIFTYK</span>
        <span style={{ color: "#E8E8E8" }}>UP</span>
      </div>
      <div style={styles.tabs}>
        {TABS.map((t) => (
          <button
            key={t.path}
            style={{ ...styles.tab, ...(router.pathname === t.path ? styles.tabActive : {}) }}
            onClick={() => router.push(t.path)}
          >
            {t.label}
          </button>
        ))}
      </div>
      <div style={styles.right}>
        {session ? (
          <>
            <span style={styles.user}>{session.user.email}</span>
            <button style={styles.logoutBtn} onClick={() => signOut({ callbackUrl: "/auth" })}>
              Log Out
            </button>
          </>
        ) : (
          <button style={styles.logoutBtn} onClick={() => router.push("/auth")}>Log In</button>
        )}
      </div>
    </nav>
  );
}

const styles = {
  nav: {
    position: "sticky", top: 0, zIndex: 100,
    background: "rgba(10,10,10,0.95)",
    backdropFilter: "blur(12px)",
    borderBottom: "1px solid #222",
    display: "flex", alignItems: "center", gap: "16px",
    padding: "0 24px", height: "56px",
  },
  logo: { fontWeight: 900, fontSize: "1.1rem", letterSpacing: "-0.5px", whiteSpace: "nowrap" },
  tabs: { display: "flex", gap: "2px", flex: 1, overflowX: "auto" },
  tab: {
    background: "transparent", border: "none", color: "#555",
    padding: "6px 14px", borderRadius: "8px",
    fontSize: "0.85rem", fontWeight: 500, whiteSpace: "nowrap", transition: "all 0.15s",
  },
  tabActive: { background: "rgba(212,168,67,0.1)", color: "#D4A843", fontWeight: 700 },
  right: { display: "flex", alignItems: "center", gap: "12px", marginLeft: "auto" },
  user: { fontSize: "0.78rem", color: "#555", whiteSpace: "nowrap" },
  logoutBtn: {
    background: "#161616", border: "1px solid #222", color: "#E8E8E8",
    borderRadius: "8px", padding: "6px 14px", fontSize: "0.8rem", fontWeight: 600,
  },
};
