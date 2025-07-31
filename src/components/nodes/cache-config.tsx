import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Dispatch, SetStateAction } from "react";
import { Input } from "../ui/input";
import { CacheConfig } from "./cache";

const validSizes = [
  "16KB",
  "32KB",
  "64KB",
  "128KB",
  "256KB",
  "512KB",
  "1MB",
  "2MB",
];
const associativityLevels = [
  { value: "direct-mapped", label: "Direct Mapped" },
  { value: "2-way", label: "2-way Set Associative" },
  { value: "4-way", label: "4-way Set Associative" },
  { value: "8-way", label: "8-way Set Associative" },
  { value: "fully-associative", label: "Fully Associative" },
];
const validBlockSizes = ["32B", "64B", "128B"];

export function CacheNodeConfigModal({
  id,
  config,
  setConfig,
  open,
  onOpenChange,
}: {
  id: string;
  config: CacheConfig & { label: string };
  setConfig: Dispatch<SetStateAction<CacheConfig>>;
  open: boolean;
  onOpenChange: (state: boolean) => void;
}) {
  const updateConfig = (
    key: keyof CacheConfig,
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
        <div className="space-y-6 pt-3">
          <Label className="text-xs">Label</Label>
          <Input
            value={config.label}
            onChange={(e) => {
              updateConfig("label", e.target.value);
            }}
          />
          <div className="grid grid-cols-2 gap-3">
            <div>
              <Label className="text-xs">Size</Label>
              <Select
                value={config.size}
                onValueChange={(v) => updateConfig("size", v)}
              >
                <SelectTrigger className="h-7 text-xs w-full">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {validSizes.map((size) => (
                    <SelectItem key={size} value={size}>
                      {size}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label className="text-xs">Block Size</Label>
              <Select
                value={config.blockSize}
                onValueChange={(v) => updateConfig("blockSize", v)}
              >
                <SelectTrigger className="h-7 text-xs w-full">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {validBlockSizes.map((size) => (
                    <SelectItem key={size} value={size}>
                      {size}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
          <div>
            <Label className="text-xs">Associativity</Label>
            <Select
              value={config.associativity}
              onValueChange={(v) => updateConfig("associativity", v)}
            >
              <SelectTrigger className="h-7 text-xs w-full">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {associativityLevels.map(({ label, value }) => (
                  <SelectItem key={value} value={value}>
                    {label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label className="text-xs">Eviction Policy</Label>
            <Select
              value={config.evictionPolicy}
              onValueChange={(v) => updateConfig("evictionPolicy", v)}
            >
              <SelectTrigger className="h-7 text-xs w-full">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="LRU">LRU (Least Recently Used)</SelectItem>
                <SelectItem value="FIFO">FIFO (First In, First Out)</SelectItem>
                <SelectItem value="Random">Random</SelectItem>
                <SelectItem value="LFU">LFU (Least Frequently Used)</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label className="text-xs">Write Policy</Label>
            <Select
              value={config.writePolicy}
              onValueChange={(v) => updateConfig("writePolicy", v)}
            >
              <SelectTrigger className="h-7 text-xs w-full">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="write-back">Write-back</SelectItem>
                <SelectItem value="write-through">Write-through</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label className="text-xs">Write Allocate</Label>
            <Select
              value={config.writeAllocate}
              onValueChange={(v) => updateConfig("writeAllocate", v)}
            >
              <SelectTrigger className="h-7 text-xs w-full">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="write-allocate">Write-allocate</SelectItem>
                <SelectItem value="no-write-allocate">
                  No-write-allocate
                </SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
