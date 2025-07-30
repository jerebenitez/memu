"use client";

import { NavBar } from "@/components/navbar";
import { Simulator } from "@/components/simulator";
import { Edge, Node, useEdgesState, useNodesState } from "@xyflow/react";
import "@xyflow/react/dist/style.css";
import { useEffect } from "react";

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

  useEffect(() => {
    const handleDeleteNode = (event: CustomEvent) => {
      const { nodeId } = event.detail;
      console.log(event.detail)
      deleteNode(nodeId);
    };

    window.addEventListener("deleteNode", handleDeleteNode as EventListener);

    return () => {
      window.removeEventListener(
        "deleteNode",
        handleDeleteNode as EventListener,
      );
    };
  });

  const deleteNode = (nodeId: string) => {
    setNodes((nds) => nds.filter((node) => node.id !== nodeId));
    setEdges((eds) =>
      eds.filter((edge) => edge.source !== nodeId && edge.target !== nodeId),
    );
  };

  return (
    <>
      <NavBar setNodes={setNodes} />
      <Simulator
        nodes={nodes}
        edges={edges}
        onEdgesChange={onEdgesChange}
        onNodesChange={onNodesChange}
        deleteKeyCode="Delete"
        onNodesDelete={(nds) => {
          const nodeIds = nds.map((node) => node.id);
          setNodes((nds) => nds.filter((node) => !nodeIds.includes(node.id)));
          setEdges((eds) =>
            eds.filter(
              (edge) =>
                !nodeIds.includes(edge.source) &&
                !nodeIds.includes(edge.target),
            ),
          );
        }}
      />
    </>
  );
}
