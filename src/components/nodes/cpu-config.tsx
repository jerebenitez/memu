import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Dispatch, SetStateAction } from "react";
import { Input } from "../ui/input";

export function CPUNodeConfigModal({
  id,
  label,
  setLabel,
  open,
  onOpenChange,
}: {
  id: string;
  label: string;
  setLabel: Dispatch<SetStateAction<string>>;
  open: boolean;
  onOpenChange: (state: boolean) => void;
}) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="w-96">
        <DialogHeader>
          <DialogTitle>{id}</DialogTitle>
        </DialogHeader>
        <div className="space-y-6 pt-3 border-t">
          <Label className="text-xs">Label</Label>
          <Input
            value={label}
            onChange={(e) => {
              setLabel(e.target.value);
            }}
          />
        </div>
      </DialogContent>
    </Dialog>
  );
}
