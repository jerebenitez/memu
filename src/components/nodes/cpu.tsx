import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Handle, type NodeProps, Position } from "@xyflow/react";
import { Cpu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { DeleteButton } from "./delete-button";

export function CPUNode({ data, id }: NodeProps) {
    return (
    <Card className="w-56 shadow-lg">
      <CardHeader className="pb-2">
      <CardTitle className="flex items-center justify-between text-sm">
          <div className="flex items-center gap-2">
            <Cpu className="w-4 h-4" />
            {data.label as string}
          </div>
          <DeleteButton id={id as string} />
        </CardTitle>
      </CardHeader>
      <CardContent className="pt-0">
        <div className="flex flex-col gap-3">
            <Button variant="outline" size="sm" className="text-xs h-6">Edit code</Button>
            <div className="text-xs text-muted-foreground">Processor Core</div>
        </div>
        <Handle type="source" position={Position.Right} />
      </CardContent>
    </Card>)
}
