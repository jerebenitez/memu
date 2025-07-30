import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Dispatch, SetStateAction } from "react";
import { Input } from "../ui/input";
import { MemoryConfig } from "./memory";

export function MemoryNodeConfigModal({
  id,
  config,
  setConfig,
  open,
  onOpenChange,
}: {
  id: string;
  config: MemoryConfig;
  setConfig: Dispatch<SetStateAction<MemoryConfig>>;
  open: boolean;
  onOpenChange: (state: boolean) => void;
}) {
  const updateConfig = (
    key: keyof MemoryConfig,
    value: string | number | boolean,
  ) => {
    setConfig((prev) => ({ ...prev, [key]: value }));
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="w-96">
        <DialogHeader>
          <DialogTitle>{id}</DialogTitle>
        </DialogHeader>
        <div className="space-y-6 pt-3 border-t">
          <div>
            <Label className="text-xs">Label</Label>
            <Input
              value={config.label}
              onChange={(e) => {
                updateConfig("label", e.target.value);
              }}
            />
          </div>
          <div>
            <Label className="text-xs">Size</Label>
            <Input
              value={config.size}
              onChange={(e) => {
                updateConfig("config", e.target.value);
              }}
            />
          </div>
          <div>
            <Label className="text-xs">Access Time</Label>
            <Input
              value={config.accessTime}
              onChange={(e) => {
                updateConfig("accessTime", e.target.value);
              }}
            />
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
