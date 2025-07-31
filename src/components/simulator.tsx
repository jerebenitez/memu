import { Background, BackgroundVariant, ColorMode, Controls, MiniMap, ReactFlow, ReactFlowProps } from "@xyflow/react";
import { CPUNode } from "./nodes/cpu";
import { CacheNode } from "./nodes/cache";
import { MemoryNode } from "./nodes/memory";
import { useTheme } from "next-themes";

const nodeTypes = {
    cpu: CPUNode,
    cache: CacheNode,
    memory: MemoryNode
}

export function Simulator(props: ReactFlowProps) {
    const { theme } = useTheme()

    return (
        <div className="flex-1">
            <ReactFlow
                {...props}
                fitView
                nodeTypes={nodeTypes}
                colorMode={theme as ColorMode || 'system'}
            >
                <Controls />
                <MiniMap />
                <Background variant={BackgroundVariant.Dots} gap={12} size={1} />
            </ReactFlow>
        </div>
    )
}
