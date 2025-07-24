import { Player } from "@/types/player/player";

export function PlayerCard({ id, position, race, tags }: Player) {
  return (
    <div key={id} className="border rounded-md p-3 w-40 text-center text-sm">
      <p className="font-semibold">{position} ({race})</p>
      <p className="text-xs text-gray-600">
        {tags?.join(", ") || "태그 없음"}
      </p>
    </div>
  );
}