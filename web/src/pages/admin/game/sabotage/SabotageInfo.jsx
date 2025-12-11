import { useDiffuseSabotage } from "../../../../hooks/useDiffuseSabotage";
import { useGetActiveSabotage } from "../../../../hooks/useGetActiveSabotage";

export default function SabotageInfo({ gameState }) {
  const { sabotage } = useGetActiveSabotage(gameState.sabotage_triggered);
  const diffuseSabotage = useDiffuseSabotage();

  if (!gameState.sabotage_triggered || !sabotage) {
    return <div className="sabotage-info">No active sabotage.</div>;
  }

  const handleDiffuse = () => {
    diffuseSabotage.diffuseSabotage(sabotage.id);
  };
  return (
    <div className="sabotage-info">
      <h2>Active Sabotage: {sabotage.name}</h2>
      <button onClick={handleDiffuse}>Diffuse Sabotage</button>
    </div>
  );
}
