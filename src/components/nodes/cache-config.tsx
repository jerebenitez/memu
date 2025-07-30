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

export type WritePolicy = "write-back" | "write-through";

type Associativity =
  | "direct-mapped"
  | "2-way"
  | "4-way"
  | "8-way"
  | "fully-associative";

export interface CacheConfig {
  size: string;
  accessTime: number; // in nS
  blockSize: string;
  associativity: Associativity;
  evictionPolicy: string;
  writePolicy: WritePolicy;
  writeAllocate: string;
}

export function CacheNodeConfigModal({
  id,
  config,
  setConfig,
  setLabel,
  open,
  onOpenChange,
}: {
  id: string;
  config: CacheConfig & { label: string };
  setConfig: Dispatch<SetStateAction<CacheConfig>>;
  setLabel: Dispatch<SetStateAction<string>>;
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
        <div className="space-y-6 pt-3 border-t">
            <Label className="text-xs">Label</Label>
            <Input value={config.label} onChange={e => {
                setLabel(e.target.value)
            }} />
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
                  <SelectItem value="16KB">16KB</SelectItem>
                  <SelectItem value="32KB">32KB</SelectItem>
                  <SelectItem value="64KB">64KB</SelectItem>
                  <SelectItem value="128KB">128KB</SelectItem>
                  <SelectItem value="256KB">256KB</SelectItem>
                  <SelectItem value="512KB">512KB</SelectItem>
                  <SelectItem value="1MB">1MB</SelectItem>
                  <SelectItem value="2MB">2MB</SelectItem>
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
                  <SelectItem value="32B">32B</SelectItem>
                  <SelectItem value="64B">64B</SelectItem>
                  <SelectItem value="128B">128B</SelectItem>
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
                <SelectItem value="direct-mapped">Direct Mapped</SelectItem>
                <SelectItem value="2-way">2-way Set Associative</SelectItem>
                <SelectItem value="4-way">4-way Set Associative</SelectItem>
                <SelectItem value="8-way">8-way Set Associative</SelectItem>
                <SelectItem value="fully-associative">
                  Fully Associative
                </SelectItem>
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

