import { Share2 } from "lucide-react";
import { NodeComponent } from "./node";
import { useState } from "react";
import { Handle, Position } from "@xyflow/react";

export const CBDIcon = Share2

export type CBDData = {
    label: string,
    history: string[]
}

export function newCBD() {
    return {
      id: `cbd-${Date.now()}`,
      type: "cbd",
      data: {
        label: "Common Data Bus",
        history: []
      },
      position: { x: Math.random() * 400 + 200, y: Math.random() * 200 + 150 },
    };
}

export function CBDNode() {
    const [data, setData] = useState<CBDData>({
        label: "Bus",
        history: []
    })

    return (
        <NodeComponent<CBDData, "bus">
            id="bus"
            Icon={CBDIcon}
            data={data}
            setData={setData}
        >
            <Handle type="target" id="caches" position={Position.Bottom} />
        </NodeComponent>
    )
}
