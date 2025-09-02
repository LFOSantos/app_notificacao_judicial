import { Routes, Route, Link } from "react-router-dom";
import { NotificationList } from "./notificationList/NotificationList";
import { CreateNotification } from "./createNotification/CreateNotification";
import { NotificationDetails } from "./notificationDetails/NotificationDetails";
export default function App() {
  return (
    <div
      style={{
        maxWidth: 900,
        margin: "24px auto",
        padding: "0 16px",
        fontFamily: "system-ui, sans-serif",
        color: "white",
      }}
    >
      <header
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          marginBottom: 16,
        }}
      >
        <h2 style={{ margin: 0, textAlign: "center" }}>Escritório</h2>
        <nav style={{ display: "flex", gap: 12, marginTop: 12 }}>
          <Link to="/create" className="button-link">
            Nova Notificação
          </Link>
        </nav>
      </header>

      <Routes>
        <Route path="/" element={<NotificationList />} />
        <Route path="/create" element={<CreateNotification />} />
        <Route path="/notification/:id" element={<NotificationDetails />} />
      </Routes>
    </div>
  );
}
