import { Handle, NodeProps, type Node, Position } from "@xyflow/react";
import { MemoryStick } from "lucide-react";
import { useState } from "react";
import { Badge } from "../ui/badge";
import { CacheNodeConfigModal } from "./cache-config";
import { NodeComponent } from "./node";
import { CacheStats } from "./cache-stats";

export type WritePolicy = "write-back" | "write-through";

type Associativity =
  | "direct-mapped"
  | "2-way"
  | "4-way"
  | "8-way"
  | "fully-associative";

export const CacheIcon = MemoryStick;

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

export function newCache() {
  return {
    id: `cache-${Date.now()}`,
    type: "cache",
    data: {
      label: "New Cache",
      size: "1MB",
      accessTime: 10,
      blockSize: "64B",
      associativity: "8-way",
      evictionPolicy: "LRU",
      writePolicy: "write-back",
      writeAllocate: "write-allocate",
    },
    position: { x: Math.random() * 400 + 200, y: Math.random() * 200 + 150 },
  };
}

export function CacheNode(props: NodeProps<Node<CacheConfig, "cache">>) {
  const [data, setData] = useState<CacheConfig>(props.data);
  const [stats, setStats] = useState<CacheStats>({
    hits: 0,
    misses: 0,
    totalAccesses: 0,
    hitRate: 0,
    missRate: 0,
    averageAccessTime: 0,
  });

  return (
    <NodeComponent<CacheConfig, "cache">
      {...props}
      Icon={CacheIcon}
      hasDelete={true}
      data={data}
      setData={setData}
      ConfigModal={CacheNodeConfigModal}
    >
    <div className="flex flex-col gap-3">
      <CacheStats stats={stats} />
      <div className="flex flex-wrap gap-2">
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
      </div>
      <Handle type="target" position={Position.Left} />
      <Handle type="source" position={Position.Right} />
    </NodeComponent>
  );
}
