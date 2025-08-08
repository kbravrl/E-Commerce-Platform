import { useEffect, useState } from "react";
import { Client } from "@stomp/stompjs";

export default function useLowStockAlerts () {
  const [toasts, setToasts] = useState([]);

  useEffect(() => {
    const stompClient = new Client({
      webSocketFactory: () => new WebSocket(import.meta.env.VITE_WS_URL),
      reconnectDelay: 3000,
      debug: (msg) => console.log(msg),
      onConnect: () => {
        console.log("🟢 STOMP connection established.");

        stompClient.subscribe("/topic/stock-alerts", (msg) => {
          try {
            const data = JSON.parse(msg.body);
            console.log("🔔 WebSocket Notification:", data);

            const id = Date.now() + Math.random().toString(36).slice(2);
            setToasts((prev) => [{ id, alert: data }, ...prev].slice(0, 5));

            setTimeout(() => {
              setToasts((prev) => prev.filter((t) => t.id !== id));
            }, 5000);
          } catch (e) {
            console.error("Parse failed:", e, msg.body);
          }
        });
      },
      onWebSocketError: (err) => {
        console.error("❌ WebSocket error:", err);
      },
      onStompError: (frame) => {
        console.error("🔴 STOMP error:", frame);
      },
    });

    stompClient.activate();
    return () => {
      stompClient.deactivate();
      console.log("🔌 STOMP connection closed.");
    };
  }, []);

  const dismiss = (id) => setToasts((prev) => prev.filter((t) => t.id !== id));
  return { toasts, dismiss };
}
