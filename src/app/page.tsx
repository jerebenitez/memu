"use client";

import { NavBar } from "@/components/navbar";
import { Simulator } from "@/components/simulator";
import { addEdge, ColorMode, Connection, Edge, Node, useEdgesState, useNodesState } from "@xyflow/react";
import "@xyflow/react/dist/style.css";
import { useTheme } from "next-themes";
import { useCallback, useEffect } from "react";

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
    const { theme } = useTheme()
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

  const isValidConnection = (connection: Edge | Connection): boolean => {
        const source = nodes.find(n => n.id === connection.source)
        const target = nodes.find(n => n.id === connection.target)

        if (!source || !target) return false

        switch(source.type) {
            case "cpu":
                // CPUs can only be connected to a single memory or cache
                return (
                    (target.type === "cache" || target.type === "memory")
                    && edges.find(e => e.source === connection.source) === undefined
                )
            case "memory":
                // Main memory can't be the source of a connection, this is here
                // for completeness
                return false
            case "cache":
                // Caches can have a single connection to memory or other
                // cache
                return (
                    (target.type === "cache" || target.type === "memory")
                    && edges.find(e => e.target === connection.target) === undefined
                    && edges.find(e => e.source === connection.source) === undefined
                )
        }

        return true
    }

const onConnect = useCallback(
    (params: Connection) => setEdges((els) => addEdge(params, els)),
    [setEdges],
  );

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
        onConnect={onConnect}
        isValidConnection={isValidConnection}
        colorMode={theme as ColorMode}
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
