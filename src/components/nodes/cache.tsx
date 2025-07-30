import { Handle, NodeProps, type Node, Position } from "@xyflow/react";
import { MemoryStick } from "lucide-react";
import { useState } from "react";
import { Badge } from "../ui/badge";
import { CacheNodeConfigModal } from "./cache-config";
import { NodeComponent } from "./node";

export type WritePolicy = "write-back" | "write-through";

type Associativity =
  | "direct-mapped"
  | "2-way"
  | "4-way"
  | "8-way"
  | "fully-associative";

export type CacheConfig = {
  label: string;
  size: string;
  accessTime: number; // in nS
  blockSize: string;
  associativity: Associativity;
  evictionPolicy: string;
  writePolicy: WritePolicy;
  writeAllocate: string;
};

export function CacheNode(props: NodeProps<Node<CacheConfig, "cache">>) {
  const [data, setData] = useState<CacheConfig>(props.data);

  return (
    <NodeComponent<CacheConfig, "cache">
      {...props}
      Icon={MemoryStick}
      hasDelete={true}
      data={data}
      setData={setData}
      ConfigModal={CacheNodeConfigModal}
    >
      <span className="text-xs text-muted-foreground">
        Access Time: {data.accessTime}ns
      </span>
      <div className="flex gap-1 flex-wrap">
        <Badge variant="secondary" className="text-xs">
          {data.size}
        </Badge>
        <Badge variant="secondary" className="text-xs">
          {data.associativity}
        </Badge>
        <Badge variant="secondary" className="text-xs">
          {data.evictionPolicy}
        </Badge>
      </div>
      <Handle type="target" position={Position.Left} />
      <Handle type="source" position={Position.Right} />
    </NodeComponent>
  );
}
