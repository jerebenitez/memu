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

export type CPUConfig = {
  label: string;
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
        <div className="space-y-6 pt-3 border-t">
          <Label className="text-xs">Label</Label>
          <Input
            value={config.label}
            onChange={(e) => {
              setConfig({ ...config, label: e.target.value });
            }}
          />
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
      <div className="flex flex-col gap-3">
        <div className="text-xs text-muted-foreground">Processor Core</div>
      </div>
      <Handle type="source" position={Position.Right} />
    </NodeComponent>
  );
}
