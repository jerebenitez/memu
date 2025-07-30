import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Handle, NodeProps, Position } from "@xyflow/react";
import { HardDrive, Pencil, Save, Settings } from "lucide-react";
import { Dispatch, SetStateAction, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
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
import { Badge } from "../ui/badge";

export type WritePolicy = "write-back" | "write-through";

type Associativity =
  | "direct-mapped"
  | "2-way"
  | "4-way"
  | "8-way"
  | "fully-associative";

interface CacheConfig {
  size: string;
  accessTime: number; // in nS
  blockSize: string;
  associativity: Associativity;
  evictionPolicy: string;
  writePolicy: WritePolicy;
  writeAllocate: string;
}

function CacheNodeConfigModal({
  id,
  config,
  setConfig,
  open,
  onOpenChange,
}: {
  id: string;
  config: CacheConfig;
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
      <DialogContent className="w-80">
        <DialogHeader>
          <DialogTitle>{id}</DialogTitle>
        </DialogHeader>
        <div className="space-y-6 pt-3 border-t">
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

export function CacheNode({ data, id }: NodeProps) {
  const [name, setName] = useState<string>(data.label);
  const [editing, setEditing] = useState<boolean>(false);
  const [settings, setSettings] = useState<boolean>(false);
  const [config, setConfig] = useState<CacheConfig>(data.config);

  const onEdit = () => {
    setEditing(!editing);
  };
  return (
    <Card className="w-80 shadow-lg">
      <CardHeader className="pb-2">
        <CardTitle className="flex items-center justify-between text-sm">
          <div className="flex items-center gap-2">
            <HardDrive className="w-4 h-4" />
            {!editing ? (
              name
            ) : (
              <Input
                value={name}
                onClick={(e) => e.stopPropagation()}
                onChange={(e) => setName(e.target.value)}
              />
            )}
          </div>
          <div className="flex gap-1">
            <Button variant="ghost" size="sm" onClick={onEdit} title="Edit">
              {!editing ? (
                <Pencil className="w-3 h-3" />
              ) : (
                <Save className="w-3 h-3" />
              )}
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setSettings(!settings)}
              title="Edit"
            >
              <Settings className="w-3 h-3" />
              <CacheNodeConfigModal
                id={id}
                open={settings}
                onOpenChange={setSettings}
                config={config}
                setConfig={setConfig}
              />
            </Button>
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent className="pt-0">
      <span className="text-xs text-muted-foreground">Access Time: {config.accessTime}ns</span>
        <div className="flex gap-1 flex-wrap">
          <Badge variant="secondary" className="text-xs">
            {config.size}
          </Badge>
          <Badge variant="secondary" className="text-xs">
            {config.associativity}
          </Badge>
          <Badge variant="secondary" className="text-xs">
            {config.evictionPolicy}
          </Badge>
        </div>
        <Handle type="target" position={Position.Left} />
        <Handle type="source" position={Position.Right} />
      </CardContent>
    </Card>
  );
}
