import { useGetActiveSabotage } from "../../../../hooks/useGetActiveSabotage";

export default function SabotageBanner({ gameState }) {
  const { sabotage } = useGetActiveSabotage(gameState.sabotage_triggered);

  if (!gameState.sabotage_triggered || !sabotage) {
    return null;
  }

  console.log("Sabotage in SabotageBanner:", sabotage);
  return (
    <div className="sabotage-banner">
      <h2>Sabotage Active: {sabotage?.name}</h2>
      <p>{sabotage?.sabotage_id}</p>
    </div>
  );
}
