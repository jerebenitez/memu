import { Handle, NodeProps, Position } from "@xyflow/react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { HardDrive } from "lucide-react";


export function MemoryNode({ data }: NodeProps) {
    return (
    <Card className="w-48 shadow-lg">
      <CardHeader className="pb-2">
        <CardTitle className="flex items-center gap-2 text-sm">
          <HardDrive className="w-4 h-4" />
          {data.label}
        </CardTitle>
      </CardHeader>
      <CardContent className="pt-0">
        <div className="text-xs text-muted-foreground mb-2">Size: {data.size}</div>
        <div className="text-xs text-muted-foreground">Access Time: {data.accessTime}</div>
        <Handle type="target" position={Position.Left} />
      </CardContent>
    </Card>
  )
}
