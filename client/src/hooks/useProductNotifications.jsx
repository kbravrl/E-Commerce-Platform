import { useEffect } from "react";
import { Client } from "@stomp/stompjs";
import SockJS from "sockjs-client";

function useProductNotifications() {
  useEffect(() => {
    const stompClient = new Client({
      webSocketFactory: () => new WebSocket("ws://localhost:9191/ws"),
      debug: (msg) => console.log(msg),
      onConnect: () => {
        console.log("🟢 STOMP connection established.");

        stompClient.subscribe("/topic/products", (msg) => {
          const data = JSON.parse(msg.body);
          console.log("🔔 WebSocket Notification:", data);
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
}

export default useProductNotifications;
