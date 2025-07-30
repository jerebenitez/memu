import { Background, BackgroundVariant, ReactFlow } from "@xyflow/react";

export function Simulator() {
    return (
        <ReactFlow>
            <Background variant={BackgroundVariant.Dots} gap={12} size={1} />
        </ReactFlow>
    )
}
