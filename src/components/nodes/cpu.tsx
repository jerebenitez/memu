import { Handle, type NodeProps, type Node, Position } from "@xyflow/react";
import { NodeComponent } from "./node";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Dispatch, SetStateAction, useState } from "react";
import { Input } from "../ui/input";
import { Cpu } from "lucide-react";
import { Textarea } from "../ui/textarea";

export type CPUConfig = {
  label: string;
  code?: string
};

export const CPUIcon = Cpu

export function newCPU() {
   return {
      id: `cpu-${Date.now()}`,
      type: "cpu",
      data: {
        label: "New CPU",
      },
      position: { x: Math.random() * 400 + 200, y: Math.random() * 200 + 150 },
    };
}

function CPUNodeConfigModal({
  id,
  config,
  setConfig,
  open,
  onOpenChange,
}: {
  id: string;
  config: CPUConfig;
  setConfig: Dispatch<SetStateAction<CPUConfig>>;
  open: boolean;
  onOpenChange: (state: boolean) => void;
}) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="w-96">
        <DialogHeader>
          <DialogTitle>{id}</DialogTitle>
        </DialogHeader>
        <div className="space-y-6 pt-3">
        <div className="space-y-2">
          <Label className="text-xs" htmlFor="label">Label</Label>
          <Input
            id="label"
            value={config.label}
            onChange={(e) => {
              setConfig({ ...config, label: e.target.value });
            }}
          />
          </div><div className="space-y-2">
          <Label className="text-xs" htmlFor="code">Code</Label>
          <Textarea
            rows={10}
            id="code"
            value={config.code}
            onChange={(e) => {
              setConfig({ ...config, code: e.target.value });
            }}
          /><p className="text-muted-foreground text-sm">Language coming soon.</p>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

export function CPUNode(props: NodeProps<Node<CPUConfig, "cpu">>) {
    const [data, setData] = useState<CPUConfig>(props.data)

  return (
    <NodeComponent<CPUConfig, "cpu">
      {...props}
      Icon={CPUIcon}
      hasDelete={true}
      data={data}
      setData={setData}
      ConfigModal={CPUNodeConfigModal}
      className="w-60"
    >
        <div className="bg-muted/50 p-3 rounded-lg space-y-3">
        <div className="text-xs text-muted-foreground">
            {data.code ? "Coded loaded." : "No code loaded."}
        </div>
      </div>
      <Handle type="source" position={Position.Right} />
    </NodeComponent>
  );
}
