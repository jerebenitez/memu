import { X } from "lucide-react";
import { Button } from "../ui/button";

export function DeleteButton({ id }: { id: string }) {
  return (
    <Button
      variant="ghost"
      size="sm"
      onClick={() => {
        const event = new CustomEvent("deleteNode", { detail: { nodeId: id } });
        window.dispatchEvent(event);
      }}
      className="text-red-500 hover:text-red-700 hover:bg-red-50"
      title="Delete Node"
    >
      <X className="w-3 h-3" />
    </Button>
  );
}
