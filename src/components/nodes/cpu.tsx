import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Handle, type NodeProps, Position } from "@xyflow/react";
import { Cpu } from "lucide-react";

export function CPUNode({ data }: NodeProps) {
    return (
    <Card className="w-48 shadow-lg">
      <CardHeader className="pb-2">
        <CardTitle className="flex items-center gap-2 text-sm">
          <Cpu className="w-4 h-4" />
          {data.label}
        </CardTitle>
      </CardHeader>
      <CardContent className="pt-0">
        <div className="text-xs text-muted-foreground">Processor Core</div>
        <Handle type="source" position={Position.Right} />
      </CardContent>
    </Card>)
}
