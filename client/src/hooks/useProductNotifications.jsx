import { useEffect } from "react";
import { Client } from "@stomp/stompjs";

function useProductNotifications() {
  useEffect(() => {
    const stompClient = new Client({
      webSocketFactory: () => {
        // We directly pass the WebSocket object to STOMP
        return new WebSocket("ws://localhost:9191/ws");
      },
      onConnect: () => {
        console.log("🟢 STOMP connection established.");
        stompClient.subscribe("/topic/products", (msg) => {
          const data = JSON.parse(msg.body);
          console.log("🔔 WebSocket Notification:", data);
        });
      },
      onWebSocketError: (error) => {
        console.error("❌ WebSocket connection error:", error);
      },
      onStompError: (frame) => {
        console.error("🔴 STOMP protocol error:", frame);
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
