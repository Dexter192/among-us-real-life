import { useEffect, useState } from "react";
import { useSocketConnection } from "../../hooks/useSocketConnection";

export default function AdminPage() {
  const { socket } = useSocketConnection();
  const [isStarted, setIsStarted] = useState(false);

  useEffect(() => {}, [socket]); // Empty array: run only once

  return <h1>Client Running</h1>;
}
