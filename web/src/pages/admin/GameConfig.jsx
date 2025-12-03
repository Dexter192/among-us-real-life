import { Button } from "@mui/material";
import { useSocketConnection } from "../../hooks/useSocketConnection";

export default function GameConfig({ setIsStarted }) {
  const { socket } = useSocketConnection();
  // useEffect(() => {
  //   const socket = io("http://localhost:4046", {
  //     transports: ["websocket"],
  //     auth: {
  //       role: "ADMIN",
  //       token: "test123",
  //     },
  //   });

  //   socket.on("start_game", () => {
  //     console.log("Starting game:", socket.id);
  //   });

  //   return () => {
  //     socket.disconnect();
  //   };
  // }, []);

  const startGame = () => {
    console.log("Starting game...");
    // setIsStarted(true);
    socket.emit("message", { data: "test" });
  };

  return (
    <>
      <h1>Configure Game settings</h1>
      <Button
        variant="contained"
        color="primary"
        id="start-game"
        onClick={() => startGame()}
      >
        Start Games
      </Button>
    </>
  );
}
