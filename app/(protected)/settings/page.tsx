import Settings from "../../../components/Settings";

// Plain Server Component: this page renders no user-specific data, so unlike
// /home, /devices, /books and /textbooks it doesn't call getSessionUser().
// It still lives under the (protected) route group for consistency with
// those pages and to inherit proxy.ts's cookie gate.

export default function Page() {
  return <Settings />;
}
