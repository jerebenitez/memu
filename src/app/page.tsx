"use client";

import { NavBar } from "@/components/navbar";
import { Simulator } from "@/components/simulator";
import { Edge, Node, useEdgesState, useNodesState } from "@xyflow/react";
import '@xyflow/react/dist/style.css';

const initialNodes: Node[] = [];
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
