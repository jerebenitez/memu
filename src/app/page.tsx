"use client";

import { NavBar } from "@/components/navbar";
import { Simulator } from "@/components/simulator";
import { Edge, Node, useEdgesState, useNodesState } from "@xyflow/react";
import "@xyflow/react/dist/style.css";

const initialNodes: Node[] = [
  {
    id: "main-memory",
    type: "memory",
    data: { label: "Main Memory", size: "4GB", accessTime: "100ns" },
    position: { x: 700, y: 100 },
  },
  {
    id: "cpu-1",
    type: "cpu",
    data: { label: "CPU" },
    position: { x: 100, y: 90 },
  },
];
const initialEdges: Edge[] = [];

export default function Home() {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

  return (
    <>
      <NavBar setNodes={setNodes} />
      <Simulator
        nodes={nodes}
        edges={edges}
        onEdgesChange={onEdgesChange}
        onNodesChange={onNodesChange}
      />
    </>
  );
}
