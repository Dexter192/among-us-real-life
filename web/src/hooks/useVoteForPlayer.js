import { useSocketConnection } from "./useSocketConnection";
import { useAuthId } from "./useAuthId";

export function useVoteForPlayer() {
  const { socket } = useSocketConnection();
  const { authId } = useAuthId();

  const voteForPlayer = (votedPlayerId) => {
    if (!socket) return;
    socket.emit("vote_for_player", { votedId: votedPlayerId, voterId: authId });
  };

  return { voteForPlayer };
}
