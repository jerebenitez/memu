import { Background, BackgroundVariant, Controls, MiniMap, ReactFlow, ReactFlowProps } from "@xyflow/react";
import { CPUNode } from "./nodes/cpu";
import { CacheNode } from "./nodes/cache";

const nodeTypes = {
    cpu: CPUNode,
    cache: CacheNode
}

export function Simulator(props: ReactFlowProps) {
    return (
        <div className="flex-1">
            <ReactFlow
                {...props}
                fitView
                nodeTypes={nodeTypes}
            >
                <Controls />
                <MiniMap />
                <Background variant={BackgroundVariant.Dots} gap={12} size={1} />
            </ReactFlow>
        </div>
    )
}
